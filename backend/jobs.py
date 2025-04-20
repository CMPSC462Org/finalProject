from flask import Blueprint, request, jsonify
from jobsdb import jobs_table
import uuid

jobs_bp = Blueprint('jobs', __name__)
""" This would fail if table doesn't exist — for now, mock it or comment item = {
        'id': job_id,
        'title': data['title'],
        'company': data['company'],
        'status': data['status'],
        'application_date': data['application_date'],
        'user_id': data.get('user_id', 'abc123')  # Replace with actual user ID
    }

    jobs_table.put_item(Item=item)  # Uncomment once table exists 
"""
@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
    return jsonify([
        {
            "id": "job123",
            "title": "Software Engineer Intern",
            "company": "Google",
            "status": "Interviewed",
            "application_date": "2022-01-25",
            "comments": []
        }
    ])

@jobs_bp.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    job_id = str(uuid.uuid4())
    return jsonify({
        "message": "Job created successfully",
        "job": data | {"id": "job123", "user_id": "abc123"}
    })

@jobs_bp.route('/jobs/<job_id>', methods=['PUT'])
def update_job(job_id):
    data = request.get_json()
    return jsonify({
        "message": "Job updated successfully",
    """update_expr = "SET " + ", ".join(f"#{k}=:{k}" for k in data)
    attr_names = {f"#{k}": k for k in data}
    attr_vals = {f":{k}": v for k, v in data.items()}

    try:
        response = jobs_table.update_item(
            Key={"id": job_id},
            UpdateExpression=update_expr,
            ExpressionAttributeNames=attr_names,
            ExpressionAttributeValues=attr_vals,
            ReturnValues="ALL_NEW"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({
        "message": "Job updated successfully",
        "job": response.get("Attributes")
    })
    """
        "job": {"id": job_id, "status": data.get("status")}
    })

@jobs_bp.route('/jobs/<job_id>', methods=['DELETE'])
def delete_job(job_id):
    # jobs_table.delete_item(Key={"id": job_id})
    return jsonify({"message": "Job deleted successfully"})
