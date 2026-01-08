from rest_framework import serializers
from .models import Registration, Result

class RegistrationSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(read_only=True)
    age_group = serializers.CharField(read_only=True)
    age_group_label = serializers.CharField(read_only=True)

    class Meta:
        model = Registration
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "dob",
            "gender",
            "address",
            "age",
            "age_group",
            "age_group_label",
            "country",
            "state",
            "zip_code",
        ]


class ResultSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="registration.first_name", read_only=True)
    last_name = serializers.CharField(source="registration.last_name", read_only=True)
    gender = serializers.CharField(source="registration.gender", read_only=True)
    age_group = serializers.CharField(source="registration.age_group", read_only=True)
    age_group_label = serializers.CharField(source="registration.age_group_label", read_only=True)

    class Meta:
        model = Result
        fields = [
            "id",
            "first_name",
            "last_name",
            "gender",
            "age_group",
            "age_group_label",
            "sup_seconds",
            "run_seconds",
            "arrow_points",
            "total_seconds",
            "final_seconds",
            "overall_place",
            "gender_place",
            "age_group_place",
        ]
