from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from account.models import Account




class RegisterSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name', 'last_name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']






class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}

        }

    def save(self):
        usr = User.objects.create_user(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'password do not match'})

        usr.set_password(password)
        usr.save()
        Token.objects.create(user=usr)
        print("HERE!")
        print(User.objects.get(username = usr.username))
        return usr
