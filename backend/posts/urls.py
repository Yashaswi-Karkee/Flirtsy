from django.urls import path
from .views import *

urlpatterns = [
    path('create-post/', CreatePostAPIView.as_view(), name='post-create'),
    path('show-post-user/', UserPostsAPIView.as_view(), name='post-user'),
    path('update-post/<int:pk>/', UpdatePostAPIView.as_view(), name='post-update'),
    path('show-posts/', ListPostsAPIView.as_view(), name='list-post'),
    path('delete-post/<int:pk>/', DeletePostAPIView.as_view(), name='post-delete'),
    path('like/<int:post_id>', LikePostAPIView.as_view(), name='like-post'),
    path('create-comment/<int:post_id>/', CommentAPIView.as_view(), name='create-comment'),
    path('comment/<int:post_id>/<int:comment_id>', CommentAPIView.as_view(), name='comment'),
]
