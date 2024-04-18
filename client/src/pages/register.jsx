import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
