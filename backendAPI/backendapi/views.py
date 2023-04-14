import json
from time import sleep

from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from account.serializers import CreateAccountSerializer


class RegisterView(APIView):

    def post(self, request):
        alldata = request.data['data']
        alldata = json.loads(alldata)
        data1 = {'email': alldata['email'], 'username': alldata['username'],
                 'password': alldata['password'], 'password2': alldata['password2']}
        serializerU = RegisterSerializer(data=data1)
        sleep(30)
        if serializerU.is_valid():
            usr = serializerU.save()
        data2 = {}
        usr = User.objects.get(username=usr.username)
        data2['user'] = usr.id
        data2['first_name'] = alldata['first_name']
        data2['last_name'] = alldata['last_name']
        serializer = CreateAccountSerializer(data=data2)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = 'User is registered successfully'
            data['email'] = usr.email
            data['username'] = usr.username
            token = Token.objects.get(user=usr).key
            data['token'] = token
            print("Created!!!")
        else:
            data = serializerU.errors

        return Response(data)


