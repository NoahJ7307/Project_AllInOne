import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';






const Reservation = () => {



    const handleSubmit = (event, rno) => {
        event.preventDefault();
        console.log(uid)
        const apiUrl = `/api/reservation_studyRoom/${rno}`;

        axios.delete(apiUrl)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                setUsers(response.data)

            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
                // Handle error (e.g., show an error message)
            });
    };
    const [users, setUsers] = useState([])
    const [uid, setUid] = useState(0)
    useEffect(() => {
        axios.get('/api/reservation_studyRoom')
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
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="right">날짜</TableCell>
                            <TableCell align="right">시간</TableCell>
                            <TableCell align="right">좌석번호</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.uid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.uid}
                                </TableCell>

                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.seatNum}</TableCell>
                                <TableCell align="right" onClick={() => console.log('버튼이눌렸어요')}>

                                    <Button>
                                        <DeleteIcon type="submit" onClick={(e) => handleSubmit(e, row.rno)} variant="contained" color="primary" />
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>

            </div>
        </div>


    )
}

export default Reservation