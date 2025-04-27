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



def create_job(current_user):
    pass

def get_jobs(current_user):
    pass

def get_job_by_id(current_user, job_id):
    pass

def update_job(current_user, job_id):
    pass

def delete_job(current_user, job_id):
    pass