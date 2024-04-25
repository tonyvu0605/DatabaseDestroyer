import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeasonalPointsAverage } from 'reduxes/seasonalPointsAverageSlice';

const SeasonalPointsAverageView = () => {
  const dispatch = useDispatch();
  const { data: seasonalPointsAverage } = useSelector(state => state.seasonalPointsAverage);

  useEffect(() => {
    dispatch(fetchSeasonalPointsAverage());
  }, [dispatch]);

  const headers = seasonalPointsAverage.length > 0 ? Object.keys(seasonalPointsAverage[0]) : [];

  return (
      <div>
        <h1>Seasonal Points Average</h1>
        <table>
          <thead>
          <tr>
            {headers.map(header => (
                <th key={header}>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {seasonalPointsAverage.map((average, index) => (
              <tr key={index}>
                {headers.map(header => (
                    <td key={`${header}-${index}`}>{average[header]}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default SeasonalPointsAverageView;


