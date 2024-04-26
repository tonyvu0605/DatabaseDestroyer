import Iconify from 'components/iconify';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPlayerById } from 'reduxes/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayerSalaryInfo } from 'reduxes/PlayerSalariesSlice';

import Box from '@mui/material/Box';
import {
  Card,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Container,
  Typography,
  CardContent,
  TableContainer,
} from '@mui/material';

import './playerProfileView.scss';

const PlayerProfileView = () => {
  const dispatch = useDispatch();
  const playerId = parseInt(useLocation().pathname.split('/')[2], 10);

  const [playerData] = useSelector((state) => state.player.playerData);
  const playerSalaryInfo = useSelector((state) => state.averagePlayerSalaries.data);

  useEffect(() => {
    dispatch(fetchPlayerById(playerId));
    dispatch(fetchPlayerSalaryInfo(playerId));
  }, [dispatch, playerId]);

  if (!playerData || !playerSalaryInfo) return null;
  console.log(playerSalaryInfo);
  return (
    <Container maxWidth="lg" className="PlayerProfileView">
      <Card className="PlayerProfileView__card">
        <Box
          sx={{
            backgroundColor: 'primary.main',
          }}
          className="PlayerProfileView__cardMedia"
        >
          <Box className="PlayerProfileView__cardMedia__container">
            <Typography variant="h3" className="PlayerProfileView__cardMedia__infoText">
              {playerData.player_name}
            </Typography>
            <Typography variant="h6" className="PlayerProfileView__cardMedia__infoText">
              <Iconify icon="solar:money-bag-outline" />
              &nbsp;Avg Salary: {playerSalaryInfo[0]?.average_salary ? `$${(playerSalaryInfo[0].average_salary / 1000000).toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}m` : 'Unknown'}
            </Typography>
            <Typography variant="h6" className="PlayerProfileView__cardMedia__infoText">
              <Iconify icon="mingcute:cake-line" />
              &nbsp;DOB: {new Date(playerData.birthdate).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" className="PlayerProfileView__cardMedia__infoText">
              <Iconify icon="guidance:guest-height-limit" />
              &nbsp;Height: {Math.floor(playerData.height_inch / 12)}&apos;
              {playerData.height_inch % 12}&quot;
            </Typography>
            <Typography variant="h6" className="PlayerProfileView__cardMedia__infoText">
              <Iconify icon="material-symbols:weight-outline" />
              &nbsp;lbs: {playerData.weight_lbs}
            </Typography>
          </Box>
          <Box className="PlayerProfileView__cardMedia__container">
            <img
              src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
              alt="Player"
              className="PlayerProfileView__cardMedia__img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/nullPlayer.png';
              }}
            />
          </Box>
          <Box className="PlayerProfileView__cardMedia__container">
            <img
              src={`https://cdn.nba.com/logos/nba/${playerData.team_id}/primary/L/logo.svg`}
              alt="Team Logo"
              className="PlayerProfileView__cardMedia__teamLogo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <Typography variant="h4" className="PlayerProfileView__playerTeam">
              {playerData.team_name || 'Unavailable'}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" className="PlayerProfileView__cardTitle">
          Salary History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playerSalaryInfo.map((salaryInfo) => (
                <TableRow key={salaryInfo.year}>
                  <TableCell component="th" scope="row">
                    {salaryInfo.year}
                  </TableCell>
                  <TableCell align="right"> ${(salaryInfo.salary / 1000000).toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}m</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CardContent />
      </Card>
    </Container>
  );
};

export default PlayerProfileView;
