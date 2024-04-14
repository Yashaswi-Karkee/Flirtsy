from django.urls import path
from .views import SendPasswordResetEmailView, UpdatePasswordView, UserChangePasswordView, UserLoginView, UserProfileView, UserRegistrationAndProfileView, UserPasswordResetView, UserProfileUpdateAPIView, LogoutView

urlpatterns = [
    path('register/', UserRegistrationAndProfileView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('update-profile/', UserProfileUpdateAPIView.as_view(), name='profile.update'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('update-password/', UpdatePasswordView.as_view(), name='update-password'),
]