import { AppBar, Avatar, Badge, Box, Menu, MenuItem, Toolbar, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import Pets from '@mui/icons-material/Pets';
import { Mail, Notifications } from '@mui/icons-material';
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
                    <Badge badgeContent={4} color='error'>
                        <Mail />
                    </Badge>
                    <Badge badgeContent={2} color='error'>
                        <Notifications />
                    </Badge>
                    <Avatar sx={{ width: 30, height: 30 }}
                        src='https://images.pexels.com/photos/16554872/pexels-photo-16554872.jpeg?auto=compress&cs=tinysrgb&w=600' onClick={e => setOpen(true)} />
                </Icons>
                <UserBox onClick={e => setOpen(false)}>
                    <Avatar sx={{ width: 30, height: 30 }}
                        src='https://images.pexels.com/photos/16554872/pexels-photo-16554872.jpeg?auto=compress&cs=tinysrgb&w=600'

                    />
                    <Typography variant='span'> John</Typography>
                </UserBox>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby='demo-positioned-button'
                open={open}
                onClose={e => setOpen(false)}
                anchorOrigin={{
                    vertical: "top", horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top", horizontal: "right"
                }}>
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
                <MenuItem >Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}

export default Navbar