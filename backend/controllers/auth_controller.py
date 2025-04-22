from flask import request, jsonify, Response, make_response
from utils.bcrypt_instance import bcrypt
from models.User import User
from app import bcrypt
import os
import re

# MongoDB imports
import mongoengine
from mongoengine.errors import NotUniqueError, ValidationError
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime, timezone
from middleware.generateTokenandcookie import generate_token_and_set_cookie

#Auth controller
def sign_up():

    try:
        
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form

        email_regex = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")
        profile_picture = data.get("profile_picture", "")
        
        """
        Mandatory checks before saving user to the database
        """
        #Checks to seee if entered email matches the email format
        if email_regex.match(email) is None:
            return jsonify({"error": "Invalid email format"}), 400

        #Check is the usernmae already exists in the database
        
        if User.objects(username=username).first():
            return jsonify({"error": "Username already exists"}), 400
        

        #Cheks if the email already exists in the database
       
        if User.objects(email=email).first():
            return jsonify({"error": "Email already exists"}), 400
        

        #Makes sure the password is 
        if len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters long"}), 400
        
        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")

        new_user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=hashed_pw,
            profile_picture=profile_picture,
        )

        if new_user:
            res_data = {
                "message": "User created successfully",
                "user": {
                    "_id": str(new_user.id),
                    "first_name": new_user.first_name,
                    "last_name": new_user.last_name,
                    "username": new_user.username,
                    "email": new_user.email,
                    "profile_picture": new_user.profile_picture,
                }
            }
            
            return generate_token_and_set_cookie(new_user.id, res_data)
        else:
            return jsonify({"error": "Invalid user credentials"}), 500
            


        
    
    except NotUniqueError:
        return jsonify({"error": "Username or email already exists"}), 400
    
    except ValidationError as ve:
        return jsonify({"error": f"Validation Error: {str(ve.message)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error in signup controller: {str(e)}"}), 500
    

def login():
    pass

def logout():
    pass

def protected_route():
    pass






