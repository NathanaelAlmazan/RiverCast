"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { useSearchParams } from 'next/navigation';
import { getDataApi,  useGetDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";

import Header from "./Header";
import RiverState, { RiverChartDaumType, WeatherStateType } from "./RiverState";
import VisitorsPageViews, { ForecastActualType } from "./VisitorsPageViews";
import TemperatureCard from "./TemperatureCard";
import Report from "./Report";

export type CurrentWeather = {
    DESCRIPTION: string;
    HUMIDITY: number;
    RAINFALL: number;
    STATION: string;
    TEMPERATURE: number;
    TIMESTAMP: Date;
    WATERLEVEL: number;
    WIND_DIRECTION: string;
    WIND_SPEED: number;
}

export type ForecastWeather = {
    DESCRIPTION: string;
    HUMIDITY: number;
    RAINFALL: number;
    STATION: string;
    TEMPERATURE: number;
    TIMESTAMP: Date;
    MAX_WATERLEVEL: number;
    MIN_WATERLEVEL: number;
    WIND_DIRECTION: string;
    WIND_SPEED: number;
}

export type HistoricalWeather = {
    DESCRIPTION: string;
    HUMIDITY: number;
    RAINFALL: number;
    STATION: string;
    TEMPERATURE: number;
    TIMESTAMP: Date;
    MAX_WATERLEVEL: number;
    MIN_WATERLEVEL: number;
    WIND_DIRECTION: string;
    WATERLEVEL: number;
    WIND_SPEED: number;
}

export default function Forecast() {
    const searchParams = useSearchParams();
    const infoViewActionsContext = useInfoViewActionsContext();
    
    const [{ apiData: current, loading: currentLoader }] = useGetDataApi<CurrentWeather[]>('https://rivercast.automos.net/api/current', []);
    const [{ apiData: forecast, loading: forecastLoader }] = useGetDataApi<ForecastWeather[]>('https://rivercast.automos.net/api/forecast', []);
    const [{ apiData: history, loading: historyLoader }, { setData }] = useGetDataApi<HistoricalWeather[]>('https://rivercast.automos.net/api/history?year=2023', []);

    const [station, setStation] = useState<string>("NANGKA");
    const [currentLevel, setCurrentLevel] = useState<number>(15);
    const [temperatures, setTemperatures] = useState<ForecastWeather[]>([]);
    const [weather, setWeather] = useState<WeatherStateType[]>([]);
    const [riverlevel, setRiverlevel] = useState<RiverChartDaumType[]>([]);
    const [historical, setHistorical] = useState<ForecastActualType[]>([]);

     // Method to initialize station
    useEffect(() => {
        const query: string | null = searchParams.get('station');
        if (query) {
            setStation(query);
        }
    }, [searchParams])

    // Method to initialize weather forecast
    useEffect(() => {
        setTemperatures(forecast.filter(weather => weather.STATION === station))
    }, [forecast, station])

    // Method to initialize current weather data
    useEffect(() => {
        const stationData = current.find(data => data.STATION === station);
        if (stationData) {
            setWeather([
                {
                    id: 1,
                    amount: `${stationData.TEMPERATURE.toFixed(2)}°C`,
                    type: "Temperature",
                    icon: "/assets/images/dashboard/ic_temperature.svg"
                },
                {
                    id: 2,
                    amount: `${stationData.HUMIDITY.toFixed(2)}g/kg`,
                    type: "Humidity",
                    icon: "/assets/images/dashboard/ic_humidity.svg"
                },
                {
                    id: 3,
                    amount: `${stationData.RAINFALL.toFixed(2)}mm/hr`,
                    type: "Precipitation",
                    icon: "/assets/images/dashboard/ic_rainfall.svg"
                },
                {
                    id: 4,
                    amount: `${stationData.WIND_SPEED.toFixed(2)}m/s ${stationData.WIND_DIRECTION}`,
                    type: 'Wind Speed and Direction',
                    icon: '/assets/images/dashboard/ic_wind_speed.svg'
                }
            ]);
            
            setCurrentLevel(stationData.WATERLEVEL > 0 ? stationData.WATERLEVEL : 12.21);
        }
    }, [current, station]);

    // Method to initialize the Marikina River Level Forecast
    useEffect(() => {
        const stationData = forecast.filter(data => data.STATION === station)
                            .sort((a, b) => new Date(a.TIMESTAMP).getTime() - new Date(b.TIMESTAMP).getTime());

        setRiverlevel(stationData.map((data, idx) => ({
            name: new Date(data.TIMESTAMP).toLocaleDateString(undefined, { weekday: "short" }),
            Actual: idx === 0 && currentLevel ? currentLevel : 0,
            Forecast: data.MAX_WATERLEVEL,
            amt: data.MIN_WATERLEVEL,
        })))
    }, [forecast, station, currentLevel]);

    // Method to initialize historical Marikina River Levels
    useEffect(() => {
        const groupedForecast = history.reduce<{ [key: string]: number }>((acc, obj) => {
            const month = new Date(obj.TIMESTAMP).toLocaleDateString(undefined, { month: "short" });
            const epsilon = station === "STO_NINO" ? 3 : 0;
            if (obj.STATION === station) {
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] = Math.max(acc[month], (obj.MAX_WATERLEVEL - epsilon));
            }
            return acc;
        }, {});

        const groupedActual = history.reduce<{ [key: string]: number }>((acc, obj) => {
            const month = new Date(obj.TIMESTAMP).toLocaleDateString(undefined, { month: "short" });
            if (obj.STATION === station) {
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] = Math.max(acc[month], obj.WATERLEVEL);
            }
            return acc;
        }, {});

        setHistorical(Object.keys(groupedActual).map(key => ({
            Datetime: key,
            Actual: groupedActual[key] ? groupedActual[key] : 0,
            Forecast: groupedForecast[key] ? groupedForecast[key] : 0
        })))
    }, [history, station]);

    const handleChangeStation = (station: string) => {
        setStation(station);
    };

    const handleChangeYear = (year: number) => {
        getDataApi<HistoricalWeather[]>(`https://rivercast.automos.net/api/history?year=${year}`, infoViewActionsContext)
            .then(data => {
                setData(data);
            })
            .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
            });
    }

    return (
        <>
            {Boolean(currentLoader || forecastLoader || historyLoader) ? (
                <AppLoader />
            ) : (
                <AppAnimate animation='transition.slideUpIn' delay={200}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Stack spacing={5}>
                                <RiverState 
                                    station={station} 
                                    riverState={weather} 
                                    chartData={riverlevel} 
                                    onChangeStation={handleChangeStation}
                                />

                                <VisitorsPageViews 
                                    station={station}
                                    data={historical} 
                                    onChangeYear={handleChangeYear}
                                />

                                <Header />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <Stack spacing={5}>
                            <TemperatureCard forecasts={temperatures} />

                            <Report 
                                level={currentLevel} 
                                forecasts={temperatures} 
                            />
                        </Stack>
                        </Grid>
                    </Grid>
                </AppAnimate>
            )}
      </>
    )
}