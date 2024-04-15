import WeatherDetail from "./WeatherDetail";
import ListDayItem from "./ListDay/ListDayItem";

function WeatherBox() {

  return (
    <div className='w-full min-h-[300px] overflow-hidden box-shadow-base'>
      <WeatherDetail />
      <ListDayItem />
    </div>
  );
}

export default WeatherBox;
