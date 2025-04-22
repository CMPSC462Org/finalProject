from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS

from dotenv import load_dotenv
from utils.bcrypt_instance import bcrypt
from routes.auth_routes import auth_routes
from db.connect_mongo_db import connect_mongodb
import os

#__init__.py




def create_app():
    app = Flask(__name__)
    load_dotenv()
    bcrypt.init_app(app)
    CORS(app, supports_credentials=True)

    app.mongo_db = connect_mongodb()
    app.register_blueprint(auth_routes, url_prefix="/api/auth")
    

    @app.route("/", methods=["GET"])
    def index():
        return  {"message" : "Stop right there evil doer!"}


    return app

    
    

    