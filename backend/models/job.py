from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from  db.connect_mongo_db import get_mongo_db
from models.User import User

import os
import pymongo
from pymongo import MongoClient
import mongoengine
from mongoengine import Document, StringField, EmailField, DateTimeField ,ReferenceField
from datetime import datetime, timezone


class Job(Document):
    title = StringField(required=True)
    company_name = StringField(required=True)
    status = StringField(required=True, choices=["applied", "interview", "offered", "rejected"])
    location = StringField(required=True)  
    date_applied = DateTimeField(default=lambda: datetime.now(timezone.utc))
    user_id = ReferenceField(User, required=True)  # Reference to the User ID

    # Time Stamps
    created_at = DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = DateTimeField(default=lambda: datetime.now(timezone.utc))

    #protects the save method from crashing
    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super(Job, self).save(*args, **kwargs)