import numpy as np
import pandas as pd
from datetime import datetime, timedelta

# modules
from server.controller.db import Database
from server.controller.api import WeatherApi
from server.models.rf import RandomForest
from server.models.gpt import RiverCast


"""
    Method to hourly generate Marikina River Level
    Forecast at Barangay Nangka and Sto. Nino
"""
def generate_forecast():
    # get weather history
    start_date, end_date = datetime.now() - timedelta(days=30), datetime.now() - timedelta(days=1)
    
    db = Database()
    history = db.get_historical_data(start_date, end_date)

    # fetch weather forecast
    api = WeatherApi()
    forecast = api.get_forecast_data()

    # combine forecast and historical data
    data = history + forecast
    data = pd.DataFrame(data)

    # assign timestamps as the dataframe index
    data.index = pd.to_datetime(data["TIMESTAMP"], format='ISO8601')
    data = data.drop(columns=['TIMESTAMP'])
    
    # add day of year as variable
    data['DAY_OF_YEAR'] = data.index.dayofyear

    inputs = data[['RAINFALL', 'HUMIDITY', 'TEMPERATURE', 'WIND_SPEED', 'DAY_OF_YEAR']].values

    # generate random forest forecast
    rf = RandomForest()
    rf_pred = rf.predict(inputs)

    # generate rivercast forecast
    gpt = RiverCast()
    gpt_pred = gpt.predict(inputs)
    
    # ensable forecast
    max_pred = np.max((rf_pred, gpt_pred), axis=0)
    min_pred = np.min((rf_pred, gpt_pred), axis=0)

    # save forecast to database
    data = data.iloc[-7:]
    data['NANGKA_MAX_WATERLEVEL'] = max_pred[:, 0]
    data['NANGKA_MIN_WATERLEVEL'] = min_pred[:, 0]
    data['STO_NINO_MAX_WATERLEVEL'] = max_pred[:, 1]
    data['STO_NINO_MIN_WATERLEVEL'] = min_pred[:, 1]

    db.save_forecast_data(data)


"""
    Method to hourly get current weather 
    and Marikina River Level 
"""
def get_current_weather():
    # fetch weather data
    api = WeatherApi()
    weather = api.get_current_weather()

    # save weather data to database
    db = Database()
    db.save_current_data(weather)
