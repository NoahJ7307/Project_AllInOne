import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Revise = () => {
    const [users, setUsers] = useState([]);

    // 모든 사용자 데이터를 수정할 상태
    const [editFormData, setEditFormData] = useState({});

    // 데이터 입력 변경 핸들러
    const handleInputChange = (userMid, event) => {
        const { id, value } = event.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [userMid]: {
                ...prevData[userMid],
                [id]: id === 'dong' || id === 'ho' ? parseInt(value, 10) : value
            }
        }));
    };

    const handleUpdate = (userMid) => {
        const userData = editFormData[userMid];

        const dataToUpdate = {
            password: userData.password,
            carnumber: userData.carnumber,
            dong: userData.dong,
            ho: userData.ho,
            phonenumber: userData.phonenumber,
            mid: userMid
        };

        axios.put(`/api/apart/${userMid}`, dataToUpdate)
            .then((response) => {
                console.log('폼이 성공적으로 제출되었습니다:', response.data);
            })
            .catch((error) => {
                console.error('폼 제출 중 오류가 발생했습니다:', error);
            });
    };

    useEffect(() => {
        axios.get('/api/apart')
            .then(response => {
                setUsers(response.data);

                // editFormData 상태 초기화
                const initialFormData = {};
                response.data.forEach((user) => {
                    initialFormData[user.mid] = {
                        password: user.password,
                        carnumber: user.carnumber,
                        dong: user.dong,
                        ho: user.ho,
                        phonenumber: user.phonenumber
                    };
                });
                setEditFormData(initialFormData);
            })
            .catch(error => {
                console.error("사용자 정보를 가져오는 중 오류가 발생했습니다!", error);
            });
    }, []);

    return (
        <Container maxWidth="xs">

            {users.map((user) => (
                <Paper key={user.mid} style={{ padding: 16, marginBottom: 16 }}>
                    <Typography variant="h6" fontWeight={100} mb={2}>
                        나의 정보 수정
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="password"
                                label="비밀번호"
                                value={editFormData[user.mid]?.password || ''}
                                onChange={(event) => handleInputChange(user.mid, event)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                label="이름"
                                value={user.name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="carnumber"
                                label="자동차번호"
                                value={editFormData[user.mid]?.carnumber || ''}
                                onChange={(event) => handleInputChange(user.mid, event)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                label="주민번호"
                                value={user.residentNumber}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="dong"
                                label="동"
                                value={editFormData[user.mid]?.dong || ''}
                                onChange={(event) => handleInputChange(user.mid, event)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="ho"
                                label="호"
                                value={editFormData[user.mid]?.ho || ''}
                                onChange={(event) => handleInputChange(user.mid, event)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="phonenumber"
                                label="연락처"
                                value={editFormData[user.mid]?.phonenumber || ''}
                                onChange={(event) => handleInputChange(user.mid, event)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={() => handleUpdate(user.mid)}
                            >
                                수정하기
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Container>
    );
};

export default Revise;
