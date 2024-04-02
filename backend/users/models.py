from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from datetime import date
from django.utils import timezone
from pytz import timezone as pytz_timezone
from django.forms import ValidationError

def validate_date(value):
    kathmandu_timezone = pytz_timezone('Asia/Kathmandu')
    kathmandu_now = timezone.now().astimezone(kathmandu_timezone)
    age = kathmandu_now.year - value.year - ((kathmandu_now.month, kathmandu_now.day) < (value.month, value.day))
    if value >= date.today():
        raise ValidationError('Date must be in the past.')
    elif age < 18:
        raise ValidationError('You must be above 18 years old.')

#  Custom User Manager
class UserManager(BaseUserManager):
  def create_user(self, email, name, tc, password=None, password2=None):
      """
      Creates and saves a User with the given email, name, tc and password.
      """
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
          tc=tc,
      )

      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, email, name, tc, password=None):
      """
      Creates and saves a superuser with the given email, name, tc and password.
      """
      user = self.create_user(
          email,
          password=password,
          name=name,
          tc=tc,
      )
      user.is_admin = True
      user.save(using=self._db)
      return user

#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  name = models.CharField(max_length=200)
  tc = models.BooleanField()
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'tc']

  def __str__(self):
      return self.email

  def has_perm(self, perm, obj=None):
      "Does the user have a specific permission?"
      # Simplest possible answer: Yes, always
      return self.is_admin

  def has_module_perms(self, app_label):
      "Does the user have permissions to view the app `app_label`?"
      # Simplest possible answer: Yes, always
      return True

  @property
  def is_staff(self):
      "Is the user a member of staff?"
      # Simplest possible answer: All admins are staff
      return self.is_admin
  
class UserProfile(models.Model):
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