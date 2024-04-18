import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <LoginView />
    </>
  );
}
