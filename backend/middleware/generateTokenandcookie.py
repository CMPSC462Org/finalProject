from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import jwt
from flask import request, jsonify, Response, make_response


import os
import pymongo
from pymongo import MongoClient
import mongoengine
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime, timezone, timedelta


load_dotenv()

def generate_token_and_set_cookie(user_id, res_data, is_oauth=False):
    try:
        secret_key = os.getenv("JWT_SECRET_KEY")
        print(f"Secret key retrieved: {secret_key is not None}")  # Check if key exists
        
        if not secret_key:
            print("JWT_SECRET_KEY is missing from environment")
            return jsonify({"error": "Server configuration error: Missing JWT key"}), 500
        

        token = jwt.encode(
            {
            "user_id": str(user_id), "exp": datetime.utcnow() + timedelta(days=1),
            "iat": datetime.utcnow(),
            
            },
            os.getenv("JWT_SECRET_KEY"),
            algorithm="HS256",
        )

        response = make_response(jsonify(res_data), 201)

        samesite_setting = "Lax" if is_oauth else "Strict"


        response.set_cookie(
            "token",
            token,
            httponly=True,
            secure=(os.getenv("FLASK_ENV") != "development"),  
            samesite=samesite_setting,  
            max_age= 30 * 24 *60 * 60,  # 30 days in seconds
            domain="localhost"
        )
        return response
    
    except Exception as e:
        print(f"Error generating token or setting cookie: {e}")
        return jsonify({"error": "Failed to generate token"}), 500