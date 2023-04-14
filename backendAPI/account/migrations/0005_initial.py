# Generated by Django 4.1.6 on 2023-02-12 14:17

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('account', '0004_delete_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(2)])),
                ('last_name', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(2)])),
                ('email', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(2)])),
                ('gender', models.CharField(choices=[('male', 'male'), ('female', 'female')], max_length=6)),
                ('level', models.IntegerField(default=1)),
                ('learn_unit', models.IntegerField(default=1)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
