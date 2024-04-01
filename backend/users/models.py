from datetime import date
from django.utils import timezone
from pytz import timezone as pytz_timezone
import uuid
from django.db import models
from django.forms import ValidationError

def validate_date(value):
    kathmandu_timezone = pytz_timezone('Asia/Kathmandu')
    kathmandu_now = timezone.now().astimezone(kathmandu_timezone)
    age = kathmandu_now.year - value.year - ((kathmandu_now.month, kathmandu_now.day) < (value.month, value.day))
    if value >= date.today():
        raise ValidationError('Date must be in the past.')
    elif age < 18:
        raise ValidationError('You must be above 18 years old.')

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=200)
    role = models.CharField(max_length=6, default="user")

    def __str__(self):
        return f"ID: {self.id}\n Email: {self.email}"
    

    
class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    name = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    dob = models.DateField(validate_date)
    profilePicture = models.ImageField(upload_to="images/profilePictures")
    bio = models.CharField(max_length=1000, null=True, blank=True)
    document = models.ImageField(upload_to="images/documents")
    selfie = models.ImageField(upload_to="images/selfies")

    def __str__(self):
       return f"ID: {self.id}\n Name: {self.name}"



    
