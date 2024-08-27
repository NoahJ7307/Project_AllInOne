import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';

// npm install @mui/x-data-grid / 설치 필요
const VisitPark = () => {
    const [formData, setFormData] = useState({
        name_visit: '',
        phone_visit: '',
        date_visit: dayjs(),
        dong_visit: 0,
        ho_visit: 0,
        carNumber_visit: '',
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

        const apiUrl = '/api/visit';

        axios.post(apiUrl, formData)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                alert("예약 완료");
                setFormData({
                    name_visit: '',
                    phone_visit: '',
                    date_visit: dayjs(),
                    dong_visit: 0,
                    ho_visit: 0,
                    carNumber_visit: '',
                });
            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
                alert("예약 실패");
            });
    };

    return (
        <Box sx={{
            flex: 4, p: 2, '& .MuiTextField-root': { m: 1 },
            height: '100vh'
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
                        value={formData.name_visit}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="phone_visit"
                        label="방문자 전화번호"
                        value={formData.phone_visit}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="carNumber_visit"
                        label="방문자 차량번호"
                        value={formData.carNumber_visit}

                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="dong_visit"
                        label="방문 동"
                        value={formData.dong_visit}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="ho_visit"
                        label="호수"
                        value={formData.ho_visit}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DesktopDatePicker']}>
                    <DesktopDatePicker
                        required
                        fullWidth
                        id="date_visit"
                        label="방문 일자"
                        value={formData.date_visit}
                        defaultValue={dayjs()}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />} />
                </DemoContainer>
            </LocalizationProvider>
            <Button type="submit" onClick={handleSubmit}>예약</Button>
        </Box>
    )
}

export default VisitPark