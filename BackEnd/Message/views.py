import json

from django.db.models import Q
from django.http import HttpResponseBadRequest
from django.shortcuts import render
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.authtoken.admin import User
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    print(queryset)
    serializer_class = MessageSerializer

    # permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        data = json.loads(request.data.get('msgData'))
        serializer = self.get_serializer(data=data)
        if not serializer.is_valid():
            return HttpResponseBadRequest("Bad Request")
        serializer.save(sent_at=timezone.now())
        return Response('Posted Successfully', status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        sender = request.query_params.get('sender')
        receiver = request.query_params.get('receiver')
        messages = Message.objects.filter(
            Q(sender=sender, receiver=receiver) | Q(sender=receiver, receiver=sender)
        ).order_by('sent_at')
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)
