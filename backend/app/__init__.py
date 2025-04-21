from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

from db.connect_mongo_db import connect_mongodb
import os



bcrypt = Bcrypt()


def create_app():
    app = Flask(__name__)
    load_dotenv()
    bcrypt.init_app(app)
    CORS(app, supports_credentials=True)

    app.mongo_db = connect_mongodb()
    

    @app.route("/", methods=["GET"])
    def index():
        return  {"message" : "Hello world!"}


    return app

    
    

    