from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import SentenceViewSet

router = routers.DefaultRouter()
router.register('', SentenceViewSet)
urlpatterns = [
    path('', include(router.urls)),

]
