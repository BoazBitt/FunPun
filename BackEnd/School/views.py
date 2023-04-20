from django.shortcuts import render
import json
from rest_framework import viewsets, status
from .models import Teacher, Student, Classroom
from rest_framework.authtoken.admin import User
from account.models import Account
from rest_framework.response import Response
from allSentences.serializers import SentenceSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    print(queryset)

    serializer_class = SentenceSerializer

    def create(self, request, *args, **kwargs):
        print("teacher1")
        pass
        # data = json.loads(request.data.get('sentenceData'))
        # sentence = Sentences.objects.create(sentence=data['sentence'],
        #                                     word=data['word'],
        #                                     translation=data['tranlation'],
        #                                     Hword=data['Hword'],
        #                                     level=data['level'],
        #                                     unit=data['unit'])
        # serializer = self.get_serializer(sentence)
        # return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        print("teacher2")
        pass
        # user = User.objects.get(id=kwargs['pk'])
        # acc = Account.objects.get(user=user)
        # sentences = Sentences.objects.filter(level=acc.userLevel, unit=acc.userUnit)
        # sentenceS = self.get_serializer(sentences,many=True)
        # return Response(sentenceS.data)


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    print(queryset)

    # serializer_class =

    def create(self, request, *args, **kwargs):
        print("class1")
        pass

    def retrieve(self, request, *args, **kwargs):
        print("class2")
        pass


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
