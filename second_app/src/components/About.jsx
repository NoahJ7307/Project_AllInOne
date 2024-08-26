import axios from 'axios'
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const About = () => {
    const [formData, setFormData] = useState({
        'korea': '', math: '', eng: '', name: ""
    })
    const [responseMessage, setResponseMessage] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
            //이 코드는 name이 {객체의 기존데이터의 key:value 쌍에서 korea : 30, math :70 ,eng:99 가 추가됨 }
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        // 아래는 promise 패턴, 성공하면  then으로 들어오고 실패하면 catch로 들어옴 , 이후 버전에서 async await가 나옴 
        axios.post('/api/submit', formData)
            .then(res => {
                var { data } = res;
                console.log(data);//backend에서 데이터가 잘 들어와요 
                setResponseMessage(data)
            }).catch(e => {
                console.log("실패했어요 ");
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름</label>
                    <input type="text" name='name'

                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="korea">국어</label>
                    <input type="text" name='korea'
                        value={FormData.korea}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="math">수학</label>
                    <input type="text" name='math'
                        value={FormData.math}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="eng">영어</label>
                    <input type="text" name='eng'
                        value={FormData.eng}
                        onChange={handleChange} />
                </div>
                <button type='submit'>등록</button>
            </form>
            <hr />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">이름</TableCell>
                            <TableCell align="right">국어</TableCell>
                            <TableCell align="right">수학</TableCell>
                            <TableCell align="right">영어</TableCell>
                            <TableCell align="right">총점</TableCell>
                            <TableCell align="right">평균</TableCell>
                            <TableCell align="right">등급</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {responseMessage.map((row, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.korea}
                                </TableCell>
                                <TableCell align="right">{row.math}</TableCell>
                                <TableCell align="right">{row.eng}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                <TableCell align="right">{row.avg}</TableCell>
                                <TableCell align="right">{row.grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default About