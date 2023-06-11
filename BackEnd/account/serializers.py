from rest_framework import serializers
from .models import Account
from rest_framework.authtoken.models import Token


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name', 'gender', 'city', 'userLevel']


class AccountSerializer(serializers.ModelSerializer):
    is_superuser = serializers.SerializerMethodField()
    email = serializers.EmailField(source='user.email', read_only=True)


    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name', 'gender', 'city', 'userLevel', 'is_superuser','points','email']

    def get_is_superuser(self, obj):
        return obj.user.is_superuser


    def create(self, validated_data):
        account = Account.objects.create(**validated_data)
        Token.objects.create(user=account.user)
        return account
