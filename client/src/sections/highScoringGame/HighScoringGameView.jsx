import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHighScoringGame } from 'reduxes/highScoringGameSlice';

const SeasonalPointsAverageView = () => {
  const dispatch = useDispatch();
  const { data: highScoringGames } = useSelector((state) => state.highScoringGame);

  useEffect(() => {
    dispatch(fetchHighScoringGame());
  }, [dispatch]);

  const headers = highScoringGames.length > 0 ? Object.keys(highScoringGames[0]) : [];

  return (
    <div>
      <h1>High Scoring Game</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {highScoringGames.map((game, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={`${header}-${index}`}>{game[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeasonalPointsAverageView;
