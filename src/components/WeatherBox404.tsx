import errorIcon from '../../public/404-icon.svg';

function WeatherBox404() {
  return (
    <div className='w-full min-h-[300px] overflow-hidden flex flex-col items-center justify-center box-shadow-base'>
      <img className='mb-7' src={errorIcon} />
      <div className='text-center'>
        We could not find weather information for the location above
      </div>
    </div>
  );
}

export default WeatherBox404;
