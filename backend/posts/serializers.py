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
    user = UserProfileSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    likes = LikeSerializer(many=True, source='like_set')
    comments = CommentSerializer(many=True, source='comment_set')
    class Meta:
        model = Post
        fields = '__all__'
