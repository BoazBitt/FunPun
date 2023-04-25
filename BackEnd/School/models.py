from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    city = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    first_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    last_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)

    def __str__(self):
        name_parts = []
        if self.first_name:
            name_parts.append(self.first_name)
        name_parts.append(self.school_name)
        name_parts.append(self.city)
        return " ".join(name_parts)


class Classroom(models.Model):
    classID = models.CharField(primary_key=True, validators=[MinLengthValidator(2)], max_length=50, blank=False)
    teacher = models.ForeignKey(Teacher, related_name='classrooms', on_delete=models.DO_NOTHING)
    capacity = models.IntegerField(default=0)

    def __str__(self):
        return self.classID + " " + self.teacher.first_name + " With amount: " + str(self.capacity)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fullName = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    studentLevel = models.IntegerField(default=0)
    classroom = models.ForeignKey(Classroom, related_name='students', on_delete=models.CASCADE)
    done = models.BooleanField(default=False)
    hashkey = models.CharField(validators=[MinLengthValidator(2)], max_length=5, blank=False)

    def __str__(self):
        return self.fullName
