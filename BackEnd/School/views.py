from django.http import HttpResponseBadRequest
from django.shortcuts import render
import json
from rest_framework import viewsets, status
from .models import Teacher, Student, Classroom
from rest_framework.authtoken.admin import User
from account.models import Account
from rest_framework.response import Response
from .serializers import TeacherSerializer, ClassRoomSerializer
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
        print("class1")
        print(request.data)
        pass

    def retrieve(self, request, *args, **kwargs):
        print("1")
        user = User.objects.get(id=kwargs['pk'])
        print("1")
        teacher = Teacher.objects.get(user=user)
        print("1")
        classes = Classroom.objects.filter(teacher=teacher)
        print("1")
        sentenceC = self.get_serializer(classes, many=True)
        return Response(sentenceC.data)





class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    print(queryset)

    # serializer_class =

    def create(self, request, *args, **kwargs):
        print("student1")
        pass

    def retrieve(self, request, *args, **kwargs):
        print("student2")
        pass
