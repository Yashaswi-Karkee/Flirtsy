# Generated by Django 5.0.3 on 2024-05-21 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='demo',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]