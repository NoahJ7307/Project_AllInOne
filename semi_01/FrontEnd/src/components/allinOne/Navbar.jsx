import React from 'react';
import { AppBar, Box, Typography, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logout, Login, AddBox } from '@mui/icons-material';
import { Group } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RoofingIcon from '@mui/icons-material/Roofing';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import './Navbar.css';

const Navbar = () => {
    const [anchors, setAnchors] = useState([null, null]);
    const [aptName, setAptName] = useState('');
    const [scrollingDown, setScrollingDown] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        setAptName('올인원아파트');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setScrollingDown(currentScrollTop > lastScrollTop);
            setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    const handleMenuClick = (e, index) => {
        const newAnchors = [...anchors];
        newAnchors[index] = e.currentTarget;
        setAnchors(newAnchors);
    };

    const handleMenuClose = (index) => {
        const newAnchors = [...anchors];
        newAnchors[index] = null;
        setAnchors(newAnchors);
    };

    return (
        <AppBar className="app-bar" color='inherit'
            sx={{
                transition: 'transform 0.3s ease-in-out',
                transform: scrollingDown ? 'translateY(-100%)' : 'translateY(0)',
                position: 'relative',
            }}>
            <Link className="icons-container">
                <Link to="/login" className="icons-container">
                    <Login />
                    <Typography sx={{ mr: 1 }}>Login</Typography>
                </Link>
                <Link to="/register" className="icons-container">
                    <AddBox />
                    <Typography sx={{ mr: 1 }}>Join</Typography>
                </Link>
                <Link to="/my_page" className="icons-container">
                    <AccountBoxIcon />
                    <Typography sx={{ mr: 1 }}>MyPage</Typography>
                </Link>
                <Link to="/logout" className="icons-container">
                    <Logout />
                    <Typography sx={{ mr: 1 }}>Logout</Typography>
                </Link>
            </Link>
            <Typography variant="h6" sx={{ fontSize: '2rem', textAlign: 'center', margin: '10px 0' }} >{aptName}</Typography>
            <Box className="menu-links">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <RoofingIcon /> 홈
                </Link>
                <Box>
                    <Typography
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleMenuClick(e, 0)}
                        className="menu-icon"
                    >
                        <TimeToLeaveIcon /> 주차
                    </Typography>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchors[0]}
                        keepMounted
                        open={Boolean(anchors[0])}
                        onClose={() => handleMenuClose(0)}
                    >
                        <MenuItem onClick={() => handleMenuClose(0)} component={Link} to="/visitpark">
                            <EmojiTransportationIcon /> 예약 등록
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClose(0)} component={Link} to="/visitlist">
                            <CarCrashIcon /> 방문예약 관리
                        </MenuItem>
                    </Menu>
                </Box>
                <Box>
                    <Typography
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleMenuClick(e, 1)}
                        className="menu-icon"
                    >
                        <TouchAppIcon /> 커뮤니티
                    </Typography>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchors[1]}
                        keepMounted
                        open={Boolean(anchors[1])}
                        onClose={() => handleMenuClose(1)}
                    >
                        <MenuItem onClick={() => handleMenuClose(1)} component={Link} to="/study_res">
                            <AutoStoriesOutlinedIcon /> 독서실
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClose(1)} component={Link} to="/">
                            <FitnessCenterIcon /> 헬스장
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClose(1)} component={Link} to="/">
                            <SportsGolfIcon /> 골프
                        </MenuItem>
                    </Menu>
                </Box>
                <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Group /> 회원관리
                </Link>
            </Box>
        </AppBar>
    );
};

export default Navbar;
