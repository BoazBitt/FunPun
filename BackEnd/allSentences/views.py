from django.shortcuts import render
import json
from rest_framework import viewsets, status
from .models import Sentences
from rest_framework.authtoken.admin import User
from account.models import Account
from .serializers import SentenceSerializer
from rest_framework.response import Response


class SentenceViewSet(viewsets.ModelViewSet):
    queryset = Sentences.objects.all()
    print(queryset)
    serializer_class = SentenceSerializer

    def create(self, request, *args, **kwargs):
        data = json.loads(request.data.get('sentenceData'))
        sentence = Sentences.objects.create(sentence=data['sentence'],
                                            word=data['word'],
                                            translation=data['tranlation'],
                                            Hword=data['Hword'],
                                            level=data['level'],
                                            unit=data['unit'])
        serializer = self.get_serializer(sentence)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs['pk'])
        acc = Account.objects.get(user=user)
        sentences = Sentences.objects.filter(level=acc.userLevel, unit=acc.userUnit)
        sentenceS = self.get_serializer(sentences,many=True)
        return Response(sentenceS.data)
