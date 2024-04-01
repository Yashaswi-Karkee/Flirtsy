from django.urls import path, include

from users import views
from .views import *


urlpatterns = [
    # path('login/',views.loginUser,name='login.user'),
    # path('logout/',views.logout,name='login.user'),
    # path('register/',views.registerUser,name='register.user')
    path('showUser/', UserProfileAPIView.as_view(), name="show.users.profile"),
    path('update-user/<uuid:id>/', UserAPIUpdate.as_view(), name="update.users"),
]