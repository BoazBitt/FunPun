from django.contrib import admin
from .models import Account
from allSentences.models import Sentences

# Register your models here.
admin.site.register(Account)
admin.site.register(Sentences)