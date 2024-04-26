import { Helmet } from 'react-helmet-async';

import { TopPlayerSalariesView } from 'src/sections';

// ----------------------------------------------------------------------

export default function TopPlayerSalariesPage() {
  return (
    <>
      <Helmet>
        <title>Top Player Salaries</title>
      </Helmet>
        <TopPlayerSalariesView/>
    </>
  );
}
