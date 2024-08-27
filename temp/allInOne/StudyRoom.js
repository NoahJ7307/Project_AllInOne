import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// import Select from '@mui/joy/Select';
import Select from '@mui/material/Select';
import Option from '@mui/joy/Option';
import { Chip } from '@mui/joy';

const StudyRoom = () => {


    const [formData, setFormData] = useState({
        date: null,
        time: [],
        seatNum: 0
    });
    // Handle text field changes
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };
    // Handle DatePicker changes
    const handleDateChange = (newDate) => {
        if (newDate && dayjs(newDate).isValid()) {  // 날짜가 유효한 경우에만 처리
            const localDate = dayjs(newDate).format('YYYY-MM-DD'); // 로컬 시간대로 변환하여 날짜 포맷 지정
            setFormData({ ...formData, date: localDate });
        }
    };
    // const handleTimeChange = (event) => {
    //     const { target: { value } } = event;
    //     setFormData({ ...formData, time: value });
    // };


    const handleSubmit = (event) => {
        event.preventDefault();

        // const preparedData = {
        //     ...formData,
        //     time: formData.time.join(', '), // Convert array to comma-separated string
        // };


        const apiUrl = '/api/reservation_studyRoom';

        axios.post(apiUrl, formData)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);

            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
                // Handle error (e.g., show an error message)
            });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="예약날짜"
                        value={formData.date ? dayjs(formData.date) : null} // formData.date가 있을 때만 dayjs 객체로 변환
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id='time'>예약시간</InputLabel>
                    <Select
                        labelId="time"
                        // id="demo-simple-select"
                        id="time"

                        label="time"

                    >
                        {[
                            '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
                            '15:00-16:00', '16:00-17:00', '17:00-18:00','18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00','22:00-23:00',
                        ].map(i => <MenuItem value={i}>{i} </MenuItem>)}

                    </Select>
                </FormControl>
            </Box>


            <Box>
                <TextField
                    required
                    id="seatNum"
                    label="좌석번호"
                    value={formData.seatNum}
                    onChange={handleInputChange}
                />
            </Box>



            <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                등록
            </Button>
        </Box>
    );
};

export default StudyRoom;
