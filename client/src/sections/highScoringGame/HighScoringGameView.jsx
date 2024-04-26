import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHighScoringGame } from 'reduxes/highScoringGameSlice';

import {
  Card,
  Table,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container, Typography, TableContainer,
} from '@mui/material';

import './highScoringGameView.scss';

const headCells = [
  { id: 'home_team_name', label: 'Home Team' },
  { id: 'away_team_name', label: 'Away Team' },
  { id: 'pts_home', label: 'Home Team Pts' },
  { id: 'pts_away', label: 'Away Team Pts' },
  { id: 'total_points', label: 'Pts Total' },
];

const HighScoringGameView = () => {
  const dispatch = useDispatch();
  const { data: highScoringGames } = useSelector((state) => state.highScoringGame);

  useEffect(() => {
    dispatch(fetchHighScoringGame());
  }, [dispatch]);

  return (
    <div className="HighScoringGameView">
      <Container maxWidth="lg">
        <Card className="HighScoringGameView__card">
          <Typography className="HighScoringGameView__title"  variant="h4">High Scoring Game</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {highScoringGames.length > 0 ? (
                  highScoringGames.map((game, index) => (
                    <TableRow key={index}>
                      <TableCell className="HighScoringGameView__tableCell">
                        <Avatar
                        src={`https://cdn.nba.com/logos/nba/${game?.home_team_id}/primary/L/logo.svg`}
                        alt="team logo"
                        className="PlayerProfileView__cardMedia__teamLogo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = null;
                        }}
                      />
                        {game.home_team_name}
                      </TableCell>
                      <TableCell className="HighScoringGameView__tableCell">
                       <Avatar
                        src={`https://cdn.nba.com/logos/nba/${game?.away_team_id}/primary/L/logo.svg`}
                        alt="team logo"
                        className="PlayerProfileView__cardMedia__teamLogo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = null;
                        }}
                      />
                        {game.away_team_name}
                      </TableCell>
                      <TableCell className="HighScoringGameView__tableCell">{game.pts_home}</TableCell>
                      <TableCell className="HighScoringGameView__tableCell">{game.pts_away}</TableCell>
                      <TableCell className="HighScoringGameView__tableCell">{game.total_points}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No high scoring games found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </div>
  );
};

export default HighScoringGameView;