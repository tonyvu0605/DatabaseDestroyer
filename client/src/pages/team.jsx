import { Helmet } from 'react-helmet-async';

import { TeamView } from 'src/sections';

// ----------------------------------------------------------------------

export default function TeamPage() {
  return (
    <>
      <Helmet>
        <title> Team </title>
      </Helmet>

      <TeamView />
    </>
  );
}
