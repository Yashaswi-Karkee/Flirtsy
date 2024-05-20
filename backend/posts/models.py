import os
from django.db import models
import uuid
from users.models import UserProfile

class Post(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    postPicture = models.ImageField(upload_to="posts/")
    caption = models.CharField(max_length=1000)

    def delete(self, *args, **kwargs):
        # Delete associated images from the server
        for field in ['postPicture']:
            image_field = getattr(self, field)
            if image_field:
                if os.path.isfile(image_field.path):
                    os.remove(image_field.path)
        super().delete(*args, **kwargs)

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    comment = models.CharField(max_length=1000)
