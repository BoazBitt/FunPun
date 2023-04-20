from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    city = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)

    def __str__(self):
        return self.user.first_name + self.school_name+self.city


class Classroom(models.Model):
    classID = models.CharField(primary_key=True, validators=[MinLengthValidator(2)], max_length=50, blank=False)
    teacher = models.ForeignKey(Teacher, related_name='classrooms', on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.classID + self.teacher.user.first_name


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fullName = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    studentLevel = models.IntegerField(default=0)
    studentUnit = models.IntegerField(default=0)
    classroom = models.ForeignKey(Classroom, related_name='students', on_delete=models.CASCADE)
    done = models.BooleanField(default=False)
    hashkey = models.CharField(validators=[MinLengthValidator(2)], max_length=5, blank=False)

    def __str__(self):
        return self.fullName
