# Generated by Django 3.2.13 on 2022-05-23 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='POAPModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('organizer', models.CharField(max_length=128)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField(null=True)),
                ('media', models.URLField()),
                ('media_type', models.IntegerField(choices=[('PHYSICAL', 0), ('VIRTUAL', 1), ('HYBRID', 2)])),
                ('contract_address', models.CharField(max_length=42)),
                ('event_type', models.IntegerField(choices=[('PHYSICAL', 0), ('VIRTUAL', 1), ('HYBRID', 2)])),
                ('status', models.BooleanField(default=True)),
            ],
        ),
    ]