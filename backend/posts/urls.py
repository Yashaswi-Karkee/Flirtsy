from django.urls import path
from .views import *

urlpatterns = [
    path('create-post/', CreatePostAPIView.as_view(), name='post-create'),
    path('show-post-user/', UserPostsAPIView.as_view(), name='post-user'),
    path('show-single-post/<id>/', GetSinglePostAPIView.as_view(), name='post-show'),
    path('update-post/<pk>/', UpdatePostAPIView.as_view(), name='post-update'),
    path('show-posts/', ListPostsAPIView.as_view(), name='list-post'),
    path('delete-post/<pk>/', DeletePostAPIView.as_view(), name='post-delete'),
    path('like/<post_id>/', LikePostAPIView.as_view(), name='like-post'),
    path('like-check/<post_id>/', LikePostAPIView.as_view(), name='like-check'),
    path('create-comment/<post_id>/', CommentAPIView.as_view(), name='create-comment'),
    path('show-comment/<post_id>/', CommentAPIView.as_view(), name='show-comment'),
    path('update-comment/<comment_id>/', CommentAPIView.as_view(), name='update-comment'),
    path('delete-comment/<comment_id>/', CommentAPIView.as_view(), name='delete-comment'),
]
