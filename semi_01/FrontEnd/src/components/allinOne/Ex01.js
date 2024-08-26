import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        mid: '',
        password: '',
        carnumber: '',
        name: '',
        birth: 0,
        dong: 0,
        ho: 0,
        phonenumber: '',
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const apiUrl = '/api/apart';

        axios.post(apiUrl, formData)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);

            })
            .catch((error) => {
                console.error('There was an error submitting the form:', error);
            });
    };

    return (
        <Box
            component="form"
            sx={{
                flex: 4, p: 2,
                '& .MuiTextField-root': { m: 1 },
                height: '100vh'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField
                    required
                    id="mid"
                    label="아이디"
                    value={formData.mid}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    required
                    id="password"
                    label="비밀번호"
                    value={formData.password}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    required
                    id="name"
                    label="이름"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    required
                    id="carnumber"
                    label="차번호"
                    value={formData.carnumber}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>

            <div>
                <TextField
                    required
                    id="birth"
                    label="나이"
                    value={formData.birth}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>

            <div>
                <TextField
                    required
                    id="dong"
                    label="동"
                    value={formData.dong}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>

            <div>
                <TextField
                    required
                    id="ho"
                    label="호"
                    value={formData.ho}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    required
                    id="phonenumber"
                    label="전화번호"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                    fullWidth
                />
            </div>
            <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                등록
            </Button>
        </Box>
    );
};

export default UserForm;
