import { debounce } from "lodash";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAveragePlayerSalaries } from 'reduxes/averagePlayerSalariesSlice';

import {visuallyHidden} from "@mui/utils";
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
                          <TableCell className="AveragePlayerSalariesView__tableCell">{player.player_name}</TableCell>
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


