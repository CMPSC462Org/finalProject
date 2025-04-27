from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv


import mongoengine
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime, timezone


class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True, min_length=6)
    profile_picture = StringField(default="",required=False)


    # Time Stamps
    created_at = DateTimeField(default= lambda: datetime.now(timezone.utc))
    updated_at = DateTimeField(default= lambda: datetime.now(timezone.utc))

    #protects the save method from crashing
    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super(User, self).save(*args, **kwargs)
    

    
    

        
       


