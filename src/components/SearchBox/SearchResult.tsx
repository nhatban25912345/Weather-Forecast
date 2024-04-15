// import { useContext, useState } from 'react';
// import { LocationContext } from '../../GlobalVariable/LocationProvider';
import useStore from '../../store/hooks';
import { setDay, setLocationData, setLocationName, setUnit, setWeatherData } from '../../store/action';
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_BASE_URL } from '../../const/common.const';

interface DataItem {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

interface SearchResultProps {
  data: DataItem[];
  hiddenSearchBoxDisplay: () => void;
}

function SearchResult({ data, hiddenSearchBoxDisplay }: SearchResultProps) {
  const [state, dispatch] = useStore();

  const setData = async (dataItem: DataItem) => {
    dispatch(setLocationData([dataItem?.lat, dataItem?.lon]));
    dispatch(setLocationName(`${dataItem?.name}, ${dataItem?.country}`));
    const result = await axios.get(
      `${WEATHER_BASE_URL}/data/2.5/onecall?lat=${state.location[0]}&lon=${state.location[1]
      }&exclude="hourly,minutely"&units=${state.unit}&appid=${WEATHER_API_KEY}`,
    );
    dispatch(setWeatherData(result.data));
    dispatch(setDay(0));
    dispatch(setUnit("metric"));
    hiddenSearchBoxDisplay();
  };

  return (
    <div className='w-full absolute top-[110%] left-0 bg-white rounded box-shadow-base'>
      {data.map((dataItem, index) => (
        <div
          key={index}
          className='w-full px-5 py-2 border-b hover:bg-[#2222220e] transition-all duration-300 cursor-pointer'
          onClick={() => setData(dataItem)}
        >
          {dataItem.name}{' '}
          <span className='text-base'>(CountryCode: {dataItem.country})</span>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
