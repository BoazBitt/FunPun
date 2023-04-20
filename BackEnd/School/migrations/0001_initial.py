# Generated by Django 3.2 on 2023-04-20 08:34

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('classID', models.CharField(max_length=50, primary_key=True, serialize=False, validators=[django.core.validators.MinLengthValidator(2)])),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_name', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(2)])),
                ('city', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(2)])),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullName', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(2)])),
                ('studentLevel', models.IntegerField(default=0)),
                ('studentUnit', models.IntegerField(default=0)),
                ('done', models.BooleanField(default=False)),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='School.classroom')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='classroom',
            name='classroom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='classrooms', to='School.teacher'),
        ),
    ]
