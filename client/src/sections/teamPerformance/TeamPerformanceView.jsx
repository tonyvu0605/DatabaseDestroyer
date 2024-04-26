import { debounce } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamPerformance } from 'reduxes/teamPerformanceSlice';

import { visuallyHidden } from '@mui/utils';
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

import './teamPerformanceView.scss';

const headCells = [
  { id: 'season', label: 'Season' },
  { id: 'team_name', label: 'Team' },
  { id: 'wins', label: 'Wins' },
  { id: 'losses', label: 'Losses' },
  { id: 'win_percentage', label: 'Win Rate' },
];

const TeamPerformanceView = () => {
  const dispatch = useDispatch();
  const { data: teamPerformancesData } = useSelector((state) => state.teamPerformance);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('season');

  useEffect(() => {
    dispatch(fetchTeamPerformance({searchQuery, orderBy, order}));
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

  return (
    <div className="TeamPerformanceView">
      <Container maxWidth="lg">
        <Card className="TeamPerformanceView__card">
          <div className="TeamPerformanceView__searchItems">
            <TextField
              label="Search Team"
              variant="outlined"
              className="TeamPerformanceView__searchItems__searchInput"
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
                {teamPerformancesData.length > 0 ? (
                  teamPerformancesData.map((teamPerformance, index) => (
                    <TableRow
                      key={index}
                    >

                      <TableCell
                        className="TeamPerformanceView__tableCell"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Avatar
                          src={`https://cdn.nba.com/logos/nba/${teamPerformance?.team_id}/primary/L/logo.svg`}
                          alt="team logo"
                          className="PlayerProfileView__cardMedia__teamLogo"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = null;
                          }}
                        />
                        {teamPerformance.team_name}
                      </TableCell>
                      <TableCell className="TeamPerformanceView__tableCell">{teamPerformance.season}</TableCell>
                      <TableCell className="TeamPerformanceView__tableCell">{teamPerformance.wins}</TableCell>
                      <TableCell className="TeamPerformanceView__tableCell">{teamPerformance.losses}</TableCell>
                      <TableCell className="TeamPerformanceView__tableCell">{teamPerformance.win_percentage}</TableCell>
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

export default TeamPerformanceView;
