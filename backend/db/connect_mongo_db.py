from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from mongoengine import connect
import os
from pymongo import MongoClient


def connect_mongodb():
    try:
        mongo_uri = os.getenv("MONGODB_URL")
        db = connect(
            host=mongo_uri,
            alias="default"
        )
        print("Connected to MongoDB (via mongoengine)")
        print(f"Database Name: {db.name}")
        
        return db
    except Exception as e:
        print(f"Error Connecting to MongoDB: {e}")
        return None
    
