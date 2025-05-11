from models.User import User
import uuid


def generate_unique_username(email):
    """creates a unique username based on the email"""

    base_username = email.split('@')[0]
    username = base_username


    # check if someone's username already exists

    counter = 1
    while User.objects(username=username).first():
        #Append the number or UUiD fragemnt to ensure uniqueness

        username = f"{base_username}_{str(uuid.uuid4())[:6]}"
        counter += 1

    return username
