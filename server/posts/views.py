from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer, PublicPostSerializer
from .models import Posts


class ListAllPostAPIView(ListAPIView):
    serializer_class = PublicPostSerializer
    queryset = Posts.objects.all()


class PostCreateAPIView(CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
