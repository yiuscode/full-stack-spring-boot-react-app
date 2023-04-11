import { Snackbar, Alert, AlertColor } from '@mui/material';
import React, { createContext, useState } from 'react';

interface SnackbarProviderProps {
  children: JSX.Element;
}

interface SnackbarContextProps {
  displaySnackbar: (message: string, severity?: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  displaySnackbar: () => {},
});

const useSnackbar = () => React.useContext(SnackbarContext);

const SnackbarProvider: React.FC<SnackbarProviderProps> = (props: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const handleClose = () => {
    setOpen(false);
  };

  const displaySnackbar = (message: string, severity: AlertColor = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const snackbarContextValue: SnackbarContextProps = {
    displaySnackbar,
  };

  return (
    <SnackbarContext.Provider value={snackbarContextValue}>
      {props.children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { useSnackbar, SnackbarProvider };
