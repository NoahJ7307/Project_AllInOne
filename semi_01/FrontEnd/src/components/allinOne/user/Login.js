import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import login_bg from '../../img/login_bg.jpg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const defaultTheme = createTheme();

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const mid = data.get('mid');
        const password = data.get('password');
        const apiUrl = '/api/login';

        axios.post(apiUrl, { mid, password })
            .then((response) => {
                const message = response.data; // 서버 응답 데이터
                if (message === 'Login successful') {
                    alert('접속 성공');
                    navigate('/');
                } else if (message === 'ID not found') {
                    alert('존재하지 않는 ID입니다.');
                } else if (message === 'Invalid credentials') {
                    alert('ID와 비밀번호가 불일치 합니다.');
                } else {
                    alert('알 수 없는 응답입니다.');
                }
            })
            .catch((error) => {
                alert('서버와의 연결이 실패했습니다.');
                console.error('There was an error submitting the form:', error);
            });
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth={false}
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundImage: `url(${login_bg})`,
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
                        maxWidth: 400,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <Typography component="h1" variant="h5" align="center">
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mid"
                            label="ID"
                            name="mid"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="자동 로그인"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            로그인
                        </Button>
                        <Grid item xs>
                            <Link href="#" variant="body2" style={{ textDecoration: 'underline', color: 'blue' }}>
                                "비밀번호를 잊어버리셨습니까?"
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link to="/register" href="#" variant="body2" style={{ textDecoration: 'underline', color: 'blue' }} >
                                "아직 계정이 없으십니까?"
                            </Link>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default Login
