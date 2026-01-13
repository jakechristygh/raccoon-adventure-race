# Raccoon Adventure Race API

Base URL:
https://1n250bbi5b.execute-api.us-east-2.amazonaws.com

---

## GET /racers

Returns a list of racers sorted by finalSeconds (ascending).

### Response

```json
[
  {
    "racerId": 1,
    "registration": {
      "firstName": "Jacob",
      "lastName": "Christy",
      "gender": "Male",
      "ageGroup": "30-39",
      "ageGroupLabel": "Male 30-39",
      "age": 35
    },
    "results": {
      "supSeconds": 1680,
      "runSeconds": 840,
      "arrowPoints": 25,
      "finalSeconds": 1020,
      "overallPlace": 1,
      "genderPlace": 1,
      "ageGroupPlace": 1
    }
  }
]



// Update
{
  "racerId": 5,
  "results": {
    "supSeconds": 1700,
    "runSeconds": 900,
    "arrowPoints": 20
  }
}


// add racer
{
  "registration": {
    "firstName": "Jane",
    "lastName": "Doe",
    "gender": "Female",
    "ageGroup": "30-39",
    "email": "jane@example.com"
  }
}


// response
{
  "message": "Racer added",
  "racerId": 5
}


