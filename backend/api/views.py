from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer

@api_view(["POST"])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    if User.objects.filter(username=username).exists():
        return Response({"error": "Пользователь уже существует"}, status=400)

    User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    return Response({"message": "Пользователь создан"}, status=201)

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def me_view(request):
    profile = request.user.profile

    if request.method == "GET":
        return Response(ProfileSerializer(profile).data)

    if request.method == "PUT":
        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)