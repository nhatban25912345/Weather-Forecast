import useStore from "../../store/hooks";
import DayItem from "./DayItem";

interface dayDataType {
  temp: {
    min: number;
    max: number;
  };
  humidity: number;
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind_speed: number;
  wind_deg: number;
  dt: number;
}

function ListDayItem() {
  const [state] = useStore();
  const dataDailyDay: dayDataType[] = state?.weatherData?.daily;
  return (
    <div className='grid grid-cols-4 sm:grid-cols-8'>
      {dataDailyDay?.map((dataDay, key) => {
        return <DayItem data={dataDay} index={key} />;
      })}
    </div>
  );
}

export default ListDayItem;
