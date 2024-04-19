import { debounce } from 'lodash';
import React, { useState, useEffect } from 'react';
import { fetchPlayers } from 'reduxes/playerSlice';
import { useDispatch, useSelector } from 'react-redux';

import { visuallyHidden } from '@mui/utils';
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
  TablePagination,
} from '@mui/material';

import './playerView.scss';

const headCells = [
  { id: 'player_name', label: 'Player Name' },
  { id: 'birthdate', label: 'Birthdate' },
  { id: 'school', label: 'School' },
  { id: 'height_inch', label: 'Height (inches)' },
  { id: 'weight_lbs', label: 'Weight (lbs)' },
];

const PlayerView = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('player_name');

  const { playerData, totalCount } = useSelector((state) => state.player);

  useEffect(() => {
    dispatch(fetchPlayers({ searchQuery, limit, offset, orderBy, order }));
  }, [dispatch, searchQuery, limit, offset, order, orderBy]);

  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value);
    setOffset(0);
  }, 300);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setOffset(newPage * limit);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setOffset(0);
  };

  return (
    <div className="PlayerView">
      <Container maxWidth="lg">
        <Card className="PlayerView__card">
          <div className="PlayerView__searchItems">
            <TextField
              label="Search Players"
              variant="outlined"
              className="PlayerView__searchItems__searchInput"
              onChange={handleSearchChange}
            />
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={limit}
              page={offset / limit}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Card>
      </Container>
    </div>
  );
};

export default PlayerView;