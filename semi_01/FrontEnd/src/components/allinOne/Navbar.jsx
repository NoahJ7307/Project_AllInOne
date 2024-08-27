import { AppBar, Box, Toolbar, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Pets from '@mui/icons-material/Pets';
import { Logout, Login, AddBox } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import axios from 'axios';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


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

    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('/api/apart')
            .then(response => {
                console.log(response);
                setUsers(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, []);
    return (
        <AppBar position='sticky' >
            <StyledToolbar >
                <Typography variant='h6' sx={{
                    display: {
                        xs: "none", sm: "block"
                    }
                }}>{users.length > 0 ? users.find(i => i.id === 3)?.mid || 'ID 없음' : 'Data 없음'}</Typography>
                <Pets sx={{
                    display: {
                        xs: "block", sm: "none"
                    }
                }} />
                <Icons>
                    <Link to="/login" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ mr: 1 }}>Login</Typography>
                        <Login />
                    </Link>
                    <Link to="/register" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ mr: 1 }}>Join</Typography>
                        <AddBox />
                    </Link>
                    <Link to="/my_page" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ mr: 1 }}>MyPage</Typography>
                        <AccountBoxIcon />
                    </Link>
                    <Link to="/logout" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ mr: 1 }}>Logout</Typography>
                        <Logout />
                    </Link>
                </Icons>
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar