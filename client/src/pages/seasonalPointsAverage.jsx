import { Helmet } from 'react-helmet-async';

import { SeasonalPointsAverageView } from 'src/sections';

// ----------------------------------------------------------------------

export default function seasonalPointsAveragePage() {
  return (
    <>
      <Helmet>
        <title>Seasonal Points Average</title>
      </Helmet>
      <SeasonalPointsAverageView />
    </>
  );
}
