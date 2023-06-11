from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import MessageViewSet


router = routers.DefaultRouter()
router.register('', MessageViewSet)
urlpatterns = [
    path('', include(router.urls)),

]