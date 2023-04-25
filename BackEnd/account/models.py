from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    last_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    gender = models.CharField(
        max_length=6,
        choices=[('male', 'male'), ('female', 'female')],
        blank=False,
    )
    userLevel = models.IntegerField(default=1)
    points = models.IntegerField(default=0)

    city = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)

    # is_teacher = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username




# class Teacher(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     students = models.ForeignKey(User)
#     school = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
