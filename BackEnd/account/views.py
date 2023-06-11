from django.shortcuts import render
from rest_framework import viewsets, status
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

    def list(self, request, *args, **kwargs):
        level = request.query_params.get('userLevel')
        city = request.query_params.get('city')
        userid = request.query_params.get('id')
        accounts = Account.objects.filter(userLevel=level, city=city).exclude(user_id=userid)
        serializer = self.get_serializer(accounts, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs['pk'])
        if 'userData' in request.data:
            acc = Account.objects.get(user=user)
            data = json.loads(request.data['userData'])
            account_keys = ['first_name', 'last_name', 'city']
            accData = {key: value for key, value in data.items() if key in account_keys}
            userData = {key: value for key, value in data.items() if key not in account_keys}
            user.email = userData['email']
            password = userData['password']
            if len(password) > 0:
                if not user.check_password(userData['oldpass']):
                    return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(password)
            user.save()
            acc.first_name = accData['first_name']
            acc.last_name = accData['last_name']
            acc.city = accData['city']
            acc.save()
            serializer = self.get_serializer(acc, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if 'points' in request.data:
            acc = Account.objects.get(user=user)
            acc.points = acc.points + request.data['points']
            acc.userLevel += 1
            acc.save()
            serializer = self.get_serializer(acc, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
