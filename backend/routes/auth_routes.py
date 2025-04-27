from flask import Blueprint
from controllers import auth_controller
from middleware.protected_route import protected_route




auth_routes = Blueprint("auth_routes", __name__)


auth_routes.route("/signup", methods=["POST"])(auth_controller.sign_up)
auth_routes.route("/login", methods=["POST"])(auth_controller.login)
auth_routes.route("/logout", methods=["POST"])(auth_controller.logout)
auth_routes.route("/me",  methods=["GET"])(protected_route(auth_controller.getMe))