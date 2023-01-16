"""Main Flask App Module"""
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import requests
from mongo_client import mongo_client
import json
from bson import json_util

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", "True"))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    """View Function for getting a random image"""
    word = request.args.get("query")

    headers = {"Authorization": f"Client-ID {UNSPLASH_KEY}", "Accept-Version": "v1"}
    params = {"query": word}
    response = requests.get(
        url=UNSPLASH_URL, headers=headers, params=params, timeout=30
    )
    # response.text
    print(response)
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    """View function for getting and posting images from database"""
    if request.method == "GET":
        # Read images from the database
        images_from_db = images_collection.find({})
        # we want to return an array of images

        # res = json.loads(
        #     json_util.dumps(images_from_db, json_options=json_util.DEFAULT_JSON_OPTIONS)
        # )
        # print(type(res)) #list
        # return res

        return jsonify([img for img in images_from_db])
    if request.method == "POST":
        # save image in the database
        image = request.get_json()

        # HERE WE RELY ON UNSPLASH ID
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
