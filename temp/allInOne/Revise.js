import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Revise = () => {
    const [users, setUsers] = useState([]); // 전체 사용자 데이터

    // 모든 사용자 데이터를 수정할 상태
    const [editFormData, setEditFormData] = useState({});

    // 데이터 입력 변경 핸들러
    const handleInputChange = (userId, event) => {
        const { id, value } = event.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [userId]: {
                ...prevData[userId],
                [id]: value
            }
        }));
    };

    // 수정하기 버튼 클릭 핸들러
    const handleUpdate = (userId) => {
        const userData = editFormData[userId];

        axios.put(`/api/apart/${userId}`, userData) // PUT 요청을 사용하여 데이터 업데이트
            .then((response) => {
                console.log('폼이 성공적으로 제출되었습니다:', response.data);
                // 성공적인 업데이트 후 상태를 업데이트하거나 사용자에게 피드백 제공
            })
            .catch((error) => {
                console.error('폼 제출 중 오류가 발생했습니다:', error);
                // 오류 처리 (예: 오류 메시지 표시)
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
