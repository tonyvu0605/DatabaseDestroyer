import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamPerformance } from "reduxes/teamPerformanceSlice";

const TeamPerformanceView = () => {
  const dispatch = useDispatch();
  const { data: teamPerformances } = useSelector(state => state.teamPerformance);

  useEffect(() => {
    dispatch(fetchTeamPerformance());
  }, [dispatch]);

  const headers = teamPerformances.length > 0 ? Object.keys(teamPerformances[0]) : [];

  return (
      <div>
        <h1>Team Performance</h1>
        <table>
          <thead>
          <tr>
            {headers.map(header => (
                <th key={header}>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {teamPerformances.map((team, index) => (
              <tr key={index}>
                {headers.map(header => (
                    <td key={`${header}-${index}`}>{team[header]}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default TeamPerformanceView;


