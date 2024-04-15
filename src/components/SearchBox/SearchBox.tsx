import { useRef, useState } from "react";
import axios from "axios";
import closeIcon from "../../../public/close-icon.svg";
import SearchResult from "./SearchResult";
import { WEATHER_BASE_URL } from "../../const/common.const";
import { WEATHER_API_KEY } from "../../const/common.const";
import {
  setDay,
  setLocationData,
  setLocationName,
  setUnit,
  setWeatherData,
} from "../../store/action";
import useStore from "../../store/hooks";

interface DataItem {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

function SearchBox() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchBoxDisplay, setSearchBoxDisplay] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<DataItem[]>([]);

  const [state, dispatch] = useStore();

  const ref = useRef<HTMLInputElement>(null);

  const handleClearInputText = () => {
    ref.current?.focus();
    setSearchValue("");
  };

  // handle event when press enter key
  const handlerEnterEvent = async () => {
    setSearchBoxDisplay(false);
    if (searchValue) {
      const dataLocation = searchLocation(searchValue, 1);
      dataLocation.then(async (res: DataItem[]) => {
        if (res.length === 1) {
          const data = res[0];
          console.log([data.lat, data.lon]);
          setSearchData(res);
          dispatch(setLocationData([data.lat, data.lon]));
          dispatch(setLocationName(`${data.name}, ${data.country}`));
          const result = await axios.get(
            `${WEATHER_BASE_URL}/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=${"hourly,minutely"}&units=${state.unit}&appid=${WEATHER_API_KEY}`,
          );
          console.log(result.data);
          dispatch(setWeatherData(result.data));
          dispatch(setDay(0));
          dispatch(setUnit("metric"));
        }
      });
    } else {
      dispatch(setWeatherData(null));
    }
  };

  // handle event when input text
  const handleInputText = (searchValue: string) => {
    setSearchValue(searchValue);
    setSearchBoxDisplay(true);
    if (searchValue) {
      const result = searchLocation(searchValue, 5);
      result.then((res: DataItem[]) => {
        setSearchData(res);
      });
    } else {
      setSearchData([]);
    }
  };

  const searchLocation = async (searchLocation: string, limit: number) => {
    try {
      const response = await axios.get(
        `${WEATHER_BASE_URL}/geo/1.0/direct?limit=${limit}&q=${searchLocation}&appid=${WEATHER_API_KEY}`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='w-full relative mb-3 pl-5 pr-10 py-[10px] text-lg border rounded box-shadow-base'>
      <input
        className='w-full'
        type='text'
        placeholder='Input the location/city (e.g. Hanoi, Ho Chi Minh, ...)'
        value={searchValue}
        onChange={(e) => handleInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handlerEnterEvent();
        }}
        ref={ref}
      />
      {searchValue ? (
        <img
          className='w-4 h-4 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-100'
          src={closeIcon}
          alt='close-icon'
          onClick={handleClearInputText}
        />
      ) : null}
      {searchValue && searchBoxDisplay ? (
        <SearchResult
          data={searchData}
          hiddenSearchBoxDisplay={() => setSearchBoxDisplay(false)}
        />
      ) : null}
    </div>
  );
}
export default SearchBox;
