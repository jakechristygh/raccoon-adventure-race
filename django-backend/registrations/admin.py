# Register your models here.
from django.contrib import admin
from .models import Registration

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "age_group", "gender", "phone")
    search_fields = ("first_name", "last_name", "email")
