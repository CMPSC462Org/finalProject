from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

import os
from pymongo import MongoClient


def connect_mongodb():
    try:
        mongo_uri = os.getenv("MONGO_URI")
        client = MongoClient(mongo_uri)
        db = client["jobFlow_finalprojectDB"]
        print("Connected to MongoDB")
        print(f"MongoDB Name: {db.name}")
        return db
    except Exception as e:
        print(f"Error Connecting to MongoDB: {e}")
        return None