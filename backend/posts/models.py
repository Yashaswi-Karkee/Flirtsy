from django.db import models
import uuid
from users.models import UserProfile

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(UserProfile, on_delete = models.CASCADE)
    postPicture = models.ImageField(upload_to="posts/")
    caption = models.CharField(max_length=1000, null=True, blank=True)

class Like(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post,on_delete = models.CASCADE)
    user = models.OneToOneField(UserProfile, on_delete = models.CASCADE)

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post,on_delete = models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete = models.CASCADE)
    comment = models.CharField(max_length=1000, null=True, blank=True)

