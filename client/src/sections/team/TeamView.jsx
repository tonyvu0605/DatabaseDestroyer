import { debounce } from 'lodash';
import { fetchTeams } from 'reduxes/teamSlice';
import React, { useState, useEffect } from 'react';
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

import './teamView.scss';

const headCells = [
  { id: 'team_name', label: 'Team Name' },
  { id: 'team_city', label: 'City' },
  { id: 'team_year_founded', label: 'Year Founded' },
  { id: 'state_province', label: 'State' },
  { id: 'country', label: 'Country' },
  { id: 'arena_name', label: 'Arena' },
  { id: 'team_headcoach', label: 'Headcoach' },
  { id: 'team_owner', label: 'Owner' },
];

const TeamView = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('team_name');

  const { teamData, totalCount } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchTeams({ searchQuery, limit, offset, orderBy, order }));
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
      <div className="TeamView">
        <Container maxWidth="lg">
          <Card className="TeamView__card">
            <div className="TeamView__searchItems">
              <TextField
                  label="Search Teams"
                  variant="outlined"
                  className="TeamView__searchItems__searchInput"
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
                  {teamData.map((team) => (
                      <TableRow key={team.team_id}>
                        <TableCell>{team.team_name}</TableCell>
                        <TableCell>{team.team_city}</TableCell>
                        <TableCell>{team.team_year_founded}</TableCell>
                        <TableCell>{team.state_province}</TableCell>
                        <TableCell>{team.country}</TableCell>
                        <TableCell>{team.arena_name}</TableCell>
                        <TableCell>{team.team_headcoach}</TableCell>
                        <TableCell>{team.team_owner}</TableCell>
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

export default TeamView;