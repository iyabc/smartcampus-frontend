import React, { ReactNode, createContext, useContext, useState } from 'react';

import { Facility } from '~/utils/types';

type FacilitiesProviderProps = {
  children: ReactNode;
};

type FacilitiesContextType = {
  facilities: Facility[] | [];
  changeFacilities: (newFacilities: Facility[] | []) => void;
};

const defaultFacilities: [] = [];

const FacilitiesContext = createContext<FacilitiesContextType>({
  facilities: defaultFacilities,
  changeFacilities: () => {},
});

export const useFacilities = () => {
  return useContext(FacilitiesContext);
};

export const FacilitiesProvider: React.FC<FacilitiesProviderProps> = ({ children }) => {
  const [facilities, setFacilities] = useState<Facility[] | []>(defaultFacilities);

  const changeFacilities = (newFacilities: Facility[] | []) => {
    setFacilities(newFacilities);
  };

  const contextValue: FacilitiesContextType = {
    facilities,
    changeFacilities,
  };

  return <FacilitiesContext.Provider value={contextValue}>{children}</FacilitiesContext.Provider>;
};
