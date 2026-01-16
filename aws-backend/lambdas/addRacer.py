import json
import boto3
import os
from datetime import date, datetime


sns = boto3.client("sns")
SNS_TOPIC_ARN = "arn:aws:sns:us-east-2:037678282356:raccoon-race-new-registration"

TABLE_NAME = "RegistrationResults"  # updated table with Number key
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def calculate_age(dob_str):
    dob = datetime.strptime(dob_str, "%Y-%m-%d").date()
    today = date.today()
    return today.year - dob.year - (
        (today.month, today.day) < (dob.month, dob.day)
    )

def get_age_group(age):
    if age < 20:
        return "0-19"
    if age < 30:
        return "20-29"
    if age < 40:
        return "30-39"
    if age < 50:
        return "40-49"
    if age < 60:
        return "50-59"
    return "60+"

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

            registration = body.get("registration", {})

            if "dob" in registration:
                age = calculate_age(registration["dob"])
                age_group = get_age_group(age)
                registration["age"] = age
                registration["ageGroup"] = age_group
                registration["ageGroupLabel"] = f"{registration.get('gender')} {age_group}"


        # Prepare item for DynamoDB
        item = {
            "racerId": racer_id,
            "registration": body.get("registration", {}),
            "results": body.get("results", {})
        }

        # Insert into DynamoDB
        table.put_item(Item=item)
          # Send SNS notification
        message = f"""
        New Racer Registered 🏁

        Name: {item['registration'].get('firstName')} {item['registration'].get('lastName')}
        Email: {item['registration'].get('email')}
        Gender: {item['registration'].get('gender')}
        Age Group: {item['registration'].get('ageGroupLabel')}
        Racer ID: {item['racerId']}
        """

        sns.publish(
            TopicArn=SNS_TOPIC_ARN,
            Subject="New Racer Registration",
            Message=message
        )

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
