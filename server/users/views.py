from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView

from users.serializers import CreateUserSerializer, PublicUserSerializer

User = get_user_model()


class UserSignUpView(APIView):
    def post(self, request, *args, **kwargs):
        serialized = CreateUserSerializer(data=request.data)
        if serialized.is_valid():
            serializer_data = serialized.validated_data
            serializer_data.setdefault("role", 0)
            password = serialized.data.pop("password")
            user = User(**serializer_data)
            user.set_password(password)
            user.save()
            serializer_data = serialized.data
            return Response(serializer_data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serialized.errors, status=status.HTTP_400_BAD_REQUEST
            )


class ListAllUsersAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PublicUserSerializer

    def get_queryset(self):
        request_user = self.request.user
        return User.objects.exclude(id=request_user.id)


class ToggleFollowAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, id):
        user = get_object_or_404(User, pk=id)
        if (request.user in user.followers.all()) and (
            user in request.user.following.all()
        ):
            user.followers.remove(request.user)
            request.user.following.remove(user)
            return Response({"Following": False}, status=status.HTTP_200_OK)
        else:
            user.followers.add(request.user)
            request.user.following.add(user)
            return Response({"Following": True}, status=status.HTTP_200_OK)
