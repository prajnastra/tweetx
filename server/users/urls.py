from django.urls import path
from users.views import UserSignUpView, ListAllUsersAPIView

app_name = "users"

urlpatterns = [
    path("register", UserSignUpView.as_view(), name="register-api"),
    path("users/all", ListAllUsersAPIView.as_view(), name="list-users-api"),
]
