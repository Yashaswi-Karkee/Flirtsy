from django.forms import ValidationError
from rest_framework import serializers
from .models import Post, Like, Comment
from users.serializers import UserProfileSerializer


class LikeSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    class Meta:
        model = Like
        fields = '__all__'
    
    def get_likes_count(self, obj):
        return Like.objects.filter(post=obj).count()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CommentUserSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    class Meta:
        model = Comment
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class UserPostSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, source='comment_set')  # Specify the related name here

    class Meta:
        model = Post
        fields = '__all__'

    def get_likes_count(self, obj):
        return obj.like_set.count()