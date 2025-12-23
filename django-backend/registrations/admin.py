# Register your models here.
from django.contrib import admin
from .models import Registration, Result

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "age_group", "gender", "phone")
    search_fields = ("first_name", "last_name", "email")

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = (
        "registration",
        "sup_seconds",
        "run_seconds",
        "arrow_points",
        "total_seconds",
        "final_seconds",
    )