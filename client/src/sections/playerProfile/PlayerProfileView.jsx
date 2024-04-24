import Iconify from 'components/iconify';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPlayerById } from 'reduxes/playerSlice';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import {
  Card,
  Container, Typography, CardContent,
} from '@mui/material';

import './playerProfileView.scss';


const PlayerProfileView = () => {
  const dispatch = useDispatch();
  const playerId = parseInt(useLocation().pathname.split('/')[2], 10);

  const [ playerData ] = useSelector((state) => state.player.playerData);

  useEffect(() => {
    dispatch(fetchPlayerById(playerId));
  }, [dispatch, playerId]);


  if(!playerData) return null;
  console.log(playerData);

  return (
    <Container maxWidth="lg" className="PlayerProfileView">
      <Card
        className="PlayerProfileView__card"
      >
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
              <Iconify icon="mingcute:cake-line" />&nbsp;DOB: {new Date(playerData.birthdate).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" className="PlayerProfileView__cardMedia__infoText">
              <Iconify icon="guidance:guest-height-limit" />&nbsp;Height: {Math.floor(playerData.height_inch / 12)}&apos;{(playerData.height_inch % 12)}&quot;
            </Typography>
            <Typography variant="h6" className="PlayerProfileView__cardMedia__infoText">
              <Iconify icon="material-symbols:weight-outline" />&nbsp;lbs: {playerData.weight_lbs}
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
                alt="Player"
                className="PlayerProfileView__cardMedia__teamLogo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = null;
                }}
            />
            <Typography variant="h4" className="PlayerProfileView__playerTeam">
              {playerData.team_name || 'Unavailable'}
            </Typography>
          </Box>
        </Box>
        <CardContent/>
      </Card>
    </Container>
  );
};

export default PlayerProfileView;