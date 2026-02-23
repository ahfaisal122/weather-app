from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static")
CORS(app)

API_KEY = os.getenv("WEATHER_API_KEY")

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)

@app.route("/weather/<city>")
def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if data.get("cod") != 200:
        return jsonify({"error": "City not found"}), 404

    result = {
    "city": data["name"],
    "country": data["sys"]["country"],
    "temperature": data["main"]["temp"],
    "condition": data["weather"][0]["description"],
    "humidity": data["main"]["humidity"],
    "icon": data["weather"][0]["icon"],
    "timezone": data["timezone"]
}

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)