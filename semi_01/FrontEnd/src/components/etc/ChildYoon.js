import React from 'react'
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
const ChildYoon = () => {//자식 Components 
    var list = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => [<AddBoxRoundedIcon />,
    <AddBoxRoundedIcon />
    ]),
    <AccountBalanceRoundedIcon />,
    <AddCommentRoundedIcon />]
    var list7 = []
    for (var i = 0; i < 150; i++) {
        if (i % 5 !== 0) list7.push(<div><AddCommentRoundedIcon /><br /> </div>)
        else list7.push((
            <div>
                <br />
                <AddCommentRoundedIcon /><hr style={{ 'background-color': 'red', height: '1px', border: 0 }} />
            </div>))
    }// 5의 배수에서 horizontal line으로 구별하고 싶어요 
    return (
        <div>
            <Stack spacing={3} direction="column">
                <Button variant="text" startIcon={<DeleteIcon />}>Text</Button>
                <Button variant="contained" color="secondary" size="medium">Contained</Button>
                <Button variant="outlined" disabled>Outlined</Button>
                <Button variant="outlined" startIcon={<CloudUploadIcon />}  >파일 업로드</Button>

            </Stack>
            <Stack direction="row">
                {list.map(i => i)}
            </Stack>
            <Stack direction="row">
                {
                    list7.map(i => i)
                }
            </Stack>
            <hr />
        </div>
    )
}

export default ChildYoon