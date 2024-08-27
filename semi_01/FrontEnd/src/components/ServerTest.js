import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

const ServerTest = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('/api/apart')
            .then(response => {
                // setUsers(response.data);
                console.log(response);
                setUsers(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, []);

    return (
        <Box
            sx={{
                flex: 4, p: 2,
                height: '100vh'
            }}>
            <TableContainer component={Paper}
                aria-label="simple table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>이름 </TableCell>
                            <TableCell align="right">차번호</TableCell>
                            <TableCell align="right">주민등록번호</TableCell>
                            <TableCell align="right">동</TableCell>
                            <TableCell align="right">호</TableCell>
                            <TableCell align="right">전화번호</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.carnumber}</TableCell>
                                <TableCell align="right">{row.residentNumber}</TableCell>
                                <TableCell align="right">{row.dong}</TableCell>
                                <TableCell align="right">{row.ho}</TableCell>
                                <TableCell align="right">{row.phonenumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ServerTest