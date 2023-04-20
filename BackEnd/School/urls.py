from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import TeacherViewSet

router = routers.DefaultRouter()
router.register('Teacher', TeacherViewSet)
urlpatterns = [
    path('', include(router.urls)),

]
