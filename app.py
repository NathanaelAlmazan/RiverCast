from flask import Flask, jsonify, request
from flask_apscheduler import APScheduler
from server.controller.db import Database
from server.routines import get_current_weather, generate_forecast


app = Flask(__name__)

scheduler = APScheduler()

######################## API ROUTES ############################
@app.route("/current", methods=['GET'])
def current_weather():
    db = Database()
    history = db.get_current_data()

    return jsonify(history), 200

@app.route("/forecast", methods=['GET'])
def forecast_weather():
    db = Database()
    forecast = db.get_forecast_data()

    return jsonify(forecast), 200

@app.route("/history", methods=['GET'])
def historical_weather():
    args = request.args
    year = args.get('year', default=None, type=int)

    db = Database()
    history = db.get_historical_forecast(year)

    return jsonify(history), 200

######################## ROUTINES ############################
@scheduler.task('interval', id='update_database', seconds=3600, misfire_grace_time=900)
def update_database():
    try:
        get_current_weather()  # update historical database
        generate_forecast()  # update forecast database
    except Exception as e:
        print("Failed to update database:", e)
    

if __name__ == "__main__":
    scheduler.init_app(app)

    scheduler.start()

    app.run(host="0.0.0.0", port=8000, debug=True)