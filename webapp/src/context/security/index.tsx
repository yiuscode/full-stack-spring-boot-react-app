import React from 'react';
import { User } from '../../types';
import { Navigate } from 'react-router-dom';
import { useSnackbar } from '../snakebar';
import axios from 'axios';
import { SERVER_END_POINT } from '../../constant';

interface UserContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
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
  login: async (): Promise<boolean> => false,
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
  const { displaySnackbar } = useSnackbar();

  const login = async (username: string, password: string) => {
    const config = {
      auth: {
        username: `user`,
        password: `1234`,
      },
    };
    try {
      const response = await axios.post(`${SERVER_END_POINT}/login`, { username, password });
      setUser(response.data);
      console.log('response.data: ', response.data);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      displaySnackbar('Error logging in ' + (error as any).message, 'error');
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>{props.children}</UserContext.Provider>;
};

const MemorisedUserProvider = React.memo(UserProvider);

export { RequireAuth, MemorisedUserProvider as UserProvider, useAuth };
