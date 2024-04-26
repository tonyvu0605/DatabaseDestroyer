import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopPlayerSalaries } from 'reduxes/topPlayerSalariesSlice';

import {
  Avatar,
  TableRow,
  TableCell } from "@mui/material";

import './topPlayerSalariesView.scss';

const TopPlayerSalariesView = () => {
  const dispatch = useDispatch();
  const { data: salaries } = useSelector((state) => state.topPlayerSalaries);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTopPlayerSalaries());
  }, [dispatch]);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const headers = salaries.length > 0 ? Object.keys(salaries[0]) : [];

  return (
    <div className="TopPlayerSalariesView">
      <h1>Top Player Salaries</h1>
      <table>
        <thead>
        <tr>
          <th key={headers.at(1)}>{headers.at(1)}</th>
          <th key={headers.at(2)}>{headers.at(2)}</th>
        </tr>
        </thead>
        <tbody>
          {salaries.map((player) => (
              <TableRow
                  key={player.player_id}
                  onClick={() => navigate(`/player/${player.player_id}`)}
                  sx={{ cursor: 'pointer' }}
              >
                <TableCell
                    className="TopPlayerSalariesView__tableCell"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Avatar
                      src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.player_id}.png`}
                      alt={player.player_name}
                      className="TopPlayerSalariesView__tableCell"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/nullPlayer.png';
                      }}
                  >
                    <Avatar {...stringAvatar(`${player.player_name}`)} />
                  </Avatar>
                  {player.player_name}
                </TableCell>
                <TableCell className="TopPlayerSalariesView__tableCell">{player.average_salary}</TableCell>
              </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPlayerSalariesView;
