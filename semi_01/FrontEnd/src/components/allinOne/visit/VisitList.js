import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { DataGrid, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import MuiPagination from '@mui/material/Pagination';
import './BG.css';

function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event, newPage - 1);
            }}
        />
    );
}

function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const VisitList = () => {
    const [formData, setFormData] = useState({});
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [searchCategory, setSearchCategory] = useState('name_visit');
    const [error, setError] = useState({
        name_visit: false,
        phone_visit: false,
        carNumber_visit: false,
        dong_visit: false,
        ho_visit: false,
        date_visit: false,
    });

    useEffect(() => {
        axios.get('/api/visit')
            .then(response => {
                const formattedRows = response.data.map(data => ({
                    id: data.id_visit,
                    date_visit: data.date_visit,
                    name_visit: data.name_visit,
                    phone_visit: data.phone_visit,
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

    const handleOpen = () => {
        if (selected.length > 1) {
            alert("데이터 수정은 1개씩 가능합니다");
            return;
        }

        const selectedUser = users.find(i => i.id === selected[0]);

        if (selectedUser) {
            setFormData({
                id_visit: selected[0] || 0,
                name_visit: selectedUser.name_visit || '',
                phone_visit: selectedUser.phone_visit || '',
                date_visit: dayjs(selectedUser.date_visit) || dayjs(),
                dong_visit: selectedUser.dong_visit || 0,
                ho_visit: selectedUser.ho_visit || 0,
                carNumber_visit: selectedUser.carNumber_visit || ''
            });
            setOpen(true);
        } else {
            alert("선택한 사용자가 없습니다.");
        }
    };
    const handleClose = () => {
        setOpen(false)
        window.location.reload();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleDateChange = (newDate) => {
        setFormData(prevFormData => ({ ...prevFormData, date_visit: newDate }));
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        const apiUrl = '/api/visit';

        const newError = {
            name_visit: !formData.name_visit,
            phone_visit: !formData.phone_visit,
            carNumber_visit: !formData.carNumber_visit,
            dong_visit: !formData.dong_visit,
            ho_visit: !formData.ho_visit,
            date_visit: !formData.date_visit,
        };

        if (Object.values(newError).includes(true)) {
            setError(newError);
            alert('필수 항목이 입력되지 않았습니다');
            return;
        }
        axios.put(apiUrl, formData)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                alert("수정 완료");
                handleClose();
                // users 객체에 변경사항 확인 후 업데이트 || 유지, date는 문자열로 받으면 오류가 발생하므로 따로 date type으로 지정
                setUsers(users => users.map(user =>
                    user.id === formData.id_visit ?
                        { ...formData, id: formData.id_visit, date_visit: formData.date_visit.format('YYYY-MM-DD') } : user
                ));
            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
                alert("수정 실패");
                handleClose();
            });
    };

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
                    phone_visit: data.phone_visit,
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

    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchItem(e.target.value);
    };

    const handleSearch = () => {
        axios.get('/api/visit/search', {
            params: {
                category: searchCategory,
                search: searchItem
            }
        })
            .then(response => {
                const formattedRows = response.data.map(data => ({
                    id: data.id_visit,
                    date_visit: data.date_visit,
                    name_visit: data.name_visit,
                    phone_visit: data.phone_visit,
                    carNumber_visit: data.carNumber_visit,
                    dong_visit: data.dong_visit,
                    ho_visit: data.ho_visit
                }));
                setUsers(formattedRows);
            })
            .catch(error => {
                console.error('There was an error submitting the form:', error);
            });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'date_visit', headerName: '방문일', width: 170 },
        { field: 'name_visit', headerName: '방문자 이름', width: 130 },
        { field: 'phone_visit', headerName: '방문자 전화번호', width: 150 },
        { field: 'carNumber_visit', headerName: '방문 차량번호', width: 120 },
        { field: 'dong_visit', headerName: '동', type: 'number', width: 70 },
        { field: 'ho_visit', headerName: '호', type: 'number', width: 70 },
    ];


    return (
        <Container className='containerBGv' maxWidth={false}>
            <Box className='boxBGv' sx={{ width: '80%' }}>
                <Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" onClick={handleDelete}>삭제</Button>
                        <Button variant="contained" onClick={handleOpen}>수정</Button>
                    </Box>
                    <Box>
                        <FormControl sx={{ mt: 2, mx: 2, minWidth: 120 }}>
                            <InputLabel id="search-category-label">검색 카테고리</InputLabel>
                            <Select
                                labelId="search-category-label"
                                value={searchCategory}
                                onChange={handleSearchCategoryChange}
                                label="검색 카테고리"
                            >
                                <MenuItem value="name_visit">방문자 이름</MenuItem>
                                <MenuItem value="phone_visit">방문자 전화번호</MenuItem>
                                <MenuItem value="carNumber_visit">차량번호</MenuItem>
                                <MenuItem value="dong_visit">동</MenuItem>
                                <MenuItem value="ho_visit">호</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ mt: 2, mx: 2 }}
                            required
                            label="검색어 입력"
                            value={searchItem}
                            onChange={handleSearchInputChange}
                            variant="outlined"
                        />
                        <Button variant="contained" onClick={handleSearch} sx={{ mt: 2, mx: 2 }}>검색</Button>
                    </Box>
                </Box>
                <div style={{ flex: 1, width: '100%' }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        checkboxSelection
                        onRowSelectionModelChange={itm => setSelected(itm)}
                        pagination
                        slots={{
                            pagination: CustomPagination,
                        }}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 7 } },
                        }}
                    />
                </div>

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
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name_visit"
                                    label="방문자 이름"
                                    value={formData.name_visit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    error={error.name_visit}
                                    helperText={error.name_visit ? '필수 항목 입니다' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone_visit"
                                    label="방문자 전화번호"
                                    value={formData.phone_visit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    error={error.phone_visit}
                                    helperText={error.phone_visit ? '필수 항목 입니다' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="carNumber_visit"
                                    label="방문자 차량번호"
                                    value={formData.carNumber_visit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    error={error.carNumber_visit}
                                    helperText={error.carNumber_visit ? '필수 항목 입니다' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dong_visit"
                                    label="방문 동"
                                    value={formData.dong_visit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    error={error.dong_visit}
                                    helperText={error.dong_visit ? '필수 항목 입니다' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="ho_visit"
                                    label="호수"
                                    value={formData.ho_visit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    error={error.ho_visit}
                                    helperText={error.ho_visit ? '필수 항목 입니다' : ''}
                                />
                            </Grid>
                        </Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <DemoContainer components={['DesktopDatePicker']}>
                                        <DesktopDatePicker
                                            required
                                            fullWidth
                                            id="date_visit"
                                            label="방문 일자"
                                            value={formData.date_visit}
                                            minDate={dayjs()}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />} />
                                    </DemoContainer>
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}
                            onClick={handleUpdate}
                        >수정</Button>
                        <Button type="submit" variant="contained" sx={{ mx: 2, mt: 2 }}
                            onClick={handleClose}
                        >취소</Button>
                    </Box>
                </Modal >
            </Box>
        </Container>
    );
}

export default VisitList;