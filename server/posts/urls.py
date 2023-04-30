from django.urls import path
from posts.views import PostCreateAPIView, ListAllPostAPIView, PostLikeAPIView

app_name = "posts"

urlpatterns = [
    path("post/create", PostCreateAPIView.as_view(), name="create-post-api"),
    path("posts", ListAllPostAPIView.as_view(), name="list-posts-api"),
    path(
        "posts/like/<str:id>", PostLikeAPIView.as_view(), name="like-post-api"
    ),
]
