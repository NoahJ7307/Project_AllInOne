import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import './BG.css';

const Logout = () => {
    return (
        <Container className='containerBGu' maxWidth={false}>
            <Box className='boxBGu' sx={{ width: '80%' }}>
                <Typography variant="h6" fontWeight={100} mb={1} style={{ textAlign: 'center' }}>
                    로그아웃 되었습니다
                </Typography>
            </Box>
        </Container>
    )
}

export default Logout