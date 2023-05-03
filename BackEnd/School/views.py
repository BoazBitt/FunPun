from django.http import HttpResponseBadRequest
from django.shortcuts import render
import json
from rest_framework import viewsets, status, permissions
from .models import Teacher, Student, Classroom
from rest_framework.authtoken.admin import User
from rest_framework.response import Response
from .serializers import TeacherSerializer, ClassRoomSerializer, CreateClassroomSerializer
from .serializers import UserSerializer
from django.contrib.auth import login


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    print(queryset)

    serializer_class = TeacherSerializer

    def create(self, request, *args, **kwargs):
        data = json.loads(request.data.get('teacherData'))
        user_data = {}
        teach_data = {}
        for key, value in data.items():
            if key in ['username', 'password', 'password2']:
                user_data[key] = value
            else:
                teach_data[key] = value

        userSerializer = UserSerializer(data=user_data)
        if not userSerializer.is_valid():
            return HttpResponseBadRequest("Bad Request")
        usr = userSerializer.save()
        usr = User.objects.get(username=usr.username)
        teach_data['user'] = usr.id
        teacherSerializer = self.get_serializer(data=teach_data)
        if not teacherSerializer.is_valid():
            return HttpResponseBadRequest("Bad Request")
        teacherSerializer.save()

        return Response(teacherSerializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        user = User.objects.get(username=kwargs['pk'])
        login(request, user)
        acc = Teacher.objects.get(user=user)
        serializer = self.get_serializer(acc)
        return Response(serializer.data)


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    print(queryset)
    serializer_class = ClassRoomSerializer

    def create(self, request, *args, **kwargs):
        data = json.loads(request.data.get('classData'))
        data['capacity'] = int(data['capacity'])
        user = User.objects.get(id=data['teacher'])
        teacher = Teacher.objects.get(user=user)
        data['teacher'] = teacher.pk
        serializer = CreateClassroomSerializer(data=data)
        if not serializer.is_valid():
            return HttpResponseBadRequest("Bad Request")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs['pk'])
        teacher = Teacher.objects.get(user=user)
        classes = Classroom.objects.filter(teacher=teacher)
        sentenceC = self.get_serializer(classes, many=True)
        return Response(sentenceC.data)

    def perform_destroy(self, instance):
        print("in delete")
        print(instance)
        students = Student.objects.filter(classroom=instance)
        for student in students:
            student.delete()
        instance.delete()
        return Response('Class was deleted successfully', status=status.HTTP_200_OK)
