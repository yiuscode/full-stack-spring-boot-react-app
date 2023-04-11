import './App.css';
import { AppRouter } from './components/router';
import { UserProvider } from './context/security';
import { SnackbarProvider } from './context/snakebar';

function App() {
  return (
    <SnackbarProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;
