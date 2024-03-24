import psycopg2
import pandas as pd
from datetime import datetime


class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            host="localhost",
            database="rivercast",
            user="rivercast",
            password="floodwatcher"
        )
        self.cur = self.conn.cursor()

    def get_historical_data(self, start_date: datetime, end_date: datetime):
        start_date = start_date.strftime('%Y-%m-%d')
        end_date = end_date.strftime('%Y-%m-%d')

        query = f"""
                SELECT DATE(datetime) AS day, 
                    MAX(temperature) AS temperature,
                    MAX(wind_speed) AS wind_speed,
                    MAX(rainfall) AS rainfall,
                    MAX(humidity) AS humidity,
                    MAX(wind_direction) AS wind_direction,
                    MAX(description) AS description
                FROM public."History" 
                WHERE datetime BETWEEN '{start_date}' AND '{end_date}'
                GROUP BY DATE(datetime) 
                ORDER BY DATE(datetime) ASC;
                """

        self.cur.execute(query)
        history = self.cur.fetchall()

        history = [{
            'TIMESTAMP': data[0],
            'TEMPERATURE': data[1],
            'WIND_SPEED': data[2],
            'RAINFALL': data[3],
            'HUMIDITY': data[4],
            'WIND_DIRECTION': data[5],
            'DESCRIPTION': data[6]
        } for data in history]

        return history
    

    def save_forecast_data(self, df: pd.DataFrame):
        # save nangka values
        values = []
        for station in ['NANGKA', 'STO_NINO']:
            values += [f"""
                    ('{i.strftime('%Y-%m-%d')}', {d['TEMPERATURE']}, {d['WIND_SPEED']}, {d['RAINFALL']}, {d['HUMIDITY']}, 
                    '{d['WIND_DIRECTION']}', '{d['DESCRIPTION']}', {d[f"{station}_MAX_WATERLEVEL"]}, {d[f"{station}_MIN_WATERLEVEL"]}, '{station}')
                """ 
            for i, d in df.iterrows()]

        values = ', '.join(values)  # convert to string

        # insert into database
        query = f"""
                INSERT INTO public."Forecast" (
                    datetime, temperature, wind_speed, rainfall, humidity, wind_direction, 
                    description, max_waterlevel, min_waterlevel, station) 
                VALUES {values};
                """
        
        self.cur.execute(query)
        self.conn.commit()

    def save_current_data(self, data: list[dict]):
        values = [f"""
                ('{d['TIMESTAMP'].strftime('%Y-%m-%d')}', {d['TEMPERATURE']}, {d['WIND_SPEED']}, {d['RAINFALL']}, {d['HUMIDITY']}, 
                '{d['WIND_DIRECTION']}', '{d['DESCRIPTION']}', {d['WATERLEVEL']}, '{d['STATION']}')
                    """ 
                for d in data]
        
        values = ', '.join(values)  # convert to string
        
        # insert into database
        query = f"""
                INSERT INTO public."History" (
                    datetime, temperature, wind_speed, rainfall, humidity, wind_direction, 
                    description, waterlevel, station) 
                VALUES {values};
                """
        
        self.cur.execute(query)
        self.conn.commit()

    def get_current_data(self):
        current_date = datetime.now().strftime('%Y-%m-%d')
        query = f"""
                SELECT DATE(datetime), station,
                    MAX(temperature) AS temperature,
                    MAX(wind_speed) AS wind_speed,
                    MAX(rainfall) AS rainfall,
                    MAX(humidity) AS humidity,
                    MAX(wind_direction) AS wind_direction,
                    MAX(description) AS description,
                    MAX(waterlevel) AS waterlevel
                FROM public."History"
                WHERE datetime >= '{current_date}'
                GROUP BY DATE(datetime), station
                ORDER BY DATE(datetime) ASC;
                """
        
        self.cur.execute(query)
        history = self.cur.fetchall()

        history = [{
            'TIMESTAMP': data[0],
            'STATION': data[1],
            'TEMPERATURE': data[2],
            'WIND_SPEED': data[3],
            'RAINFALL': data[4],
            'HUMIDITY': data[5],
            'WIND_DIRECTION': data[6],
            'DESCRIPTION': data[7],
            'WATERLEVEL': data[8]
        } for data in history]

        return history
    
    def get_forecast_data(self):
        current_date = datetime.now().strftime('%Y-%m-%d')
        query = f"""
                SELECT DATE(datetime), station,
                    MAX(temperature) AS temperature,
                    MAX(wind_speed) AS wind_speed,
                    MAX(rainfall) AS rainfall,
                    MAX(humidity) AS humidity,
                    MAX(wind_direction) AS wind_direction,
                    MAX(description) AS description,
                    MAX(min_waterlevel) AS min_waterlevel,
                    MAX(max_waterlevel) AS max_waterlevel
                FROM public."Forecast"
                WHERE datetime >= '{current_date}'
                GROUP BY DATE(datetime), station
                ORDER BY DATE(datetime) ASC;
                """
        self.cur.execute(query)
        forecast = self.cur.fetchall()

        forecast = [{
            'TIMESTAMP': data[0],
            'STATION': data[1],
            'TEMPERATURE': data[2],
            'WIND_SPEED': data[3],
            'RAINFALL': data[4],
            'HUMIDITY': data[5],
            'WIND_DIRECTION': data[6],
            'DESCRIPTION': data[7],
            'MIN_WATERLEVEL': data[8],
            'MAX_WATERLEVEL': data[9]
        } for data in forecast]

        return forecast
    
    def get_historical_forecast(self, year=datetime.now().year):
        start_date = datetime(year=year, month=1, day=1).strftime('%Y-%m-%d')
        end_date = datetime(year=year, month=12, day=31).strftime('%Y-%m-%d')

        query = f"""
                SELECT DATE(history.datetime), history.station,
                    MAX(history.temperature) AS temperature,
                    MAX(history.wind_speed) AS wind_speed,
                    MAX(history.rainfall) AS rainfall,
                    MAX(history.humidity) AS humidity,
                    MAX(history.wind_direction) AS wind_direction,
                    MAX(history.description) AS description,
                    MAX(history.waterlevel) AS waterlevel,
                    MAX(forecast.min_waterlevel) AS min_waterlevel,
                    MAX(forecast.max_waterlevel) AS max_waterlevel
                FROM public."History" history
                INNER JOIN public."Forecast" forecast
                ON DATE(history.datetime) = DATE(forecast.datetime)
                WHERE DATE(history.datetime) BETWEEN '{start_date}' AND '{end_date}'
                GROUP BY DATE(history.datetime), history.station
                ORDER BY DATE(history.datetime) ASC;
                """
        
        self.cur.execute(query)
        history = self.cur.fetchall()

        history = [{
            'TIMESTAMP': data[0],
            'STATION': data[1],
            'TEMPERATURE': data[2],
            'WIND_SPEED': data[3],
            'RAINFALL': data[4],
            'HUMIDITY': data[5],
            'WIND_DIRECTION': data[6],
            'DESCRIPTION': data[7],
            'WATERLEVEL': data[8],
            'MIN_WATERLEVEL': data[9],
            'MAX_WATERLEVEL': data[10]
        } for data in history]

        return history