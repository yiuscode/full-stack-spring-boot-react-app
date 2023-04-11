import React from 'react';
import { User } from '../../types';
import { Navigate } from 'react-router-dom';

interface UserContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface UserProviderProps {
  children: JSX.Element;
}

interface RequireAuthProps {
  children: JSX.Element;
}

const defaultUserContextValue = {
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

const UserContext = React.createContext<UserContextValue>(defaultUserContextValue);

const useAuth = () => React.useContext(UserContext);

const RequireAuth = (props: RequireAuthProps) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return props.children;
  }
  return <Navigate to="/login" />;
};

const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>{props.children}</UserContext.Provider>;
};

const MemorisedUserProvider = React.memo(UserProvider);

export { RequireAuth, MemorisedUserProvider as UserProvider, useAuth };
