from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authtoken.admin import User
from rest_framework.response import Response
from .models import Account
from .serializers import AccountSerializer
from django.contrib.auth import login
from django.utils import timezone


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    print(queryset)
    serializer_class = AccountSerializer

    # permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        user = User.objects.get(username=kwargs['pk'])
        login(request, user)
        # last_login_time = user.last_login.strftime('%y-%m-%d %a %H:%M:%S')
        acc = Account.objects.get(user=user)
        serializer = self.get_serializer(acc)
        return Response(serializer.data)
