import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Button, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import empty from '../../img/empty.png';
import checked from '../../img/checked.jpg';

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



const ReserervationModal = ({ room, open, onClose, f }) => {
    const label = '⏰ 예약시간 ⏰'
    const reservationSt = () => {
        window.location.href = 'http://localhost:3000/Reservation'
    }
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

    const [reservedData, setReservedData] = useState([]);
    const labelGroups = [
        [1, 2, 3, 4], //첫번째줄
        [5, 6, 7, 8], //두번째줄
        [9, 10, 11, 12] //세번째줄

    ];
    useEffect(() => {
        // 이미 예약된 데이터를 가져오는 API 호출
        axios.get('/api/reservation_studyRoom')
            .then(response => {
                setReservedData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the reserved data!', error);
            });
    }, []);

    const [selectedCheckbox, setSelectedCheckbox] = useState(null);

    const handleTimeChange = (event) => {

        setFormData({ ...formData, time: event.target.value });
    };

    const [formData, setFormData] = useState({
        date: room?.date || null,
        time: room?.time || '',
        seatNum: room?.seatNum || 0,
    });
    // const [returneddData, setReturneddData] = useState([])

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleDateChange = (newDate) => {
        if (newDate && dayjs(newDate).isValid()) {
            const localDate = dayjs(newDate).format('YYYY-MM-DD');
            setFormData({ ...formData, date: localDate, rno: room.rno });
        }
    };
    // const [reservedData, setReservedData] = useState([]);
    const handleUpdate = (event) => {
        event.preventDefault();
        const { date, time, seatNum } = formData;
        // event.preventDefault();

        // console.log('Form Data:', formData);
        // console.log('Reserved Data:', reservedData);


        const isDuplicate = reservedData.some(
            (reservation) =>
                reservation.date === date &&
                reservation.time === time &&
                reservation.seatNum === seatNum &&
                reservation.rno !== room.rno
        );



        if (isDuplicate) {
            alert('선택된 좌석은 이미 예약이 완료 되었습니다.\n다른 좌석, 혹은 다른 시간대를 다시 선택하여 주십시오');

        }
        else {
            const updatedData = {
                ...formData,
                rno: room.rno,
            };
            axios.put(`/api/reservation_studyRoom/${room.rno}`, updatedData)
                .then((response) => {
                    alert(`날짜: ${date}, 시간: ${time},\n좌석번호: ${seatNum} 으로 예약이 변경 되었습니다.`);
                    window.location.reload();
                    // console.log('Form submitted successfully:', response.data);
                    // setReturneddData(response.data)
                    f(response.data)
                    onClose();  // Update 후 모달 닫기
                })
                .catch((error) => {
                    console.error('There was an error submitting the form:', error);
                });
        };

        // event.preventDefault();

        // 업데이트된 formData를 사용해 axios.put 호출
        // const updatedData = {
        //     ...formData,
        //     rno: room.rno,  // rno 추가
        // };

        // const apiUrl = `/api/reservation_studyRoom/${room.rno}`;


    };
    return (
        <Modal id="modal"
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Reservation Details
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleUpdate}  // 폼 제출 시 handleUpdate 호출
                >
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker disablePast
                                label="📆 예약날짜 📆"
                                value={formData.date ? dayjs(formData.date) : null} // formData.date가 있을 때만 dayjs 객체로 변환
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

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
                                                                width: 60,
                                                                height: 60,
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
                    <Button type="submit" variant="contained" color="primary">
                        등록
                    </Button>
                    <Button style={{ marginLeft: '8px' }} onClick={reservationSt} variant="contained" color="primary">취소</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ReserervationModal;