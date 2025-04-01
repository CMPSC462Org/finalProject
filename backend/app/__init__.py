from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os


bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)

    load_dotenv()
    bcrypt.init_app(app)
    CORS(app)



    @app.route("/", methods=["GET"])
    def index():
        return  { "message": "Welcome to the flask Server!"}

    return app

    
    

    