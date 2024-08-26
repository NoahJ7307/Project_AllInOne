import { AppBar, Avatar, Badge, Box, Menu, MenuItem, Toolbar, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import Pets from '@mui/icons-material/Pets';
import { Logout, Login, AddBox } from '@mui/icons-material';
import { Link } from 'react-router-dom'


const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})
const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40px"
}))
const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}))
const UserBox = styled(Box)(({ theme }) => ({
    display: "flex", gap: "10px", alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))
const Navbar = () => {
    const [open, setOpen] = useState(false)
    return (
        <AppBar position='sticky'>
            <StyledToolbar >
                <Typography variant='h6' sx={{
                    display: {
                        xs: "none", sm: "block"
                    }
                }}>그린 아카데미 프로젝트</Typography>
                <Pets sx={{
                    display: {
                        xs: "block", sm: "none"
                    }
                }} />
                <Icons>
                    <Login />
                    <AddBox />
                    <Logout />
                </Icons>
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar