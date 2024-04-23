import { Helmet } from 'react-helmet-async';

import { PlayerView } from 'src/sections';

// ----------------------------------------------------------------------

export default function PlayerPage() {
  return (
    <>
      <Helmet>
        <title> Player </title>
      </Helmet>

      <PlayerView />
    </>
  );
}
