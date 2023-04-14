import json

from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer
from django.http import HttpResponseBadRequest
from rest_framework.authtoken.models import Token

from account.serializers import CreateAccountSerializer




class RegisterView(APIView):

    def post(self, request):
        data = json.loads(request.data['data'])
        user_data = {}
        acc_data = {}
        for key, value in data.items():
            if key in ['username', 'email', 'password', 'password2']:
                user_data[key] = value
            else:
                acc_data[key] = value
        userSerializer = RegisterSerializer(data=user_data)
        if not userSerializer.is_valid():
            return HttpResponseBadRequest("Bad Request")
        usr = userSerializer.save()
        usr = User.objects.get(username=usr.username)
        acc_data['user'] = usr.id
        accSerializer = CreateAccountSerializer(data=acc_data)
        if not accSerializer.is_valid():
            return HttpResponseBadRequest("Bad Request")
        accSerializer.save()
        responseData = {'response': 'User is registered successfully', 'email': usr.email, 'username': usr.username,
                        'token': Token.objects.get(user=usr).key}
        print("Got Here!")
        return Response(responseData)
