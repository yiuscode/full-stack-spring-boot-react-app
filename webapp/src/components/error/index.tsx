import React from 'react';
import { Box, Typography } from '@mui/material';

const Error = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '80vh',
      }}
    >
      <Typography variant="h4" style={{ color: '#131313' }}>
        404
      </Typography>
      <br />
      <Typography variant="h5" style={{ color: '#131313' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
  );
};

export default React.memo(Error);
