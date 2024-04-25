import { Helmet } from 'react-helmet-async';

import { LandingView } from 'src/sections';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title> NBA Basketball Encyclopedia </title>
      </Helmet>

      <LandingView />
    </>
  );
}
