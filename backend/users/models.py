import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator

class UserManager(BaseUserManager):
    def create_user(self, email, name,tc, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            tc=tc,
            name=name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,tc, password=None):
        user = self.create_user(
            email,
            tc=tc,
            password=password,
            name=name
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=20)
    tc = models.BooleanField()
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','tc']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    dob = models.DateField()
    profile_picture = models.ImageField(upload_to="images/profilePictures")
    bio = models.CharField(max_length=1000, null=True, blank=True)
    document = models.ImageField(upload_to="images/documents")
    selfie = models.ImageField(upload_to="images/selfies")
    age = models.IntegerField()
    age_group_min = models.IntegerField(default=18, validators=[MinValueValidator(18)])
    age_group_max = models.IntegerField(default=100, validators=[MaxValueValidator(100)])
    hobbies = models.CharField(max_length=255, blank=True, default="")
    interests = models.CharField(max_length=255, blank=True, default="")
    
    is_interested_in = models.CharField(max_length=10, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ])

    def get_hobbies_list(self):
        return self.hobbies.split(',') if self.hobbies else []

    def get_interests_list(self):
        return self.interests.split(',') if self.interests else []
    
    def __str__(self):
        return f"UserProfile: {self.name} "
    
    def delete(self, *args, **kwargs):
        # Delete associated images from the server
        for field in ['profile_picture', 'document', 'selfie']:
            image_field = getattr(self, field)
            if image_field:
                if os.path.isfile(image_field.path):
                    os.remove(image_field.path)
        super().delete(*args, **kwargs)
