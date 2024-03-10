import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#007bff', // Blue color for headers
      },
      secondary: {
        main: '#ffc107', // Example secondary color
      },
      // Define custom properties for alternating row colors
      row: {
        light: '#f6f6f6', // Light grey for even rows
        dark: '#e0e0e0', // Darker grey for odd rows
      },
    },
  });
  

function TicketsTable() {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:8080/v1/tickets/priority');
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <ThemeProvider theme={theme}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h4" align="center" margin={2} color="primary">
                Priority Tickets
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Description</TableCell>
                            <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Priority</TableCell>
                            <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Created Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket,index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={ticket.id} sx={{
                                backgroundColor: index % 2 ? theme.palette.row.dark : theme.palette.row.light,
                              }}>
                                <TableCell>{ticket.id}</TableCell>
                                <TableCell>{ticket.description}</TableCell>
                                <TableCell>{ticket.priority}</TableCell>
                                <TableCell>{ticket.createdTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tickets.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </ThemeProvider>
    );
}

export default TicketsTable;
