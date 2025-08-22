from flask import jsonify
import os
from normalize import rename_all

def handle_rename(request_data, secret_key):
    try:
        if not request_data or 'secret' not in request_data:
            return {
                "status": "error",
                "message": "Missing secret in request"
            }, 400
            
        user_secret = request_data.get('secret')
        if user_secret != secret_key:
            return {
                "status": "error",
                "message": "Unauthorized"
            }, 401
            
        count_renamed = rename_all()
        return {
            "status": "success",
            "count": count_renamed,
            "message": f"Successfully renamed {count_renamed} files"
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": "An error occurred while processing your request"
        }, 500
