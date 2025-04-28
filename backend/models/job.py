from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from models.User import User

import os
import pymongo
from pymongo import MongoClient
import mongoengine
from mongoengine import Document, StringField, EmailField, DateTimeField ,ReferenceField,ListField
from datetime import datetime, timezone


class Job(Document):
    title = StringField(required=True)
    company_name = StringField(required=True)
    status = StringField(required=True, choices=["applied", "interviewed", "offered", "rejected"]) 
    application_date = DateTimeField(default=lambda: datetime.now(timezone.utc))
    comments = ListField(StringField())
    link = StringField(required=False)
    user_id = ReferenceField(User, required=True)  # Reference to the User ID

    # Time Stamps
    created_at = DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = DateTimeField(default=lambda: datetime.now(timezone.utc))

    #protects the save method from crashing
    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super(Job, self).save(*args, **kwargs)