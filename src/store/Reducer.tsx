import {
  SET_DAY,
  SET_LOCATION_DATA,
  SET_LOCATION_NAME,
  SET_UNIT,
  SET_WEATHER_DATA,
} from "./constants";

export interface InitStateType {
  weatherData: WeatherDataType | null;
  location: number[];
  locationName: string;
  unit: string;
  day: number;
}

export interface ActionType {
  type: string;
  payload: string;
}

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

export const initState: InitStateType = {
  weatherData: null,
  location: [],
  locationName: "",
  unit: "metric",
  day: 0,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: InitStateType | any, action: ActionType) {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return { ...state, weatherData: action.payload };
    case SET_LOCATION_DATA:
      return { ...state, location: action.payload };
    case SET_UNIT:
      return { ...state, unit: action.payload };
    case SET_LOCATION_NAME:
      return { ...state, locationName: action.payload };
    case SET_DAY:
      return { ...state, day: action.payload };
    default:
      return new Error("Invalid action.");
  }
}

export default reducer;
