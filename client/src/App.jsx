import ThemeProvider from 'themes';
import Router from 'routes/sections';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
