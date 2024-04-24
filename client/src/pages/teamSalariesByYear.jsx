import { Helmet } from 'react-helmet-async';

import { TeamSalariesByYearView } from 'src/sections';

// ----------------------------------------------------------------------

export default function teamSalariesByYearPage() {
    return (
        <>
            <Helmet>
                <title>Top Player Salaries</title>
            </Helmet>
            <TeamSalariesByYearView />
        </>
    );
}
