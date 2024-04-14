from rest_framework import serializers
from .models import Message
from users.serializers import UserSerializer
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

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