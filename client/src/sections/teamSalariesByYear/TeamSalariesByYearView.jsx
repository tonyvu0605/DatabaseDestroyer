import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamSalaries } from 'reduxes/teamSalariesByYearSlice';

const TeamSalariesByYearView = () => {
  const dispatch = useDispatch();
  const { data: teamSalaries } = useSelector((state) => state.teamSalaries);

  useEffect(() => {
    dispatch(fetchTeamSalaries());
  }, [dispatch]);

  const headers = teamSalaries.length > 0 ? Object.keys(teamSalaries[0]) : [];

  return (
    <div>
      <h1>Team Salaries By Year</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teamSalaries.map((team, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={`${header}-${index}`}>{team[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamSalariesByYearView;
