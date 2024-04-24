import { Helmet } from 'react-helmet-async';

import { TeamPerformanceView } from 'src/sections';

// ----------------------------------------------------------------------

export default function TeamPerformancePage() {
    return (
        <>
            <Helmet>
                <title>Team Performance</title>
            </Helmet>
            <TeamPerformanceView />
        </>
    );
}
