import { useEffect } from 'react'
import { debounce } from 'lodash';
import ThemeProvider from 'themes';
import Router from 'routes/sections';

// ----------------------------------------------------------------------

export default function App() {

  // This useEffect allows for dynamic height changes and attempts
  // to fix the iOS safari height issue
  useEffect(() => {
    const setViewportHeight = debounce(() => {
      // Calculate viewport height in 1/100ths
      const vh = window.innerHeight * 0.01;
      // Set --vh custom property on the root element
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 250);

    // Initially set viewport height
    setViewportHeight();

    // Orientation Change: When the device orientation changes (which may affect
    // the viewport height significantly), update the --vh value.
    window.addEventListener('orientationchange', setViewportHeight);
    window.addEventListener('resize', setViewportHeight);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('orientationchange', setViewportHeight);
      window.addEventListener('resize', setViewportHeight);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
