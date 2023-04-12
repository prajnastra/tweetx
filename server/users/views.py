from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers import CreateUserSerializer

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
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
