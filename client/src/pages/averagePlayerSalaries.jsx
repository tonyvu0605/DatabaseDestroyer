import { Helmet } from 'react-helmet-async';

import { AveragePlayerSalariesView } from 'src/sections';

// ----------------------------------------------------------------------

export default function averagePlayerSalariesByYearPage() {
    return (
        <>
            <Helmet>
                <title>Average Player Salaries By Year</title>
            </Helmet>
            <AveragePlayerSalariesView />
        </>
    );
}
