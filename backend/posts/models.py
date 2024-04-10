from django.db import models
import uuid
from users.models import UserProfile

class Post(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    postPicture = models.ImageField(upload_to="posts/")
    caption = models.CharField(max_length=1000, null=True, blank=True)

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    comment = models.CharField(max_length=1000, null=True, blank=True)
