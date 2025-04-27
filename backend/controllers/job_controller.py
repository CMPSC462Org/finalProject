from flask import request, jsonify, Response, make_response
from utils.bcrypt_instance import bcrypt
from models.User import User
from models.job import Job
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
    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form
        
        title = data.get("title")
        company_name = data.get("company_name")
        status = data.get("status")
        application_date = data.get("application_date")
        comments = data.get("comments", [])
        link = data.get("link","")
        
        

        # Validate mandatory fields
        if not title or not company_name or not status or not application_date:
            return jsonify({"error": "All fields are required"}), 400

        # Create a new job entry
        new_job = Job (
            title=title,
            company_name=company_name,
            status=status,
            application_date=application_date,
            comments = comments,
            link = link,
            user_id=current_user.id, 
        )
        new_job.save()

        job_data = {
            "_id":str(new_job.id),
            "title": new_job.title,
            "company": new_job.company_name,
            "status": new_job.status,
            "application_date":new_job.application_date,
            "comments": new_job.comments,
            "link": new_job.link
        }

        return jsonify({"message": "Job created successfully", "job": job_data}), 201

    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"Error creating job entry: {e}")
        return jsonify({"error": "Failed to create job entry"}), 500   

def get_jobs(current_user):
    try:
        job_list = []
        list_of_jobs = Job.objects(user_id=current_user.id)

        if not list_of_jobs:
            return jsonify({"message": "No jobs found yet","jobs":[] }), 200
        
        
        for job in list_of_jobs:
            job_list.append(
                    {
                    "_id": job.id,
                    "title": job.title,
                    "company_name": job.company_name,
                    "status": job.status,
                    "application_date": job.application_date,
                    "comments": job.comments,
                    "link": job.link
                }
            )

        
        return jsonify({"Message": "Job entries retrieved successfully","jobs" :job_list}), 200

            
    except Exception as e:
        print(f"Error getting User's job entries {e}")
        return jsonify({"error": "Failed to get User's Job entries"}), 500

def get_job_by_id(current_user, job_id):
    try:
        selected_job = Job.objects(user_id=current_user.id, id=job_id).first()

        if not selected_job:
            return jsonify({"message": "Job or Job ID not found",job_id:job_id}), 200
        

        selected_job_data ={ 
            
            "_id":str(selected_job.id),
            "title": selected_job.title,
            "company": selected_job.company_name,
            "status": selected_job.status,
            "application_date":selected_job.application_date,
            "comments": selected_job.comments,
            "link": selected_job.link
            
            }
        
        return jsonify({"message": "Job retrieved successfully", "job": selected_job_data}),200
    except Exception as e:
        print(f"Error retrieving Job {e}")
        return jsonify({"error":"Failed to retrieve Job entry"}),500

def update_job(current_user, job_id):
    try:
        selected_job = Job.objects(user_id=current_user.id, id=job_id).first()

        if not selected_job:
            return jsonify({"message": "Job or Job ID not found",job_id:job_id}), 200

        if request.is_json:
            data = request.get_json()
        else:
            data = request.form

        allowed_fields = ["title", "company_name", "status", "application_date", "comments", "link"]

        #Don't delete this
        # if "title" in data:
        #     selected_job.title = data["title"]
        # if "status" in data:
        #     selected_job.status = data["status"]
        # if "company_name" in data:
        #     selected_job.company_name = data["company_name"]
        # if "application_date" in data:
        #     selected_job.application_date = data["application_date"]
        # if "comments" in data:
        #     selected_job.comments = data["comments"]
        # if "link" in data:
        #     selected_job.link = data["link"]

        # # Update only allowed fields
        # selected_job.save()


        for field in allowed_fields:
            if field in data:
                setattr(selected_job,field, data[field])
        
        selected_job.save()

        updated_job = {
            "_id": str(selected_job.id),
            "title": selected_job.title,
            "company_name": selected_job.company_name,
            "status": selected_job.status,
            "application_date": selected_job.application_date,
            "comments": selected_job.comments,
            "link": selected_job.link
        }

        return jsonify({"message": f"Successfully updated job: {job_id}", "updated_job": updated_job}), 200

    except Exception as e:
        print(f"Updating Job {e}")
        return jsonify({"error": "Failed to update job entry"}), 500

def delete_job(current_user, job_id):
    try:
        selected_job = Job.objects(user_id=current_user.id, id=job_id).first()

        if not selected_job:
            return jsonify({"message": "Job or Job ID not found",job_id:job_id}), 200
        
        selected_job.delete()

        return jsonify({"message": f"Successfully deleted job: {job_id}"}), 200


    
    except Exception as e:
        return jsonify({"error": "Failed to delete job entry"}), 500