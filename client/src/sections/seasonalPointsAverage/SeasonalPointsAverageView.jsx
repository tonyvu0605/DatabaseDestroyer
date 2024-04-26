import {debounce} from "lodash";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeasonalPointsAverage } from 'reduxes/seasonalPointsAverageSlice';

import { visuallyHidden } from "@mui/utils";
import {
  Box,
  Card,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Container,
  TableContainer,
  TableSortLabel, Typography,
} from '@mui/material';

import "./seasonalPointsAverageView.scss"

const headCells = [
  { id: 'season', label: 'Season' },
  { id: 'home_team_average', label: 'Home Team Average' },
  { id: 'away_team_average', label: 'Away Team Average' },
  { id: 'total_points_average', label: 'Total Points Average' },
];

const SeasonalPointsAverageView = () => {
  const dispatch = useDispatch();
  const { data: seasonalPointsAverage } = useSelector((state) => state.seasonalPointsAverage);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('season');

  useEffect(() => {
    dispatch(fetchSeasonalPointsAverage({ searchQuery, orderBy, order }));
  }, [dispatch, searchQuery, order, orderBy]);

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
    <div className="SeasonalPointsAverageView">
      <Container maxWidth="lg">
        <Card className="SeasonalPointsAverageView__card">
          <Typography sx={{paddingLeft: '1rem'}} className="TeamSalariesByYearView_title" variant="h4">Historical Point Avgs.</Typography>
          <div className="SeasonalPointsAverageView__searchItems">
            <TextField
                label="Search Season"
                variant="outlined"
                className="SeasonalPointsAverageView__searchItems__searchInput"
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
                {seasonalPointsAverage.length > 0 ? (
                    seasonalPointsAverage.map((seasonal, index) => (
                        <TableRow
                            key={index}
                        >
                          <TableCell className="SeasonalPointsAverageView__tableCell">{seasonal.season}</TableCell>
                          <TableCell className="SeasonalPointsAverageView__tableCell">{seasonal.home_team_average}</TableCell>
                          <TableCell className="SeasonalPointsAverageView__tableCell">{seasonal.away_team_average}</TableCell>
                          <TableCell className="SeasonalPointsAverageView__tableCell">{seasonal.total_points_average}</TableCell>
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

export default SeasonalPointsAverageView;
