import { Helmet } from 'react-helmet-async';

import { PlayerProfileView } from 'src/sections';

// ----------------------------------------------------------------------

export default function PlayerPage() {
  return (
    <>
      <Helmet>
        <title> Player </title>
      </Helmet>

      <PlayerProfileView />
    </>
  );
}
