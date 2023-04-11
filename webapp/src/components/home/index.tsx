import React from 'react';
import { useAuth } from '../../context/security';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

const Home = () => {
  const { isLoggedIn } = useAuth();

  // const callAPI = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:8080/hello-world');
  //     console.log('res: ', res);
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // };

  // return (
  //   <div>
  //     <Button onClick={callAPI}>Push me</Button>
  //   </div>
  // );

  return <Navigate to={isLoggedIn ? '/app' : '/login'} />;
};

export default React.memo(Home);
