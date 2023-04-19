import { Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { Container } from '../container';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/security';

export const Login: React.FC = () => {
  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    login(userName, password).then((result) => {
      if (result === true) {
        setTimeout(() => navigate('/app'), 300);
      }
    });
  };

  const handleUserNameChange = (event: React.ChangeEvent<any>) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<any>) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 7, border: 'solid 1px #BEBEBE' }}>
          <Typography variant="h6" sx={{ mb: 2 }} color="CaptionText">
            Please login to use the App
          </Typography>
          <TextField required label="User Name" sx={{ mb: 2 }} fullWidth value={userName} onChange={handleUserNameChange} />
          <TextField
            sx={{ mb: 2 }}
            label="Password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            type="password"
            autoComplete="new-password"
          />
          <Button variant="contained" fullWidth color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};
