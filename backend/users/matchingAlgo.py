from .models import UserProfile

def find_matching_profiles(user_profile):
    # Get user's interests and age range criteria
    user_interest = user_profile.is_interested_in
    user_age_min = user_profile.age_group_min
    user_age_max = user_profile.age_group_max
    print(user_interest, user_age_min, user_age_max)   

    # Query profiles that match user's interests and age range criteria
    matching_profiles = UserProfile.objects.filter(
        gender=user_interest,
        age__gte=user_age_min,
        age__lte=user_age_max,
    ).exclude(user=user_profile.user)  # Exclude the user's own profile from the results

    return matching_profiles

