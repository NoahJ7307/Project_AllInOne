import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        address: '',
        phone: '',
        age:0,
        familyNumber:0
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const apiUrl = '/api/users';

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
                <TextField
                    required
                    id="id"
                    label="아이디"
                    value={formData.id}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    required
                    id="name"
                    label="이름"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    required
                    id="address"
                    label="주소"
                    value={formData.address}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    required
                    id="phone"
                    label="전화번호"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    required
                    id="age"
                    label="나이"
                    value={formData.age}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <TextField
                    required
                    id="familyNumber"
                    label="가족 수"
                    value={formData.familyNumber}
                    onChange={handleInputChange}
                />
            </div>
            <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                등록
            </Button>
        </Box>
    );
};

export default UserForm;
