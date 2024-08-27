import { ExpandLess, ExpandMore, Group } from '@mui/icons-material'
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RoofingIcon from '@mui/icons-material/Roofing';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';


const Sidebar = () => {
    const [openCar, setOpenCar] = useState(false);

    const handleClickCar = () => {
        setOpenCar(!openCar);
    };
    const [openCommunity, setOpenCommunity] = useState(false);

    const handleClickCommunity = () => {
        setOpenCommunity(!openCommunity);
    };
    return (
        <Box bgcolor="skyblue" flex={1} p={2} sx={{
            display: {
                xs: "none",
                sm: "block"
            }
        }} >
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <RoofingIcon />
                        </ListItemIcon>
                        <ListItemText primary="홈" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/about" onClick={handleClickCar}>
                        <ListItemIcon>
                            <TimeToLeaveIcon />
                        </ListItemIcon>
                        <ListItemText primary="주차" />
                        {openCar ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openCar} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/visitpark">
                                <EmojiTransportationIcon />
                                <ListItemText primary="예약 등록" sx={{ pl: 4 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/visitlist">
                                <CarCrashIcon />
                                <ListItemText primary="방문예약 관리" sx={{ pl: 4 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/about" onClick={handleClickCommunity}>
                        <ListItemIcon>
                            <TouchAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="커뮤니티" />
                        {openCommunity ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openCommunity} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/study_res">
                                <AutoStoriesOutlinedIcon />
                                <ListItemText primary="독서실" sx={{ pl: 4 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/">
                                <FitnessCenterIcon />
                                <ListItemText primary="헬스장" sx={{ pl: 4 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/">
                                <SportsGolfIcon />
                                <ListItemText primary="골프" sx={{ pl: 4 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/user">
                        <ListItemIcon>
                            <Group />
                        </ListItemIcon>
                        <ListItemText primary="회원 관리" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

export default Sidebar