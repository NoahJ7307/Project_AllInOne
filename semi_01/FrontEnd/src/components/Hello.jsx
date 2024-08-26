import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Hello = () => {
    const f = async () => {
        const res = await axios.get("/api/hello")
        console.log(res);
        var { data } = res;
        console.log(data);
    }
    return (
        <div>
            <Link to="/about">
                <button onClick={f}>백엔드로 가라</button>
            </Link>

        </div>
    )
}

export default Hello