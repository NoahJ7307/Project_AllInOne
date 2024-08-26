import { Button, Typography, styled } from '@mui/material'
import React from 'react'
import { Add, Settings } from "@mui/icons-material"
const Sunho = () => {
    const BlueButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.otherColor.main,
        color: "#888",
        margin: 500,
        "&:hover": {
            backgroundColor: "lightblue"
        },
        "&:disable": {
            backgroundColor: "gray",
            color: "white"
        }
    }))
    return (
        <div>
            <Button variant='text'>Text</Button>
            <Button startIcon={<Settings />}
                variant='contained'
                color='vv'
                size='small'>Settings</Button>
            <Button startIcon={<Add />}
                variant='contained'
                color='primary'
                size='small'>Add new post</Button>
            <Button variant='outlined'>outlined</Button>
            <Typography variant='h4' component='p'>

            </Typography>
            <BlueButton>My Unique Button</BlueButton>
            <BlueButton>Your  Unique Button</BlueButton>
            <button disabled></button>
        </div>
    )
}

export default Sunho