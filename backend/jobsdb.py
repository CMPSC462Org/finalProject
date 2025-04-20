import boto3
import uuid

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
jobs_table = dynamodb.Table('Jobs')