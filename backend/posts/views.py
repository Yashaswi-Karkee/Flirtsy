from rest_framework import generics

from users.models import UserProfile
from users.serializers import UserProfileSerializer
from .models import Post, Like, Comment
from .serializers import CommentUserSerializer, PostSerializer, LikeSerializer, CommentSerializer, UserPostSerializer
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404


class CreatePostAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def create(self, request, *args, **kwargs):
        request.data['user'] = self.request.user.userprofile.id  # Set user here
        serializer = self.get_serializer(data=request.data)
        print(request)

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
    parser_classes = [MultiPartParser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print(instance)
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
        return Response({'success':"true"},status=status.HTTP_204_NO_CONTENT)
    

class ListPostsAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = UserPostSerializer
    permission_classes = [IsAuthenticated]


class LikePostAPIView(APIView):
    def post(self, request, post_id):
        user_profile = request.user.userprofile
        post = get_object_or_404(Post, pk=post_id)

        # Check if a like already exists for this user and post
        existing_like = Like.objects.filter(user=user_profile, post=post).first()

        if existing_like:
            # If the like exists, delete it
            existing_like.delete()
            return Response({'message': 'Like removed'}, status=status.HTTP_200_OK)
        else:
            # If the like does not exist, create a new one
            like = Like(user=user_profile, post=post)
            like.save()
            return Response({'message': 'Post liked'}, status=status.HTTP_201_CREATED)


    def get(self, request, post_id):
        post = Post.objects.get(pk=post_id)
        total_likes = Like.objects.filter(post=post).count()
        user_profile = request.user.userprofile
        existing_like = Like.objects.filter(user=user_profile, post=post.id).first()
        print(existing_like)
        if(existing_like):
            return Response({'result': 'true', 'total_likes': total_likes}, status=status.HTTP_200_OK)
        else:
            return Response({'result': 'false', 'total_likes': total_likes}, status=status.HTTP_200_OK)


class CommentAPIView(APIView):
    def get(self, request, post_id):
        user = UserProfile.objects.get(user=request.user)
        user_serializer = UserProfileSerializer(user, many=False)
        print(user_serializer.data)
        comments = Comment.objects.filter(post_id=post_id)
        serializer = CommentUserSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, post_id):
        # Create a mutable copy of request.data
        mutable_data = request.data.copy()
        print("Mutated data",mutable_data)
        print("Request data",request.data)
        
        # Modify the mutable copy
        mutable_data["user"] = request.user.userprofile.id
        mutable_data["post"] = post_id

        print(mutable_data)
        
        # Create a serializer with the modified data
        serializer = CommentSerializer(data=mutable_data)
        print(serializer)
        
        # Validate and save the serializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, comment_id):
        try:
            comment = Comment.objects.get(pk=comment_id)
            if comment.user != request.user.userprofile:
                return Response({'error': 'You do not have permission to update this comment'}, status=status.HTTP_403_FORBIDDEN)
            serializer = CommentSerializer(comment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, comment_id):
        try:
            comment = Comment.objects.get(pk=comment_id)
            if comment.user != request.user.userprofile:
                return Response({'error': 'You do not have permission to delete this comment'}, status=status.HTTP_403_FORBIDDEN)
            comment.delete()
            return Response({'message': 'Comment deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
    

class UserPostsAPIView(generics.ListAPIView):
    serializer_class = UserPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retrieve the UserProfile of the logged-in user
        user_profile = self.request.user.userprofile
        # Filter posts where the user is the owner
        queryset = Post.objects.filter(user=user_profile)
        return queryset
    
class GetSinglePostAPIView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()  # queryset for all posts

    def get_object(self):
        # Retrieve the post based on the ID provided in the URL
        post_id = self.kwargs.get('id')
        return self.get_queryset().get(id=post_id)
    