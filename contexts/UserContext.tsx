import React, { ReactNode, createContext, useContext, useState } from 'react';

import { UserFull } from '~/utils/types';

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  user: UserFull | undefined;
  changeUser: (newUser: UserFull | undefined) => void;
};

const defaultUser = undefined;

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  changeUser: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserFull | undefined>(defaultUser);

  const changeUser = (newUser: UserFull | undefined) => {
    setUser(newUser);
  };

  const contextValue: UserContextType = {
    user,
    changeUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
