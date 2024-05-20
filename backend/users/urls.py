from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegistrationAndProfileView.as_view(), name='register'),
    path('matching-profile/', MatchingProfileAPIView.as_view(), name='match-profile'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('all-profile/', ListUserProfileAPIView.as_view(), name='all-profile'),
    path('update-profile/', UserProfileUpdateAPIView.as_view(), name='profile.update'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('update-password/', UpdatePasswordView.as_view(), name='update-password'),
]