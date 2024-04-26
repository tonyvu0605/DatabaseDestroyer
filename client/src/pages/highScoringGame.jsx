import { Helmet } from 'react-helmet-async';

import { HighScoringGameView } from 'src/sections';

// ----------------------------------------------------------------------

export default function HighScoringGamePage() {
  return (
    <>
      <Helmet>
        <title>High Scoring Game</title>
      </Helmet>
      <HighScoringGameView />
    </>
  );
}
