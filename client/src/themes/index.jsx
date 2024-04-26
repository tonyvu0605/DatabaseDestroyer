import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import palette from './palette';
import overrides from './overrides';
import { typography } from './typography';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const darkMode = useSelector((state) => state.darkMode);
  const currentMode = darkMode ? 'dark' : 'light';

  const memoizedValue = useMemo(
    () => ({
      palette: { mode: currentMode, ...palette(currentMode) },
      typography,
    }),
    [currentMode]
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

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
