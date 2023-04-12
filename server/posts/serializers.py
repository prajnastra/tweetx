from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Posts


class PublicPostSerializer(ModelSerializer):
    owner_name = serializers.CharField(source="user.first_name")
    owner_id = serializers.CharField(source="user.id")

    class Meta:
        model = Posts
        fields = (
            "id",
            "content",
            "created_at",
            "owner_name",
            "owner_id",
        )


class PostSerializer(ModelSerializer):
    class Meta:
        model = Posts
        fields = ("content",)
