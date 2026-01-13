import json
import boto3

TABLE_NAME = "RegistrationResults"  # updated table with Number key
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))

        # Determine racerId
        if "racerId" in body:
            racer_id = int(body["racerId"])
        else:
            # Scan table to find highest existing racerId
            response = table.scan(ProjectionExpression="racerId")
            items = response.get("Items", [])
            if items:
                max_id = max(int(item["racerId"]) for item in items)
                racer_id = max_id + 1
            else:
                racer_id = 1  # first racer

        # Prepare item for DynamoDB
        item = {
            "racerId": racer_id,
            "registration": body.get("registration", {}),
            "results": body.get("results", {})
        }

        # Insert into DynamoDB
        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "Racer added", "racerId": racer_id})
        }

    except Exception as e:
        print("Error:", e)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
