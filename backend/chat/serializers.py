from rest_framework import serializers
from .models import Message
from users.serializers import UserProfileSerializer
from users.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserProfileSerializer(read_only=True)
    receiver = UserProfileSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp']

    def validate_content(self, value):
        """
        Check that the content is not empty.
        """
        if not value.strip():
            raise serializers.ValidationError("Message content cannot be empty.")
        return value