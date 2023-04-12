# Generated by Django 4.2 on 2023-04-12 02:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_alter_user_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="id",
            field=models.CharField(
                default="0637514b88a0429fa66fbe3163aa82d5",
                editable=False,
                max_length=100,
                primary_key=True,
                serialize=False,
                unique=True,
                verbose_name="ID",
            ),
        ),
    ]