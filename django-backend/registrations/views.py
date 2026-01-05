from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import Registration, Result
from .serializers import RegistrationSerializer, ResultSerializer

class RegistrationViewSet(ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

class ResultViewSet(ModelViewSet):
    queryset = Result.objects.select_related("registration").order_by("final_seconds")
    serializer_class = ResultSerializer
