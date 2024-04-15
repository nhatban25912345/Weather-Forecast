import { useEffect, useState } from "react";
import { WEATHER_API_KEY, WEATHER_BASE_URL } from "../const/common.const";
import axios from "axios";
import icon from "../../public/logo-site.png";
import useStore from "../store/hooks";
import { setWeatherData } from "../store/action";

interface DataType {
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

function WeatherDetail() {
  const [state, dispatch] = useStore();

  let data: DataType;
  let temp: number;

  if (state.day === 0) {
    data = state.weatherData.current;
    temp = data.temp;
  } else {
    data = state.weatherData.daily[state.day];
    temp = state.weatherData.daily[state.day].temp.max;
  }

  const [fillDegreeType, setfillDegreeType] = useState<boolean>(true);
  const [airQualityData, setAirQualityData] = useState<number>(3);

  const getAirQualityData = async (location: (number | string)[]) => {
    try {
      const response = await axios.get(
        `${WEATHER_BASE_URL}//data/2.5/air_pollution?lat=${
          location[0] || 0
        }&lon=${location[1] || 0}&appid=${WEATHER_API_KEY}`,
      );
      setAirQualityData(response.data.list[0]?.main?.aqi);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAirQualityData(state.location);
  });

  const setWeatherNewData = async (unit: string) => {
    console.log(state.location);
    
    const result = await axios.get(
      `${WEATHER_BASE_URL}/data/2.5/onecall?lat=${state.location[0]}&lon=${state.location[1]}&exclude="hourly,minutely"&units=${unit}&appid=${WEATHER_API_KEY}`,
    );
    console.log(result);
    
    dispatch(setWeatherData(result.data));
  };

  const fillDegreeC = () => {
    setWeatherNewData("metric");
    setfillDegreeType(true);
  };

  const fillDegreeF = () => {
    setWeatherNewData("imperial");
    setfillDegreeType(false);
  };

  const getTime = () => {
    const unixTimestamp = data.dt || 0;
    const date = new Date(unixTimestamp * 1000);
    const options: object = {
      weekday: "long",
      hour: "2-digit",
      hour12: true,
    };
    const fullDate = date.toLocaleDateString("en-US", options);
    const fullDateInfo = fullDate.replace(",", "").split(" ");

    if (state.day === 0) {
      return `${fullDateInfo[0]} ${Number(fullDateInfo[1])}${fullDateInfo[2]}`;
    } else {
      return `${fullDateInfo[0]}`;
    }
  };

  function degToCompass(deg: number) {
    const val = Math.floor(deg / 22.5 + 0.5);
    const compassDirections = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
      "N",
    ];
    return compassDirections[val % 16];
  }

  function handleWindSpeed(data: number) {
    const unit = state.unit;
    switch (unit) {
      case "metric":
        return `${Math.round(data * 3.6 * 100) / 100} KPH`;
      case "imperial":
        return `${data} MPH`;
      default:
        break;
    }
  }

  function toTitleCase(str: string = "cloud") {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function handleAirQualityData(airQualityData: number) {
    switch (airQualityData) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Moderate";
    }
  }

  return (
    <div className='w-full p-5'>
      <h2 className='font-bold text-xl text-[#333333]'>{state.locationName}</h2>
      <div className='text-[#666666] text-sm mb-3'>
        {getTime()} • {toTitleCase(data.weather[0]?.description)}
      </div>
      <div className='flex flex-col sm:flex-row'>
        <div className='w-full sm:w-1/2'>
          <div className='flex'>
            <img
              className='w-16 h-16 object-contain mr-1'
              src={
                `https://openweathermap.org/img/wn/${data.weather[0]?.icon}.png` ||
                icon
              }
              alt='icon'
            />
            <span className='font-bold text-[44px] mr-2'>
              {Math.round(temp)}°
            </span>
            <span className='mt-2 font-bold'>
              <span
                className={`cursor-pointer ${
                  fillDegreeType ? "text-[#888888]" : "text-[#222222] underline"
                }`}
                onClick={fillDegreeF}
              >
                F
              </span>{" "}
              /{" "}
              <span
                className={`cursor-pointer ${
                  fillDegreeType ? "text-[#222222] underline" : "text-[#888888]"
                }`}
                onClick={fillDegreeC}
              >
                C
              </span>
            </span>
          </div>
        </div>
        <div className='w-full sm:w-1/2 text-[#222222] text-sm mt-4 sm:mt-0'>
          <div className=''>{`Humidity: ${data.humidity}%`}</div>
          <div className=''>{`Wind: ${handleWindSpeed(
            data.wind_speed,
          )} ${degToCompass(data.wind_deg)}`}</div>
          {state.day === 0 ? (
            <div className=''>{`Air Quality: ${handleAirQualityData(
              airQualityData,
            )}`}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
