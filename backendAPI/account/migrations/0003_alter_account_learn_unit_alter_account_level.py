# Generated by Django 4.1.4 on 2022-12-20 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_account_learn_unit_alter_account_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='learn_unit',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='account',
            name='level',
            field=models.IntegerField(default=1),
        ),
    ]