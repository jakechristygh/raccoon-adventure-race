import json
import boto3

TABLE_NAME = "RegistrationResults"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    try:
        params = event.get("pathParameters") or {}
        racer_id = params.get("racerId")

        if not racer_id:
            return {
                "statusCode": 400,
                "headers": cors(),
                "body": json.dumps({"error": "racerId is required"})
            }

        table.delete_item(
            Key={"racerId": int(racer_id)}
        )

        return {
            "statusCode": 200,
            "headers": cors(),
            "body": json.dumps({"message": f"Racer {racer_id} deleted"})
        }

    except Exception as e:
        print("ERROR:", str(e))
        return {
            "statusCode": 500,
            "headers": cors(),
            "body": json.dumps({"error": str(e)})
        }

def cors():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "DELETE,OPTIONS"
    }
