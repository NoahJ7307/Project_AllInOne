import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import './BG.css';


const VisitPark = () => {
    const [formData, setFormData] = useState({
        name_visit: '',
        phone_visit: '',
        carNumber_visit: '',
        dong_visit: '',
        ho_visit: '',
        date_visit: dayjs(),
    });
    const [error, setError] = useState({
        name_visit: false,
        phone_visit: false,
        carNumber_visit: false,
        dong_visit: false,
        ho_visit: false,
        date_visit: false,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const handleDateChange = (e) => {
        setFormData({ ...formData, date_visit: e });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
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
        const apiUrl = '/api/visit';
        axios.post(apiUrl, formData)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                alert("예약 완료");
                window.location.reload();
            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
                alert("예약 실패");
            });
    };

    return (
        <Container className='containerBGv' maxWidth={false}>
            <Box className='boxBGv'>
                <Typography variant="h6" fontWeight={100} mb={2}>
                    방문 예약
                </Typography>
                <Grid container spacing={2}>
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
                <Grid container spacing={2}>
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
                <Grid container spacing={2}>
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
                <Grid container spacing={2}>
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
                <Grid container spacing={2}>
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
                                    defaultValue={dayjs()}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params}
                                    />} />
                            </DemoContainer>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                <Button type="submit" onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>예약</Button>
            </Box>
        </Container>
    )
}

export default VisitPark