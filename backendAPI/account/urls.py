from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import AccountViewSet


router = routers.DefaultRouter()
router.register('', AccountViewSet)
urlpatterns = [
    path('', include(router.urls))


]
