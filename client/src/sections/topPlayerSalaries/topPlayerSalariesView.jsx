import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopPlayerSalaries } from 'reduxes/topPlayerSalariesSlice';

import './topPlayerSalariesView.scss'; 

const TopPlayerSalariesView = () => {
  const dispatch = useDispatch();
  const { data: salaries } = useSelector(state => state.topPlayerSalaries);

  useEffect(() => {
    dispatch(fetchTopPlayerSalaries());
  }, [dispatch]);

  const headers = salaries.length > 0 ? Object.keys(salaries[0]) : [];

  return (
    <div className="TopPlayerSalariesView">  
      <h1>Top Player Salaries</h1>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th> 
            ))}
          </tr>
        </thead>
        <tbody>
          {salaries.map((player, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={`${header}-${index}`}>{player[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPlayerSalariesView;
