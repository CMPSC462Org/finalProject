from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # Save user to DB (pseudo)
    return jsonify({
        "message": "User registered",
        "user": {
            "id": "abc123",
            "email": data["email"],
            "username": data["username"]
        },
        "token": "FAKE_JWT_TOKEN"
    })

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return jsonify({
        "message": "Login successful",
        "user": {
            "id": "abc123",
            "email": data["email"],
            "username": "johndoe123"
        },
        "token": "FAKE_JWT_TOKEN"
    })

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({ "message": "Logout successful" })

@auth_bp.route('/user/profile', methods=['GET'])
def get_profile():
    return jsonify({
        "message": "User profile retrieved successfully",
        "user": {
            "id": "abc123",
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe123",
            "email": "john.doe@gmail.com"
        }
    })
