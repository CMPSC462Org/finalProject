from models.User import User
from flask import request, jsonify, Response, make_response
from functools import wraps
import os
from dotenv import load_dotenv
import jwt

import mongoengine
from mongoengine.errors import NotUniqueError, ValidationError
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime, timezone
from middleware.generateTokenandcookie import generate_token_and_set_cookie

load_dotenv()
#Get token from user, decode it, and see if the user exist in the db by matching the user id
def protected_route(f):
    @wraps(f)

    def decorator(*args, **kwargs):

        #get the token from the cookies

        token = request.cookies.get("token")

        if not token:
            return jsonify({"error": "Unauthorized. No token provided"}), 401
        
        try:

            #decode the token 

            data = jwt.decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
        
         #find the user in the database using the id from the token

            current_user  = User.objects.get(id=data["user_id"])

            if not current_user:
                return jsonify({"error": "Unauthorized. User not found"}), 401
            
        
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        except Exception as e:
            return jsonify({"error": f"Authorization failed: {str(e)}"}), 401
        
        return f(current_user, *args, **kwargs)
    return decorator