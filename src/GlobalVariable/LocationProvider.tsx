import { useState, createContext, ReactNode } from 'react';

type LocationType = [number, number, string];
interface GlobalContext {
  dataStatus: boolean,
  unit: string,
  location: LocationType;
  handleLocation: (location: LocationType) => void;
  handleUnit: (unit: string) => void;
  handleDataStatus: (status: boolean) => void;
}

const LocationContext = createContext<GlobalContext | undefined>(undefined);

function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationType>([0,0,""]);
  const [unit, setUnit] = useState<string>("metric");
  const [dataStatus, setDataStatus] = useState<boolean>(false);

  const handleLocation = (location: LocationType) => {
    setLocation(location);
  };
  const handleUnit = (unit: string) => {
    setUnit(unit);
  };
  const handleDataStatus = (status: boolean) => {
    setDataStatus(status);
  };

  const value: GlobalContext = {
    dataStatus,
    unit,
    location,
    handleLocation,
    handleUnit,
    handleDataStatus,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export { LocationContext, LocationProvider };
