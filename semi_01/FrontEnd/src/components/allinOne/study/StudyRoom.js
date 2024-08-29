import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Container } from '@mui/material';
import axios from 'axios';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { grey } from '@mui/material/colors';
import empty from '../../img/empty.png';
import checked from '../../img/checked.jpg';
import './BG.css';


const StudyRoom = () => {


    const label = '⏰ 예약시간 ⏰'


    const [reservedData, setReservedData] = useState([]);
    const [dateTemp, setDateTemp] = useState('')


    const [formData, setFormData] = useState({
        date: null,
        time: null,
        seatNum: 0
    });

    //좌석 체크박스 (하나만 가능하게 구현)
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);

    // 좌석 그룹
    const labelGroups = [
        [1, 2, 3, 4], //첫번째줄
        [5, 6, 7, 8], //두번째줄
        [9, 10, 11, 12] //세번째줄

    ];



    useEffect(() => {
        axios.get('/api/reservation_studyRoom')
            .then(response => {

                setReservedData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reserved seats:', error);
            });
    }, []);



    const handleCheckboxChange = (label) => {
        if (selectedCheckbox === label) {
            setSelectedCheckbox(null);
            setFormData({ ...formData, seatNum: 0 });

        } else {
            setSelectedCheckbox(label);
            setFormData({ ...formData, seatNum: label });
        }
        console.log('Selected Seat Number:', label);


    }


    // Handle text field changes
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
        console.log('Form Data:', formData); // 상태 확인
    };


    // Handle DatePicker changes
    const handleDateChange = (newDate) => {
        console.log(newDate)
        if (newDate && dayjs(newDate).isValid()) {  // 날짜가 유효한 경우에만 처리
            const localDate = dayjs(newDate).format('YYYY-MM-DD'); // 로컬 시간대로 변환하여 날짜 포맷 지정
            setFormData({ ...formData, date: localDate });
        }
    };


    //현재시간 체크 
    const timeCheck = (i) => {
        var apiUrl = '/api/reservation_studyRoom/dateCheck/'
        var dateAndTime = { time: i, date: formData.date }
        console.log(dateAndTime)
        axios.post(apiUrl, dateAndTime)
            .then((response) => {
                console.log(response.data);

                const submitBtn = document.getElementById('submitBtn');

                if (response.data === false) {
                    alert(' 현재시간 이후로 다시 설정해주세요 ')
                    submitBtn.disabled = true;
                    submitBtn.style.backgroundColor = 'gray'
                } else {
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }

            })
            .catch((error) => {
                console.error('Error fetching reserved seats:', error);
            });

    }


    // 시간 변경 핸들러
    const handleTimeChange = (event, i) => {
        if (formData.date === null) {
            alert(" ⚠️ 날짜 먼저 선택해 주세요 ⚠️ ")
            return;
        }
        console.log("시간이 눌렸어요", i)
        timeCheck(i)
        setFormData({ ...formData, time: event.target.value });
    };
    // 예약조회사이트 이동
    const reservationSt = () => {
        window.location.href = 'http://localhost:3000/Reservation'
    }

    // 해당 좌석, 시간 날짜 중복체크 핸들러

    const handleSubmit = (event) => {
        const { date, time, seatNum } = formData;
        event.preventDefault();

        console.log('Form Data:', formData);
        console.log('Reserved Data:', reservedData);




        const isDuplicate = reservedData.some(
            (reservation) =>
                reservation.date === date &&
                reservation.time === time &&
                reservation.seatNum === seatNum
        );



        if (date === null || time === null || seatNum === 0) {
            alert('선택되지 않은 항목이 있습니다. 다시 확인하여 주십시오')
            return;
        }



        if (isDuplicate) {
            alert('선택된 좌석은 이미 예약이 완료 되었습니다.\n다른 좌석, 혹은 다른 시간대를 다시 선택하여 주십시오');

        } else {
            axios.post('/api/reservation_studyRoom', formData)
                .then((response) => {
                    alert(`날짜: ${date}, 시간: ${time},\n좌석번호: ${seatNum} 으로 예약이 완료되었습니다.`);
                    window.location.reload();
                    console.log('Form submitted successfully:', response.data);
                })
                .catch((error) => {
                    console.error('There was an error submitting the form:', error);
                });

        }


    };

    return (
        <Container className='containerBG' maxWidth={false}>
            <Box className='boxBG'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disablePast
                                label="📆 예약날짜 📆"
                                value={formData.date ? dayjs(formData.date) : null} // formData.date가 있을 때만 dayjs 객체로 변환
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}

                            />

                        </LocalizationProvider>
                    </div>
                    {/*------------------------- 예약시간 Box ----------------------  */}

                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id='time' >{label}</InputLabel>

                            <Select


                                labelId="time"

                                value={formData.time || ''} //추가
                                onChange={(e) => handleTimeChange(e, e.target.value)} //추가

                                label={label}

                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200,
                                            width: 150,

                                        }
                                    }
                                }}

                            >
                                {[
                                    '07:00 ~ 08:00', '08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00', '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00',
                                    '15:00 ~ 16:00', '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '19:00 ~ 20:00', '20:00 ~ 21:00', '21:00 ~ 22:00', '22:00 ~ 23:00',

                                ].map(time => (<MenuItem key={time} value={time}> {time} </MenuItem>))}
                                {/* ].map(i => <MenuItem onClick={() => setFormData({ ...formData, time: i })} value={i}>{i} </MenuItem>)} */}

                            </Select>
                        </FormControl>
                    </Box>


                    <Box>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"></FormLabel>
                            <FormGroup aria-label="position" row>
                                <div>
                                    ✔️ 원하시는 좌석을 선택하여 주십시오 ✔️
                                    {labelGroups.map((group, groupIndex) => (
                                        <div
                                            key={groupIndex}
                                            style={{ marginBottom: '16px' }}

                                        >
                                            {group.map((label, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    // value="bottom"
                                                    value={formData.seatNum}
                                                    control={
                                                        <Checkbox

                                                            checked={selectedCheckbox === label}
                                                            onChange={() => handleCheckboxChange(label)}
                                                            sx={{
                                                                width: 100,
                                                                height: 100,
                                                                padding: 0, // 기본 패딩 제거
                                                                border: 'none', // 기본 테두리 제거
                                                                backgroundColor: 'transparent', // 배경 색상 투명
                                                                // 기본 체크박스 스타일 숨기기
                                                                '& .MuiSvgIcon-root': {
                                                                    display: 'none', // 기본 체크 아이콘 숨기기
                                                                },
                                                                // 체크박스의 체크 상태 스타일
                                                                '&.Mui-checked': {
                                                                    backgroundImage: `url(${checked})`, // 체크된 상태에서의 이미지
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    backgroundColor: 'transparent', // 배경 색상 투명
                                                                    border: 'none', // 체크된 상태에서 테두리 제거
                                                                },
                                                                // 체크되지 않은 상태 스타일
                                                                '&:not(.Mui-checked)': {
                                                                    backgroundImage: `url(${empty})`, // 체크되지 않은 상태에서의 이미지
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    backgroundColor: 'transparent', // 배경 색상 투명
                                                                    border: 'none', // 체크되지 않은 상태에서도 테두리 제거
                                                                },
                                                                // 요소가 부모 요소 안에서 정확하게 위치하도록 설정
                                                                '&:before': {
                                                                    content: '""',
                                                                    display: 'block',
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    left: 0,
                                                                    zIndex: -1, // 이미지를 체크박스 뒤에 배치
                                                                },
                                                            }}
                                                        />}
                                                    label={label.toString()}
                                                    labelPlacement="bottom"
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </FormGroup>
                        </FormControl>

                        <br />
                        <div>
                            <TextField
                                disabled
                                id="seatNum"
                                label="선택한 좌석번호"
                                value={formData.seatNum}
                                onChange={handleInputChange}
                            />
                        </div>


                    </Box>
                    <div >
                        <Button id="submitBtn" type="submit" onClick={handleSubmit} variant="contained" color="primary">
                            등록
                        </Button>
                        <Button style={{ marginLeft: '8px' }} onClick={reservationSt} variant="contained" color="primary">예약 조회</Button>
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default StudyRoom;
