from .models import UserProfile

def find_matching_profiles(user_profile):
    # Get user's interests and age range criteria
    user_interest = user_profile.is_interested_in
    user_age_min = user_profile.age_group_min
    user_age_max = user_profile.age_group_max
    results = find_matches(user_profile)
    print(user_interest, user_age_min, user_age_max)
    
    matched_profiles = []
    
    for profile in results:
        if profile.gender == user_interest and user_age_min <= profile.age <= user_age_max:
            matched_profiles.append(profile)

    # # Query profiles that match user's interests and age range criteria
    # matching_profiles = UserProfile.objects.filter(
    #     gender=user_interest,
    #     age__gte=user_age_min,
    #     age__lte=user_age_max,
    # ).exclude(user=user_profile.user)  # Exclude the user's own profile from the results

    return matched_profiles

import numpy as np

def normalize(vector):
    norm = np.linalg.norm(vector)
    return vector if norm == 0 else vector / norm

def dot_product(vector1, vector2):
    return np.dot(vector1, vector2)

def cosine_similarity(vector1, vector2):
    vector1 = normalize(vector1)
    vector2 = normalize(vector2)
    return dot_product(vector1, vector2)

def hobbies_interests_vector(user_profile, all_hobbies, all_interests):
    hobbies_list = user_profile.get_hobbies_list()
    interests_list = user_profile.get_interests_list()
    
    hobbies_vector = [1 if hobby in hobbies_list else 0 for hobby in all_hobbies]
    interests_vector = [1 if interest in interests_list else 0 for interest in all_interests]
    
    return hobbies_vector + interests_vector

def get_all_hobbies_and_interests():
    all_hobbies = set()
    all_interests = set()
    
    for profile in UserProfile.objects.all():
        all_hobbies.update(profile.get_hobbies_list())
        all_interests.update(profile.get_interests_list())
        
    return list(all_hobbies), list(all_interests)

def find_matches(user_profile):
    all_hobbies, all_interests = get_all_hobbies_and_interests()
    user_vector = hobbies_interests_vector(user_profile, all_hobbies, all_interests)
    
    all_profiles = UserProfile.objects.exclude(id=user_profile.id)
    matched_profiles = []
    
    for profile in all_profiles:
        other_vector = hobbies_interests_vector(profile, all_hobbies, all_interests)
        similarity_score = cosine_similarity(user_vector, other_vector)
        matched_profiles.append((profile, similarity_score))
    
    matched_profiles.sort(key=lambda x: x[1], reverse=True)
    # Extract the UserProfile instances from the sorted list of tuples
    sorted_profiles = [profile for profile, score in matched_profiles]
    
    return sorted_profiles

# Example usage in a view
# def get_matches(request):
#     user_profile = UserProfile.objects.get(user=request.user)
#     matches = find_matches(user_profile)
    # Return matches in the desired format, e.g., render a template or return JSON