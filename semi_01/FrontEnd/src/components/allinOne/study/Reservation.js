import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReserervationModal from './ReserervationModal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import './BG.css';


const Reservation = () => {



    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [reservation, setReservation] = useState({});
    const [uid, setUid] = useState(0);

    const handleUpdate = (event, rno) => {
        event.preventDefault();
        console.log(uid);
        const apiUrl = `/api/reservation_studyRoom/${rno}`;

        axios.update(apiUrl)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                setOpen(true);
            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
            });
    };

    const handleSubmit = (event, rno) => {
        event.preventDefault();

        const isConfirmed = window.confirm('예약을 취소하시겠습니까?');

        if (isConfirmed) {
            const apiUrl = `/api/reservation_studyRoom/${rno}`;


            axios.delete(apiUrl)
                .then((response) => {
                    console.log('Form submitted successfully:', response.data);
                    setUsers(response.data);
                    alert("😊예약이 취소되었습니다. 다음에 다시 이용해주세요😊");
                })
                .catch((error) => {
                    console.error('There was an error submitting the form:', error);
                });
        } else {
            console.log('삭제가 취소되었습니다.😊');
            alert(`예약 하신 내용이 변경되지 않았습니다. \n자세한 정보는 마이페이지를 확인하여 주세요😊`);
            // alert(`현재 예약된 정보는 다음과 같습니다날짜: ${date}`);
        }
    };

    const handleSubmitModify = (event, rno) => {
        event.preventDefault();
        console.log('사랑:');
        console.log(rno);
        const apiUrl = `/api/reservation_studyRoom/${rno}`;

        axios.get(apiUrl)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                setReservation(response.data);  // reservation state 업데이트
                setOpen(true);  // 모달을 열기 위해 open state true로 설정
            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
            });
    };

    useEffect(() => {
        axios.get('/api/reservation_studyRoom')
            .then(response => {
                console.log(response);
                setUsers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, []);

    return (
        <Container className='containerBG' maxWidth={false}>
            <Box className='boxBG' sx={{ width: '80%' }}>
                <div className='a'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">날짜</TableCell>
                                    <TableCell align="right">시간</TableCell>
                                    <TableCell align="right">좌석번호</TableCell>
                                    <TableCell align="right">예약변경</TableCell>
                                    <TableCell align="right">예약취소</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <TableRow
                                        key={row.uid}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.time}</TableCell>
                                        <TableCell align="right">{row.seatNum}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={(e) => handleSubmitModify(e, row.rno)}>
                                                <EditIcon variant="contained" color="primary" />
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button onClick={(e) => handleSubmit(e, row.rno)}>
                                                <DeleteIcon variant="contained" color="primary" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {open && (
                        <ReserervationModal f={(a) => {
                            console.log('여기에 수정된 데이터가 와야되 ', a)
                            setUsers(a)
                        }}
                            room={reservation}
                            open={open}
                            onClose={() => setOpen(false)}  // 모달을 닫을 수 있게 setOpen을 사용
                        />
                    )}
                </div>
            </Box>
        </Container>
    )
}

export default Reservation;
