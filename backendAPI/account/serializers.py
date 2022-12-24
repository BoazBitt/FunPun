from rest_framework import serializers
from .models import Account
from rest_framework.authtoken.models import Token


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name']



class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name', 'level', 'learn_unit']

    def create(self, validated_data):
        account = Account.objects.create(**validated_data)
        Token.objects.create(user=account.user)
        return account
