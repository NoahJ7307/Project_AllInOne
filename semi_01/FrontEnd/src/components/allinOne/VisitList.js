import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const VisitList = () => {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        // console.log(selected);
        // console.log(users.find(i => i.id === selected[0])?.name_visit||"");
        selected.length == 1 ? setOpen(true) : alert("데이터 수정은 1개씩만 가능합니다")
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get('/api/visit')
            .then(response => {
                const formattedRows = response.data.map(data => ({
                    id: data.id_visit,
                    date_visit: data.date_visit,
                    name_visit: data.name_visit,
                    carNumber_visit: data.carNumber_visit,
                    dong_visit: data.dong_visit,
                    ho_visit: data.ho_visit
                }));
                // console.log(formattedRows);
                setUsers(formattedRows);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'date_visit', headerName: '방문일', width: 170 },
        { field: 'name_visit', headerName: '방문자 이름', width: 130 },
        { field: 'carNumber_visit', headerName: '방문 차량번호', width: 130 },
        { field: 'dong_visit', headerName: '동', type: 'number', width: 90 },
        { field: 'ho_visit', headerName: '호', type: 'number', width: 90 },
    ];

    const handleDelete = () => {

        Promise.all(selected.map(id =>
            axios.delete(`/api/visit/${id}`)))
            .then(response => {
                console.log(response.data);
                alert("삭제 성공");
                return axios.get('/api/visit');
            })
            .then(response => {
                const formattedRows = response.data.map(data => ({
                    id: data.id_visit,
                    date_visit: data.date_visit,
                    name_visit: data.name_visit,
                    carNumber_visit: data.carNumber_visit,
                    dong_visit: data.dong_visit,
                    ho_visit: data.ho_visit
                }));
                setUsers(formattedRows);
            })
            .catch(error => {
                console.error('There was an error submitting the form:', error);
                alert("삭제 실패");
            });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box sx={{ flex: 4, p: 2, height: '100vh' }}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={itm => setSelected(itm)}
                />
            </div>
            <Button variant="contained" onClick={handleDelete} sx={{ mt: 2 }}>삭제</Button>
            <Button variant="contained" onClick={handleOpen} sx={{ mt: 2, mx: 2 }}>수정</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    width: 400,
                    p: 4,
                }}
                    component="form"
                    noValidate
                    autoComplete="off">
                    <Typography variant="h6" fontWeight={100} mb={2}>
                        방문 예약
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name_visit"
                                label="방문자 이름"
                                value={users.find(i => i.id === selected[0])?.name_visit || ""}
                                // onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}
                    // onClick={handleSubmit}
                    >수정</Button>
                </Box>
            </Modal>

        </Box>
    );
}

export default VisitList;