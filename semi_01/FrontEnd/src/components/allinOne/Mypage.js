import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'

const Mypage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/apart')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, []);

    return (
        <Container maxWidth="xs">
            {users.map((user) => (
                <Paper key={user.mid} style={{ padding: 16, marginBottom: 16 }}>
                    <Typography variant="h6" fontWeight={100} mb={2}>
                        회원 정보
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ID"
                                value={user.mid}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="이름"
                                value={user.name}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="자동차번호"
                                value={user.carnumber}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="주민번호"
                                value={user.residentNumber}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="동"
                                value={user.dong}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="호"
                                value={user.ho}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="연락처"
                                value={user.phonenumber}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        component={Link} to="/revise"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        회원정보 수정
                    </Button>
                </Paper>
            ))}
        </Container>
    )
}

export default Mypage;
