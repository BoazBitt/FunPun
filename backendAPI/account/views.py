from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.authtoken.admin import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Account
from .serializers import AccountSerializer


# Create your views here.

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    print(queryset)
    serializer_class = AccountSerializer
    # permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        user = User.objects.get(username=kwargs['pk'])
        acc = Account.objects.get(user=user)
        instance = acc
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # def get_object(self):
    #     print(self.kwargs)
    #     username = self.kwargs['pk']
    #     user = User.objects.get(username=username)
    #     acc = Account.objects.get(user=user)
    #     serializer = AccountSerializer(acc)
    #     print(serializer.data)
    #     return Response(serializer.data)
    #     # return acc
