from django.urls import path
from users.views import UserSignUpView

app_name = "users"

urlpatterns = [
    path("register", UserSignUpView.as_view(), name="register-api"),
]
