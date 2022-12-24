from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator

from django.db.models.signals import post_save
from django.conf import settings
from rest_framework.authtoken.models import Token


# Create your models here.

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    last_name = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    email = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    gender = models.CharField(
        max_length=6,
        choices=[('male', 'male'), ('female', 'female')],
        blank=False,
    )
    level = models.IntegerField(default=1)
    learn_unit = models.IntegerField(default=1)

    def __str__(self):
        return self.user.username

