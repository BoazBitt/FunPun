from rest_framework import serializers
from .models import Teacher, Student, Classroom
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}

        }

    def save(self):
        usr = User.objects.create_user(
            username=self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'password do not match'})

        usr.set_password(password)
        usr.save()
        Token.objects.create(user=usr)
        print(User.objects.get(username=usr.username))
        return usr


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['user', 'school_name', 'first_name', 'last_name', 'city']


# class ClassRoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Classroom
#         fields = ['teacher', 'classID', 'capacity']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['fullName', 'classroom', 'done']


class ClassRoomSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)

    class Meta:
        model = Classroom
        fields = ['classID', 'teacher', 'capacity', 'students', 'classLevel']


class CreateClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['classID', 'teacher', 'capacity', 'classLevel']

