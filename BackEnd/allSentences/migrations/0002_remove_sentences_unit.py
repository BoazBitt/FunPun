# Generated by Django 3.2 on 2023-04-20 18:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('allSentences', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sentences',
            name='unit',
        ),
    ]