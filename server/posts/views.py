from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import PostSerializer, PublicPostSerializer
from .models import Posts


class ListAllPostAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PublicPostSerializer

    def get_queryset(self):
        my_filter_qs = Q()
        for usr in self.request.user.following.all():
            print(usr)
            if usr:
                my_filter_qs = my_filter_qs | Q(user=usr)
        my_filter_qs = my_filter_qs | Q(user=self.request.user)
        print(my_filter_qs)
        return Posts.objects.filter(my_filter_qs)


class PostCreateAPIView(CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostLikeAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, id):
        liked_object = get_object_or_404(Posts, pk=id)
        if request.user in liked_object.likes.all():
            liked_object.likes.remove(request.user)
            return Response({"liked": False}, status=status.HTTP_200_OK)
        else:
            liked_object.likes.add(request.user)
            return Response({"liked": True}, status=status.HTTP_200_OK)
