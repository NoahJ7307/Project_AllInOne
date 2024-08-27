import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const VisitList = () => {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);

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
        const idsToDelete = selected;

        axios.delete('/api/visit', { data: idsToDelete })
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

    return (
        <Box sx={{ flex: 4, p: 2, height: '100vh' }}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={newSelection => {
                        setSelected(newSelection);
                        console.log('Selected IDs:', newSelection); // 확인용 로그
                    }}
                />
            </div>
            <Button variant="contained" onClick={handleDelete} sx={{ mt: 2 }}>삭제</Button>
        </Box>
    );
}

export default VisitList;