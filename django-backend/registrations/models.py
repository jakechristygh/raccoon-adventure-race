from django.db import models
from datetime import date

def calculate_age(dob):
    today = date.today()
    return today.year - dob.year - (
        (today.month, today.day) < (dob.month, dob.day)
    )

class Registration(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    dob = models.DateField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    address = models.CharField(max_length=200)
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def age(self):
        return calculate_age(self.dob)

    @property
    def age_group(self):
        age = self.age
        if age < 18:
            return None  
        if age < 30:
            return "18-29"
        elif age < 40:
            return "30-39"
        elif age < 50:
            return "40-49"
        elif age < 60:
            return "50-59"
        elif age < 70:
            return "60-69"
        else:
            return "70+"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


def recalculate_places():
    results = list(
        Result.objects
        .select_related("registration")
        .order_by("final_seconds", "id")
    )

    # Overall place
    for index, result in enumerate(results, start=1):
        result.overall_place = index

    # Gender place
    gender_counters = {}
    for result in results:
        gender = result.registration.gender
        gender_counters.setdefault(gender, 0)
        gender_counters[gender] += 1
        result.gender_place = gender_counters[gender]

    # Age group place
    age_group_counters = {}
    for result in results:
        age_group = result.registration.age_group
        if age_group is None:
            result.age_group_place = None
            continue

        age_group_counters.setdefault(age_group, 0)
        age_group_counters[age_group] += 1
        result.age_group_place = age_group_counters[age_group]

    Result.objects.bulk_update(
        results,
        ["overall_place", "gender_place", "age_group_place"]
    )


class Result(models.Model):
    registration = models.ForeignKey(
        Registration,
        on_delete=models.CASCADE,
        related_name="results"
    )

    sup_seconds = models.PositiveIntegerField(help_text="SUP time in seconds")
    run_seconds = models.PositiveIntegerField(help_text="Run time in seconds")
    arrow_points = models.PositiveIntegerField(default=0)

    total_seconds = models.PositiveIntegerField(editable=False)
    final_seconds = models.PositiveIntegerField(editable=False)

    overall_place = models.PositiveIntegerField(null=True, blank=True)
    gender_place = models.PositiveIntegerField(null=True, blank=True)
    age_group_place = models.PositiveIntegerField(null=True, blank=True)


    def save(self, *args, **kwargs):
        self.total_seconds = self.sup_seconds + self.run_seconds
        self.final_seconds = max(
            self.total_seconds - (self.arrow_points * 60),
            0
        )

        super().save(*args, **kwargs)
        recalculate_places()


    def __str__(self):
        return f"{self.registration} — {self.final_seconds}s"
