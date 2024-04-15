import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import WeatherBox from "./components/WeatherBox";
import WeatherBox404 from "./components/WeatherBox404";
// import WeatherBox404 from "./components/WeatherBox404";
import useStore from "./store/hooks";

function App() {
  const [state] = useStore();

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-full sm:w-[590px] mx-3 sm:mx-auto'>
        <SearchBox />
        {state.weatherData !== null ? <WeatherBox /> : <WeatherBox404 />}
      </div>  
    </div>
  );
}

export default App;
