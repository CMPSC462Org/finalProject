from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from auth import auth_bp
from jobs import jobs_bp
import os


bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)

    load_dotenv()
    bcrypt.init_app(app)
    CORS(app, supports_credentials=True)
    
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(jobs_bp, url_prefix='/api')

    @app.route("/", methods=["GET"])
    def index():
        return  {"message" : "Hello world!"}
    
    
    
    

    return app

    
    

    