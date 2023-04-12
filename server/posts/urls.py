from django.urls import path
from posts.views import PostCreateAPIView, ListAllPostAPIView

app_name = "posts"

urlpatterns = [
    path("post/create", PostCreateAPIView.as_view(), name="create-post-api"),
    path("posts", ListAllPostAPIView.as_view(), name="list-posts-api"),
]
