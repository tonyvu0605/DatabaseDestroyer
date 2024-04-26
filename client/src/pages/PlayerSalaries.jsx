import { Helmet } from 'react-helmet-async';

import { PlayerSalariesView } from 'src/sections';

// ----------------------------------------------------------------------

export default function PlayerSalariesByYearPage() {
  return (
    <>
      <Helmet>
        <title>Player Salaries By Year</title>
      </Helmet>
      <PlayerSalariesView />
    </>
  );
}
