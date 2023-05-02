import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(
        primary_key=True,
        default=uuid.uuid4().hex,
        editable=False,
        serialize=False,
        verbose_name="ID",
        unique=True,
        max_length=100,
    )
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, null=True, default="")
    last_name = models.CharField(max_length=100, null=True, default="")

    role = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    following = models.ManyToManyField("self", related_name="following_users")
    followers = models.ManyToManyField("self", related_name="followers_users")

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email
