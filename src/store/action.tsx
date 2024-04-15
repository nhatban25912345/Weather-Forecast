import {SET_WEATHER_DATA, SET_LOCATION_DATA, SET_LOCATION_NAME, SET_UNIT, SET_DAY} from "./constants";


interface CurrentDataType {
    temp: number;
    humidity: number;
    weather: {
      description: string;
      icon: string;
    }[];
    wind_speed: number;
    wind_deg: number;
    dt: number;
  }
  
  interface WeatherDataType {
    current: CurrentDataType;
    daily: CurrentDataType[];
  }

export const setWeatherData = (payload: WeatherDataType | null) => ({
    type: SET_WEATHER_DATA,
    payload
})

export const setLocationData = (payload: number[]) => ({
    type: SET_LOCATION_DATA,
    payload
})

export const setLocationName = (payload: string) => ({
    type: SET_LOCATION_NAME,
    payload
})

export const setUnit = (payload: string) => ({
    type: SET_UNIT,
    payload
})

export const setDay = (payload: number) => ({
    type: SET_DAY,
    payload
})