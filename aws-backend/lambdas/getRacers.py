import json
import boto3
from decimal import Decimal

TABLE_NAME = "RegistrationResults"

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

RESULT_FIELDS = [
    "supSeconds",
    "runSeconds",
    "arrowPoints",
    "finalSeconds",
    "overallPlace",
    "genderPlace",
    "ageGroupPlace",
]

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            if obj % 1 == 0:
                return int(obj)
            return float(obj)
        return super().default(obj)

def normalize_results(item):
    results = item.get("results", {})
    return {
        field: results.get(field) if field in results else None
        for field in RESULT_FIELDS
    }

def lambda_handler(event, context):
    try:
        response = table.scan()
        items = response.get("Items", [])

        # Normalize results for every racer
        for item in items:
            item["results"] = normalize_results(item)

        # Sort by finalSeconds (nulls go last)
        sorted_items = sorted(
            items,
            key=lambda x: x["results"]["finalSeconds"]
            if x["results"]["finalSeconds"] is not None
            else float("inf")
        )

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": json.dumps(sorted_items, cls=DecimalEncoder)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"error": str(e)})
        }
