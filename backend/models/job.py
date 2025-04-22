from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from  db.connect_mongo_db import get_mongo_db

import os
import pymongo
from pymongo import MongoClient
import mongoengine
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime, timezone