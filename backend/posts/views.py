from rest_framework import generics
from .models import Post, Like, Comment
from .serializers import PostSerializer, LikeSerializer, CommentSerializer
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema

class CreatePostAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not request.data.get('postPicture'):
            return Response({'error': 'postPicture is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.data.get('caption'):
            return Response({'error': 'caption is required'}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UpdatePostAPIView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

class DeletePostAPIView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ListPostsAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class LikePostAPIView(APIView):
    def post(self, request, post_id):
        user = request.user
        post = Post.objects.get(pk=post_id)

        # Check if the user has already liked the post
        try:
            existing_like = Like.objects.get(user=user, post=post)
            # If the user has already liked the post, delete the like
            existing_like.delete()
            return Response({'message': 'Like removed'}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            # If the user has not liked the post yet, create a new like
            like = Like(user=user, post=post)
            like.save()
            return Response({'message': 'Post liked'}, status=status.HTTP_201_CREATED)

    def get(self, request, post_id):
        post = Post.objects.get(pk=post_id)
        total_likes = Like.objects.filter(post=post).count()
        return Response({'total_likes': total_likes}, status=status.HTTP_200_OK)

class CommentAPIView(APIView):
    def post(self, request, post_id):
        user = request.user
        post = Post.objects.get(pk=post_id)
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, post_id, comment_id):
        user = request.user
        comment = Comment.objects.get(pk=comment_id)

        if comment.user != user:
            return Response({'error': 'You do not have permission to edit this comment'}, status=status.HTTP_403_FORBIDDEN)

        serializer = CommentSerializer(comment, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id, comment_id):
        user = request.user
        comment = Comment.objects.get(pk=comment_id)

        if comment.user != user:
            return Response({'error': 'You do not have permission to delete this comment'}, status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response({'message': 'Comment deleted'}, status=status.HTTP_204_NO_CONTENT)
    

class UserPostsAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)