from rest_framework.routers import DefaultRouter
from .views import RegistrationViewSet, ResultViewSet

router = DefaultRouter()
router.register(r"registrations", RegistrationViewSet)
router.register(r"results", ResultViewSet)

urlpatterns = router.urls
