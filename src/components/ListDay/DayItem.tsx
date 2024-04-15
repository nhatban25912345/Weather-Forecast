import icon from "../../../public/logo-site.png";
import { setDay } from "../../store/action";
import useStore from "../../store/hooks";
// bg-[#F7F7F7]

interface DayDataType {
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

function DayItem({ data, index }: { data: DayDataType, index: number }) {

  const [state, dispatch] = useStore();

  const getWeekDay = (time: number) => {
    const date = new Date(time * 1000);
    const options: object = {
      weekday: "short",
      hour: "2-digit",
      hour12: true,
    };
    const fullDate = date.toLocaleDateString("en-US", options);
    const fullDateInfo = fullDate.replace(",", "").split(" ");

    return `${fullDateInfo[0]}`;
  };

  const roundTemp = (temp: number) => {
    return Math.round(temp)
  }

  const setDayDisplay = () => {
    dispatch(setDay(index));
  }

  return (
    <div className={`w-full min-h-[146px] flex flex-col items-center pt-5 pb-4 border border-[#969696] transition-all duration-300 ${state.day === index ? "bg-[#ecebeb]" : ""}`} onClick={setDayDisplay}>
      <div className='text-sm font-bold'>{getWeekDay(data.dt)}</div>
      <div className='w-12 aspect-square flex justify-center items-center'>
        <img
          src={
            `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png` ||
            icon
          }
        />
      </div>
      <div className='text-lg font-bold'>{roundTemp(data.temp.max)}°</div>
      <div className=''>{roundTemp(data.temp.min)}°</div>
    </div>
  );
}

export default DayItem;
