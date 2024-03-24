import os
import requests
from datetime import datetime
from dotenv import load_dotenv
from metpy.calc import specific_humidity_from_dewpoint
from metpy.units import units

load_dotenv()

class WeatherApi:
    def __init__(self):
        self.lat = "14.666814983804455"
        self.lon = "121.09985990637664"
        self.key = os.getenv("WEATHERBIT_KEY")
        self.date = datetime.now()
        self.date = datetime(self.date.year, self.date.month, self.date.day, self.date.hour).strftime('%Y%m%d%H%M')
        self.waterlevel_url = f"http://121.58.193.173:8080/water/map_list.do?ymdhm={self.date}"
        self.weather_url = f"https://api.weatherbit.io/v2.0/current?key={self.key}&lon={self.lon}&lat={self.lat}"
        self.forecast_url = f"https://api.weatherbit.io/v2.0/forecast/daily?key={self.key}&lon={self.lon}&lat={self.lat}&days=7"

    def _calculate_specific_humidity(self, pressure, dew_point):
        humidity = specific_humidity_from_dewpoint(pressure * units.hPa, dew_point * units.degC).to('g/kg')
        humidity = float(str(humidity).replace(" gram / kilogram", ""))
        return humidity
    
    def get_forecast_data(self):
        # fetch forecast
        response = requests.get(self.forecast_url)
        response = response.json()

        forecasts = [{
            'TIMESTAMP': datetime.strptime(data['datetime'], "%Y-%m-%d"),
            'TEMPERATURE': data['temp'],
            'WIND_SPEED': data['wind_spd'],
            'RAINFALL': data['precip'],
            'WIND_DIRECTION': data['wind_cdir_full'],
            'HUMIDITY': self._calculate_specific_humidity(pressure=data['pres'], dew_point=data['dewpt']),
            'DESCRIPTION': data['weather']['description']
        } for data in response['data']]

        return forecasts
    
    def get_current_weather(self):
        # fetch current weather
        response = requests.get(self.weather_url)
        response = response.json()
        response = response['data'][0]

        weather = {
            'TIMESTAMP': datetime.strptime(response['ob_time'], "%Y-%m-%d %H:%M"),
            'TEMPERATURE': response['temp'],
            'WIND_SPEED': response['wind_spd'],
            'RAINFALL': response['precip'],
            'WIND_DIRECTION': response['wind_cdir_full'],
            'HUMIDITY': self._calculate_specific_humidity(pressure=response['pres'], dew_point=response['dewpt']),
            'DESCRIPTION': response['weather']['description']
        }

        response = requests.get(self.waterlevel_url)
        response = response.json()

        # get nangka and sto nino waterlevel data
        stations = ['Nangka', 'Sto Nino', 'Tumana Bridge']

        waterlevel = [{
            'WATERLEVEL': float(data['wl'].replace('(*)', '')) if data['wl'] else 0.0,
            'STATION': data['obsnm'].upper().replace(' ', '_'),
            **weather
        } for data in response if data['obsnm'] in stations]

        return waterlevel


