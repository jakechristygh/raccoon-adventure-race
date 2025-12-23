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

    def save(self, *args, **kwargs):
        # Calculate total time
        self.total_seconds = self.sup_seconds + self.run_seconds

        # Calculate final time (arrow points = minutes off)
        self.final_seconds = max(
            self.total_seconds - (self.arrow_points * 60),
            0
        )

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.registration} — {self.final_seconds}s"
