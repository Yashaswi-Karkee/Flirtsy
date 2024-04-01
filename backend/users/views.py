from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.hashers import make_password, check_password

from .serializers import *
from .models import *
from django.http import Http404, HttpResponse
# from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, response


# def loginUser(request):
#     try:
#         user = get_object_or_404(User, email=request.POST['email'])
#         email = request.POST['email']
#         password = request.POST['password']
#         password = make_password(password)
#         check = check_password(user.password,password)
#         if check == False:
#             return HttpResponse("Invalid Password")
#         else:
#             request.session['userId'] = user.id
#     except Http404:
#         return HttpResponse("You are logged in")

# def logout(request):
#     if 'userId' in request.session:
#         del request.session['userId']
#         return HttpResponse("You are logged Out")
#     else:
#         return HttpResponse("Login First")


# def registerUser(request): 
#     try:
#         user = get_object_or_404(User, email=request.POST['email'])
#         return HttpResponse("User Exists")
#     except Http404:
#         em = request.POST['email']
#         pa = request.POST['password']
#         pa = make_password(pa)
#         user = User.objects.create(email = em, password = pa)
#         user.save()
#         return HttpResponse("Registered Successfully")


# def deleteUser(request, user_id):
#     try:
#         user = get_object_or_404(User, id=user_id)
#         if request.method == 'POST':
#             user.delete()
#             return HttpResponse("User deleted")
#     except Http404:
#         return HttpResponse("User not found")


# def create_user_profile(data):
#     user_profile = UserProfile.objects.create(
#         user=data['user'],
#         name=data['name'],
#         gender=data['gender'],
#         dob=data['dob'],
#         profilePicture=data['profilePicture'],
#         bio=data.get('bio', None),
#         document=data['document'],
#         selfie=data['selfie']
#     )
#     return HttpResponse("Created Successfully")


class UserProfileAPIView(generics.ListAPIView):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.all()
    
class UserAPIUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    def update(self, request, *args, **kwargs):
       instance = self.get_object()
       serializer = self.get_serializer(instance, data=request.data, partial=True)

       if serializer.is_valid():
           serializer.save()
           return response.Response({"message": "mobile number updated successfully"})

       else:
           return response.Response({"message": "failed", "details": serializer.errors})
    