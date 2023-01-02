import React, { useEffect, useState } from "react";
import axios from "axios";

function Dept() {

    const baseUrl = "http://localhost:8080";

    const [user2, setUser2] = useState([]);
    useEffect(() => {
        axios.get(baseUrl + '/dept/deptlist').then(response => setUser2(response.data)).catch(error => console.log(error))
    }, []);
    console.log(user2)
    return (
        <div>
            {user2.map((user2, i) => {
                return (
                    <div key={i}>
                        <div>부서코드 : {user2.dept_code}</div><br />
                        <div>부서명 : {user2.dept_name}</div><br />
                        <div>위치 : {user2.location}</div><br />
                        <hr />
                    </div>
                );
            })}


        </div>
    );
}

export default Dept;