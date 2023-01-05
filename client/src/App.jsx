import { useMemo } from 'react';
// import reactLogo from './assets/react.svg'
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { themeSettings } from './theme';

import UserRouts from './routs/UserRouts';
import AdminRouts from './routs/AdminRouts';
import ErrRouts from './routs/ErrRouts';

function App() {
  const mode = useSelector((state) => state.mode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserRouts />
          <AdminRouts />
          <ErrRouts />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
