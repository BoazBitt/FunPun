from django.db import models
from django.core.validators import MinLengthValidator


class Sentences(models.Model):
    sentence = models.CharField(primary_key=True, validators=[MinLengthValidator(2)], max_length=50)
    word = models.CharField(validators=[MinLengthValidator(2)], max_length=50)
    translation = models.CharField(validators=[MinLengthValidator(2)], max_length=50)
    Hword = models.CharField(validators=[MinLengthValidator(2)], max_length=50)
    level = models.IntegerField()
    unit = models.IntegerField()

    def __str__(self):
        return self.translation
