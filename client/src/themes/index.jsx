import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { palette } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const darkMode = useSelector((state) => state.darkMode);
  const currentMode = darkMode ? 'dark' : 'light';

  const memoizedValue = useMemo(
    () => ({
      palette: { mode: currentMode, ...palette(currentMode) },
    }),
    [currentMode]
  );

  const theme = createTheme(memoizedValue);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
