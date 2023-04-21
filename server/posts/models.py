import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Posts(models.Model):
    id = models.CharField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        serialize=False,
        verbose_name="ID",
        unique=True,
        max_length=100,
    )
    content = models.TextField(default="")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id
