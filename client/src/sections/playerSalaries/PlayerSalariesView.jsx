import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { fetchPlayerSalariesByYear } from 'reduxes/PlayerSalariesSlice';
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
import { visuallyHidden } from '@mui/utils';
import './playerSalariesView.scss';

const headCells = [
  { id: 'player_name', label: 'Player Name', sortable: true },
  { id: 'salary', label: 'Salary', sortable: false },
  { id: 'year', label: 'Year', sortable: false },
];

const PlayerSalariesView = () => {
  const dispatch = useDispatch();
  const { data: players, totalCount } = useSelector((state) => state.playerSalaries);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('player_name');

  const fetchData = useCallback(() => {
    dispatch(fetchPlayerSalariesByYear({ searchQuery, limit, offset, orderBy, order }));
  }, [dispatch, searchQuery, limit, offset, orderBy, order]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = useCallback(
    debounce((event) => {
      setSearchQuery(event.target.value);
      setOffset(0);
    }, 300),
    []
  );

  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [order, orderBy]);

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = useCallback((event, newPage) => {
    setOffset(newPage * limit);
  }, [limit]);

  const handleChangeRowsPerPage = useCallback((event) => {
    setLimit(parseInt(event.target.value, 10));
    setOffset(0);
  }, []);

  const groupPlayersByPlayerId = useMemo(
    () =>
      players.reduce((acc, player) => {
        if (!acc[player.player_id]) {
          acc[player.player_id] = [];
        }
        acc[player.player_id].push(player);
        return acc;
      }, {}),
    [players]
  );

  const getPlayerInitials = useCallback((playerName) => {
    const names = playerName.split(' ');
    const initials = names.map((name) => name.charAt(0)).join('');
    return initials.toUpperCase();
  }, []);

  return (
    <div className="PlayerSalariesView">
      <Container maxWidth="lg">
        <Card className="PlayerSalariesView__card">
          <div className="PlayerSalariesView__searchItems">
            <TextField
              label="Search Player"
              variant="outlined"
              className="PlayerSalariesView__searchItems__searchInput"
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
                      className="PlayerSalariesView__tableCell"
                    >
                      {headCell.sortable ? (
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
                      ) : (
                        headCell.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupPlayersByPlayerId).map(([playerId, playerData]) => {
                  const playerName = playerData[0].player_name;
                  return (
                    <React.Fragment key={playerId}>
                      <TableRow>
                        <TableCell colSpan={3} className="PlayerSalariesView__tableCell">
                          <div className="PlayerSalariesView__playerInfo">
                            <Avatar
                              src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
                              alt={playerName}
                              className="PlayerSalariesView__tableCell__avatar"
                              loading="lazy"
                            >
                              {getPlayerInitials(playerName)}
                            </Avatar>
                            <span className="PlayerSalariesView__playerName">{playerName}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                      {playerData.map((data) => (
                        <TableRow key={`${playerId}-${data.year}`}>
                          <TableCell className="PlayerSalariesView__tableCell" />
                          <TableCell className="PlayerSalariesView__tableCell">{data.salary}</TableCell>
                          <TableCell className="PlayerSalariesView__tableCell">{data.year}</TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  );
                })}
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

export default React.memo(PlayerSalariesView);