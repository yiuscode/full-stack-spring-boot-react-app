import { AppBar, Toolbar, Typography, Button, Box, Tooltip } from '@mui/material';
import { useAuth } from '../../context/security';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';

export const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <AppBar position="static">
      <Box px={10} pt={4} pb={2}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            My Todo App
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="h5" component="div">
              {user ? `${user.name}` : ''}
            </Typography>
            <Button color="inherit" onClick={handleLoginLogout}>
              <Tooltip title={isLoggedIn ? 'Logout' : ''}>{isLoggedIn ? <Logout /> : <></>}</Tooltip>
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
