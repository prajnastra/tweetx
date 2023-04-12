from django.urls import path
from posts.views import PostCreateAPIView

app_name = "posts"

urlpatterns = [
    path("post/create", PostCreateAPIView.as_view(), name="create-post-api"),
]
