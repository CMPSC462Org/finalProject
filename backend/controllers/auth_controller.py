from flask import request, jsonify, Response, make_response, redirect, session
from utils.bcrypt_instance import bcrypt
from models.User import User
from app import bcrypt
import os
import re
from dotenv import load_dotenv
from middleware.create_unique_username import generate_unique_username

# MongoDB imports
import mongoengine
from mongoengine.errors import NotUniqueError, ValidationError
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime, timezone
from middleware.generateTokenandcookie import generate_token_and_set_cookie
#google Auth
from requests_oauthlib import OAuth2Session



load_dotenv()
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

#Auth controller


# Google Auth
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth"
GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token"
GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo"

SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]



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
        
        #Check if the email already eixit 
        existing_user = User.objects(email=email).first()
        
        if existing_user and existing_user.auth_provider == "google":
            # Redirect to register with error parameter
            return jsonify({"error": "Email already exist via google, please login via Google"}), 400
           
        #Cheks if the email already exists in the database
       
        if User.objects(email=email).first():
            return jsonify({"error": "Email already exists"}), 400
        

        if not password:
            return jsonify({"error":"Password is required for local sign-up"}), 400

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
                auth_provider="local"
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
        
        existing_user = User.objects(email=email).first()
        
        if existing_user and existing_user.auth_provider == "google":
            # Redirect to login with error parameter
            return jsonify({"error": "Email already exist via google, please login via Google"}) ,400
            


        found_user = User.objects(email=email,auth_provider="local").first()

        if not found_user:
            return jsonify({"error": "User not found or not registered using email/password"}), 404
        
        if not password:
            return jsonify({"error":"Password is required for local sign-up"}), 400
        
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
    


def google_callback():
    try:
        google = OAuth2Session(
            GOOGLE_CLIENT_ID,
            redirect_uri=GOOGLE_REDIRECT_URI,
            state=session.get('oauth_state'),
            scope=SCOPES
        )

        token = google.fetch_token(GOOGLE_TOKEN_URL,
                                   client_secret=GOOGLE_CLIENT_SECRET,
                                     authorization_response=request.url)
        user_info = google.get(GOOGLE_USER_INFO_URL).json()

        email = user_info.get("email")
        first_name = user_info.get("given_name", "")
        last_name = user_info.get("family_name", "")
        profile_picture = user_info.get("picture", "")
        

        existing_user = User.objects(email=email).first()


        # Determine Action
        action = session.get("action", "login")

        # if action == "login" and not existing_user:
        #     return jsonify({"error": "User not found for google login. Please sign up first using google."}), 404

        # If action is "register" and user already exists, reject the registration
        # if action == "register" and existing_user:
        #     return jsonify({"error": f"User already exists with email {email}. Please log in instead."}), 400
        

        if existing_user and existing_user.auth_provider == "local":
            return redirect(f"http://localhost:5173/login?error=email_exist_local")
            # return jsonify({"error": "This email is already registered using email/password please sign in using your password"}), 400

        
        if existing_user and existing_user.auth_provider == "google":
            user = existing_user
            username = user.username
            message = "Login successful via Google"

        else:

            try:
                # generate a unique username for new users

                username = generate_unique_username(email)

                #Build the repsosne data to be passed to the token function
                new_user = User.objects.create(
                    first_name=first_name,
                    last_name=last_name,
                    username=username,
                    email=email,
                    profile_picture=profile_picture,
                    auth_provider="google",
                    password=None  
                )
                new_user.save()
                user = new_user
                message = "Sign Up successful via Google"
            
            except NotUniqueError as nu:
                return jsonify({"error": "Username or email already exists"}), 400
            
        #Make Repsosne the res user data and send it to genrate a token
        

        res_data = {
            "message": message,
            "user": {
                "_id": str(user.id),
                "first_name": user.first_name,
                "last_name": user.last_name,
                "username": username,
                "email": user.email,
                "profile_picture": user.profile_picture,
                "created_at": user.created_at.isoformat(),
            },
            #INclude the token fro furture use (google drive,calender, etc)
            "token" :token
        }

        #get the data from the token and redirect it to the frontend url
        repsonse_data = generate_token_and_set_cookie(user.id, res_data, is_oauth=True)
        
        token = repsonse_data.headers.get("Set-Cookie")
         # Determine the redirect URL based on the action
        
        repsonse_data.headers["Location"] = "http://localhost:5173/dashboard"
        repsonse_data.status_code = 302

        return repsonse_data

    except Exception as e:
        print(f"Error in Google callback: {str(e)}")
        return jsonify({"Error": f"Error with google call back sign-up controller: {str(e)}"}), 500


def google_login():
    try:
        action = request.args.get("action", "login")
        session['action'] = action

        google = OAuth2Session(GOOGLE_CLIENT_ID, redirect_uri=GOOGLE_REDIRECT_URI, scope=SCOPES)
        auth_url, state = google.authorization_url(GOOGLE_AUTH_URL, access_type="offline")
        session['oauth_state'] = state
        #For debugging purposes
        # Include action parameter in the redirect URL
        

        print(f"OAuth_URI: {GOOGLE_REDIRECT_URI}")
        
        return redirect(auth_url)
    except Exception as e:
        print(f"Error in Google callback login: {str(e)}")
        return jsonify({"Error": f"Error with google callback login controller: {str(e)}"}), 500




def linkedin_callback():
    pass

def linkedin_login():
    pass

