import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAveragePlayerSalaries } from 'reduxes/averagePlayerSalariesSlice';

const AveragePlayerSalariesView = () => {
  const dispatch = useDispatch();
  const { data: players } = useSelector((state) => state.averagePlayerSalaries);

  useEffect(() => {
    dispatch(fetchAveragePlayerSalaries());
  }, [dispatch]);

  const headers = players.length > 0 ? Object.keys(players[0]) : [];

  return (
    <div>
      <h1>Average Player Salaries By Year</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={`${header}-${index}`}>{player[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AveragePlayerSalariesView;
