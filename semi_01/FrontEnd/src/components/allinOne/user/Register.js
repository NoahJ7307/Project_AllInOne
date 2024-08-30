import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import register from '../../img/register.jpg';

const defaultTheme = createTheme();

const Register = () => {
    const [formData, setFormData] = useState({
        mid: '',
        password: '',
        name: '',
        carnumber: '',
        dong: '',
        ho: '',
        phonenumber: '',
        residentNumber: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleResidentNumberChange = (event) => {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, '');
        let formattedValue = numericValue;

        if (numericValue.length > 6) {
            formattedValue = `${numericValue.slice(0, 6)}-${numericValue.slice(6, 13)}`;
        }

        setFormData((prevState) => ({
            ...prevState,
            residentNumber: formattedValue
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.mid) {
            newErrors.mid = '아이디를 입력하세요.';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력하세요.';
            isValid = false;
        }
        if (!formData.name) {
            newErrors.name = '이름을 입력하세요.';
            isValid = false;
        }
        if (!formData.carnumber) {
            newErrors.carnumber = '자동차번호를 입력하세요.';
            isValid = false;
        }
        if (!formData.residentNumber || formData.residentNumber.length !== 14) {
            newErrors.residentNumber = '올바른 주민번호를 입력하세요.';
            isValid = false;
        }
        if (!formData.dong) {
            newErrors.dong = '동을 입력하세요.';
            isValid = false;
        }
        if (!formData.ho) {
            newErrors.ho = '호를 입력하세요.';
            isValid = false;
        }
        if (!formData.phonenumber) {
            newErrors.phonenumber = '연락처를 입력하세요.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const apiUrl = '/api/apart';

        axios.post(apiUrl, formData)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                alert('회원가입을 환영합니다.');
                window.location.href = '/login';
            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
                alert('회원가입에 실패했습니다. 나중에 다시 시도해 주세요.');
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth={false}
                sx={{
                    height: '130vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundImage: `url(${register})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '105vh',
                        maxWidth: 400,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backdropFilter: 'blur(5px)'
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
                                    error={!!errors.mid}
                                    helperText={errors.mid}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="비밀번호"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
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
                                    error={!!errors.name}
                                    helperText={errors.name}
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
                                    error={!!errors.carnumber}
                                    helperText={errors.carnumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="residentNumber"
                                    label="주민번호"
                                    value={formData.residentNumber}
                                    onChange={handleResidentNumberChange}
                                    error={!!errors.residentNumber}
                                    helperText={errors.residentNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dong"
                                    label="동"
                                    value={formData.dong}
                                    onChange={handleInputChange}
                                    error={!!errors.dong}
                                    helperText={errors.dong}
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
                                    error={!!errors.ho}
                                    helperText={errors.ho}
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
                                    error={!!errors.phonenumber}
                                    helperText={errors.phonenumber}
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
