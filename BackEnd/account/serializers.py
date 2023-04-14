from rest_framework import serializers
from .models import Account
from rest_framework.authtoken.models import Token


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name', 'gender', 'city', 'userLevel', 'userUnit']


class AccountSerializer(serializers.ModelSerializer):
    is_superuser = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name', 'gender', 'city', 'userLevel', 'userUnit', 'is_superuser','points']

    def get_is_superuser(self, obj):
        return obj.user.is_superuser


    def create(self, validated_data):
        account = Account.objects.create(**validated_data)
        Token.objects.create(user=account.user)
        return account
