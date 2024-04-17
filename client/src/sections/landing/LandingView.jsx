import React, { useEffect } from 'react';
import { fetch10Players } from 'reduxes/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import './landingView.scss';

const LandingView = () => {
  const dispatch = useDispatch();

  const playerData = useSelector((state) => state.player.playerData);

  useEffect(() => {
    dispatch(fetch10Players());
  }, [dispatch]);

  return (
    <div className="Landing">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Height (inches)</TableCell>
              <TableCell>Weight (lbs)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerData.map((player) => (
              <TableRow key={player.player_id}>
                <TableCell>{player.player_name}</TableCell>
                <TableCell>{new Date(player.birthdate).toLocaleDateString()}</TableCell>
                <TableCell>{player.school}</TableCell>
                <TableCell>{player.height_inch}</TableCell>
                <TableCell>{player.weight_lbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LandingView;