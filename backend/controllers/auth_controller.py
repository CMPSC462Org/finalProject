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

        try:
            new_user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                password=hashed_pw,
                profile_picture=profile_picture,
            )
        except NotUniqueError as nu:
            return jsonify({"error": "Username or email already exists"}), 400

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
                    "created-at": new_user.created_at.isoformat()
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
        print(f"error in Signup controller: {str(e)}")
        return jsonify({"error": f"Error in signup controller: {str(e)}"}), 500
    

def login():
    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form
        
        email_regex = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

        email = data.get("email")
        password = data.get("password")

        if email_regex.match(email) is None:
            return jsonify({"error": "Invalid email format"}), 400

        found_user = User.objects(email=email).first()

        if not found_user:
            return jsonify({"error": "User not found"}), 404
        
        if not bcrypt.check_password_hash(found_user.password, password):
            return jsonify({"error": "Invalid password"}), 400
        
        res_data = {
            "message": "Login successful",
            "user": {
                "_id": str(found_user.id),
                "first_name": found_user.first_name,
                "last_name": found_user.last_name,
                "username": found_user.username,
                "email": found_user.email,
                "profile_picture": found_user.profile_picture,
                "created_at": found_user.created_at.isoformat()

            }
        }

        return generate_token_and_set_cookie(found_user.id, res_data)




        # Validates if the user if found
        
    
    except Exception as e:
        print(f"error in Login controller: {str(e)}")
        return jsonify({"error": f"Error in login controller: {str(e)}"}), 500

def logout():
    try:
        response = make_response(jsonify({"message": "Logout successful"}), 200)
        response.set_cookie("token", "", max_age=0)
        return response

    except Exception as e:
        print(f"error in Logout controller: {str(e)}")
        return jsonify({"error": f"Error in logout controller: {str(e)}"}), 500

def getMe(current_user):
    try:
        user_data = {
            "_id": str(current_user.id),
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
            "username": current_user.username,
            "email": current_user.email,
            "profile_picture": current_user.profile_picture,
            "created_at": current_user.created_at.isoformat()
        }
        return jsonify({"user": user_data}), 200
    except Exception as e:
        print(f"Error in the Get me controller: {str(e)}")
        return jsonify({"Error": f"Error in get me controller: {str(e)}"}), 500






