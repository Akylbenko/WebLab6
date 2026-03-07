from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Article

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.CharField(source="user.email")

    class Meta:
        model = Profile
        fields = ["username", "email", "created_at"]

class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Article
        fields = ["id", "title", "content", "author", "created_at"]