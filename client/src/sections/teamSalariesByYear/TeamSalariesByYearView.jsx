import { debounce } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamSalaries } from 'reduxes/teamSalariesByYearSlice';

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
  TablePagination,
} from '@mui/material';

import './teamSalariesByYearView.scss';

const headCells = [
  { id: 'team_name', label: 'Team Name' },
  { id: 'year', label: 'Year' },
  { id: 'total_salary', label: 'Total Salary' },
];


const TeamSalariesByYearView = () => {
  const dispatch = useDispatch();
  const { data: teamSalaries, totalCount } = useSelector((state) => state.teamSalaries);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('year');

  useEffect(() => {
    dispatch(fetchTeamSalaries({ searchQuery, limit, offset, orderBy, order }));
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

  console.log(teamSalaries);

  return (
    <div className="TeamSalariesByYearView">
      <Container maxWidth="lg">
        <Card className="TeamSalariesByYearView__card">
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
                {teamSalaries?.length > 0 ? (
                  teamSalaries.map((team, index) => (
                    <TableRow
                      key={index}
                    >

                      <TableCell
                        className="TeamSalariesByYearView__tableCell"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Avatar
                          src={`https://cdn.nba.com/logos/nba/${team?.team_id}/primary/L/logo.svg`}
                          alt="team logo"
                          className="PlayerProfileView__cardMedia__teamLogo"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = null;
                          }}
                        />
                        {team.team_name}
                      </TableCell>
                      <TableCell className="TeamSalariesByYearView__tableCell">{team.year}</TableCell>
                      <TableCell
                        className="TeamSalariesByYearView__tableCell">{team.total_salary}</TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>Team not found</TableCell>
                  </TableRow>
                )}
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

export default TeamSalariesByYearView;
