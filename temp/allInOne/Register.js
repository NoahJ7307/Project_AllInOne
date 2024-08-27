import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

const Register = () => {
    const [formData, setFormData] = useState({
        mid: '',
        password: '',
        name: '',
        carnumber: '',
        dong: 0,
        ho: 0,
        phonenumber: '',
        residentNumber: '' // 주민번호 추가
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    // 주민번호 입력 핸들러 추가
    const handleResidentNumberChange = (event) => {
        const value = event.target.value;

        //입력값에서 숫자가 아닌 모든 문자를 제거합니다. 정규 표현식 \D는 모든 비숫자 문자를 의미하며
        //, replace 메서드를 사용해 이를 빈 문자열로 대체합니다.
        //예를 들어, 사용자가 "123-45-6789"를 입력하면, numericValue는 "123456789"가 됩니다.
        const numericValue = value.replace(/\D/g, '');


        //숫자 6자리를 입력하며 자동으로 - 생성
        let formattedValue = numericValue;
        if (numericValue.length > 6) {
            formattedValue = `${numericValue.slice(0, 6)}-${numericValue.slice(6, 13)}`;
        }

        setFormData((prevState) => ({
            ...prevState,
            residentNumber: formattedValue
        }));
    };

    /*     // 실명인증 핸들러 추가
        const handleVerifyResidentNumber = () => {
            //현재 상태 객체 formData에서 residentNumber 값을 추출합니다. 이 값은 사용자가 입력한 주민번호입니다.
            const { residentNumber } = formData;
            //residentNumber가 존재하고, 길이가 14자인지 확인합니다. 주민번호는 하이픈을 포함하여 총 14자여야 합니다.
            const isValid = residentNumber && residentNumber.length === 14;
    
            if (isValid) {
                alert('실명인증 성공');
            } else {
                alert('실명인증 실패. 존재하지 않는 주민번호 입니다.');
            }
        }; */

    const handleSubmit = (event) => {
        event.preventDefault();

        const apiUrl = '/api/apart';

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
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원 가입
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="mid"
                                    label="아이디"
                                    value={formData.mid}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="비밀번호"
                                    /* type="password" */
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="이름"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="carnumber"
                                    label="자동차번호"
                                    value={formData.carnumber}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* 주민번호 입력란 추가 */}
                                <TextField
                                    required
                                    fullWidth
                                    id="residentNumber"
                                    label="주민번호"
                                    value={formData.residentNumber}
                                    onChange={handleResidentNumberChange}
                                />
                                {/* <Button
                                    variant="outlined"
                                    onClick={handleVerifyResidentNumber}
                                    sx={{ mt: 2 }}
                                >
                                    실명 인증
                                </Button> */}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dong"
                                    label="동"
                                    value={formData.dong}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="ho"
                                    label="호"
                                    value={formData.ho}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phonenumber"
                                    label="연락처"
                                    value={formData.phonenumber}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            회원 가입
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
