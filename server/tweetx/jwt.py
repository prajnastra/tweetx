from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["aud"] = []
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses
        data["id"] = self.user.id
        data["email"] = self.user.email
        data["first_name"] = self.user.first_name
        data["last_name"] = self.user.role
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
