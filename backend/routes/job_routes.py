from flask import Blueprint
from controllers import auth_controller
from controllers import job_controller
from middleware.protected_route import protected_route


job_routes = Blueprint("job_routes", __name__)

job_routes.route("/createjob", methods=["POST"])(protected_route(job_controller.create_job))
job_routes.route("/getjobs", methods=["GET"])(protected_route(job_controller.get_jobs))
job_routes.route("/getjob/<job_id>", methods=["GET"])(protected_route(job_controller.get_job_by_id))
job_routes.route("/updatejob/<job_id>", methods=["PUT"])(protected_route(job_controller.update_job))
job_routes.route("/deletejob/<job_id>", methods=["DELETE"])(protected_route(job_controller.delete_job))