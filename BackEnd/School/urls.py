from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import TeacherViewSet ,ClassroomViewSet

router = routers.DefaultRouter()
router.register('Teacher', TeacherViewSet)
router.register('Classroom', ClassroomViewSet)
urlpatterns = [
    path('', include(router.urls)),

]
