"""Mongo Client for project"""
import os
import pymongo
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)

# mongo_client = pymongo.MongoClient(MONGO_URL, 27017)
mongo_client = pymongo.MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
    authSource="admin",
)

# mongo_client = pymongo.MongoClient(
#     f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_URL}/test?authSource=admin"
# )


def insert_test_document():
    """Inserts sample document to the test_collection in the test db"""
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one(
        {"name": "Mojtaba Mahamed", "student": True}
    ).inserted_id
    print(res)
