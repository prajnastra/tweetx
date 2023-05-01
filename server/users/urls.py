from django.urls import path
from users.views import UserSignUpView, ListAllUsersAPIView, ToggleFollowAPIView

app_name = "users"

urlpatterns = [
    path("register", UserSignUpView.as_view(), name="register-api"),
    path("users/all", ListAllUsersAPIView.as_view(), name="list-users-api"),
    path(
        "follow/<str:id>",
        ToggleFollowAPIView.as_view(),
        name="toggle-follow-api",
    ),
]
