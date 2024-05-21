from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.views import APIView
from .serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer, UpdatePasswordSerializer
from django.contrib.auth import authenticate, logout
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from rest_framework.parsers import MultiPartParser
from django.core.mail import send_mail
from django.conf import settings
from .matchingAlgo import find_matching_profiles


# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }


class UserRegistrationAndProfileView(APIView):
    renderer_classes = [UserRenderer]
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        print(request)
        try:
            # User Registration
            user_serializer = UserRegistrationSerializer(data=request.data)
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()

            # UserProfile Creation
            profile_data = {'user': user.id}
            profile_data.update(request.data.dict())  # Convert MultiValueDict to regular dictionary
            profile_serializer = UserProfileSerializer(data=profile_data)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save()

            # Generate Token
            token = get_tokens_for_user(user)
            return Response({'token': token, 'success': 'true'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      profile = user.userprofile
      return Response({'token':token, 'success':'true', 'user_id': profile.id, 'user_email': user.email}, status=status.HTTP_200_OK)
    else:
      return Response({'success':"false",'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):

  serializer_class = UserProfileSerializer
  permission_classes = [IsAuthenticated]
  def get(self, request,format=None):
    user_profile = UserProfile.objects.get(user=request.user)
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data, status=status.HTTP_200_OK)
  

class ListUserProfileAPIView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]


class MatchingProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            # Get the user's profile
            user_profile = request.user.userprofile

            # Find matching profiles
            matching_profiles = find_matching_profiles(user_profile)

            # Serialize matching profiles
            serializer = UserProfileSerializer(matching_profiles, many=True)

            # Return the serialized data
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully',"success": "true"}, status=status.HTTP_200_OK)
  
class UserProfileUpdateAPIView(APIView):
  serializer_class = UserProfileSerializer
  permission_classes = [IsAuthenticated]
  parser_classes = [MultiPartParser]

  def put(self, request, format=None):
    user_profile = UserProfile.objects.get(user=request.user)
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
    if serializer.is_valid():
      # Exclude document and selfie fields from update
      serializer.validated_data.pop('document', None)
      serializer.validated_data.pop('selfie', None)
      serializer.save()
      return Response({"success": "true","data": serializer.data}, status=status.HTTP_200_OK)
    return Response({"success": "false","data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)
  


class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully', "success":"true"}, status=status.HTTP_200_OK)
  
class UpdatePasswordView(APIView):
    permission_class = [IsAuthenticated]
    def put(self, request, *args, **kwargs):
        serializer = UpdatePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Password updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
  permission_class = [IsAuthenticated]
  def get(self, request, format=None):
    try:
      # Use Django's logout function
      logout(request)
      # Return a successful response
      return Response({"msg": "Successfully logged out","success":"true"}, status=status.HTTP_200_OK)
    except():
      return Response({"msg": "User is not logged in","success":"false"}, status=status.HTTP_401_UNAUTHORIZED)