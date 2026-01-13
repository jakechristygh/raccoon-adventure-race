import json
import boto3
from decimal import Decimal

TABLE_NAME = "RegistrationResults"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

# Decimal encoder for JSON
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    try:
        # Parse POST body
        body = json.loads(event.get("body", "{}"))
        racer_id = body.get("racerId")
        results = body.get("results", {})

        if not racer_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "racerId is required"})
            }

        if not results:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "results data is required"})
            }

        # Fetch existing racer
        response = table.get_item(Key={"racerId": int(racer_id)})
        racer = response.get("Item")

        if not racer:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": f"Racer {racer_id} not found"})
            }

        # Update results: calculate totalSeconds & finalSeconds
        sup = results.get("supSeconds", 0)
        run = results.get("runSeconds", 0)
        arrows = results.get("arrowPoints", 0)

        total_seconds = sup + run
        final_seconds = total_seconds - (arrows * 60)

        updated_results = racer.get("results", {})
        updated_results.update(results)
        updated_results["totalSeconds"] = total_seconds
        updated_results["finalSeconds"] = final_seconds

        # Save updated results for this racer
        table.update_item(
            Key={"racerId": int(racer_id)},
            UpdateExpression="SET results = :r",
            ExpressionAttributeValues={":r": updated_results}
        )

        # --- Recalculate rankings for all racers ---
        all_racers = table.scan().get("Items", [])

        # Sort by finalSeconds (ascending), ignore racers without finalSeconds
        racers_with_times = [r for r in all_racers if r.get("results", {}).get("finalSeconds") is not None]
        racers_with_times.sort(key=lambda x: x["results"]["finalSeconds"])

        # Assign overallPlace, genderPlace, ageGroupPlace
        gender_counters = {}
        agegroup_counters = {}

        for idx, r in enumerate(racers_with_times, start=1):
            r_results = r["results"]

            # Overall place
            r_results["overallPlace"] = idx

            # Gender place
            gender = r["registration"]["gender"]
            gender_counters.setdefault(gender, 0)
            gender_counters[gender] += 1
            r_results["genderPlace"] = gender_counters[gender]

            # Age group place
            age_group = r["registration"]["ageGroup"]
            agegroup_counters.setdefault(age_group, 0)
            agegroup_counters[age_group] += 1
            r_results["ageGroupPlace"] = agegroup_counters[age_group]

            # Update racer in DynamoDB
            table.update_item(
                Key={"racerId": r["racerId"]},
                UpdateExpression="SET results = :r",
                ExpressionAttributeValues={":r": r_results}
            )

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {"message": f"Racer {racer_id} results updated with rankings"},
                cls=DecimalEncoder
            )
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
