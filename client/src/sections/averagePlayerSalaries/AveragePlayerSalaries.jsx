import { debounce } from "lodash";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAveragePlayerSalaries } from 'reduxes/averagePlayerSalariesSlice';

import { visuallyHidden } from "@mui/utils";
import {
  Box,
  Card,
  Table,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Container,
  TableContainer,
  TableSortLabel,
} from '@mui/material';

import './averagePlayerSalaries.scss';

const headCells = [
  { id: 'player_name', label: 'Player Name' },
  { id: 'average_salary', label: 'Average Salary' },
  { id: 'year', label: 'Year' },
];

const AveragePlayerSalariesView = () => {
  const dispatch = useDispatch();
  const { data: players } = useSelector(state => state.averagePlayerSalaries);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('player_name');

  useEffect(() => {
    dispatch(fetchAveragePlayerSalaries({searchQuery, orderBy, order}));
  }, [dispatch, order, orderBy, searchQuery]);

  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value);
  }, 300);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

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

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <div className="AveragePlayerSalariesView">
      <Container maxWidth="lg">
        <Card className="AveragePlayerSalariesView__card">
          <div className="AveragePlayerSalariesView__searchItems">
            <TextField
                label="Search Player"
                variant="outlined"
                className="AveragePlayerSalariesView__searchItems__searchInput"
                onChange={handleSearchChange}
            />
          </div>

          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow >
                  {headCells.map((headCell) => (
                      <TableCell
                          key={headCell.id}
                          sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody >
                {players.length > 0 ? (
                    players.map((player, index) => (
                        <TableRow
                            key={index}
                        >
                          <TableCell
                              className="PlayerView__tableCell"
                              sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Avatar
                                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.player_id}.png`}
                                alt={player.player_name}
                                className="PlayerView__tableCell__avatar"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/assets/nullPlayer.png';
                                }}
                            >
                              <Avatar {...stringAvatar(`${player.player_name}`)} />
                            </Avatar>
                            {player.player_name}
                          </TableCell>
                          <TableCell className="AveragePlayerSalariesView__tableCell">{player.average_salary}</TableCell>
                          <TableCell className="AveragePlayerSalariesView__tableCell">{player.year}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                      <TableCell colSpan={5}>No players found</TableCell>
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

export default AveragePlayerSalariesView;


