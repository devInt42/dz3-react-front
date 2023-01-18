import React, { useEffect, useState } from "react";
import axios from "axios";

function Dept() {

    const baseUrl = "http://localhost:8080";
    const [res, setRes] = useState("");

    const [dept, setDept] = useState([]);
    const [searchDept, setSearchDept] = useState([]);
    const [deptCode, setDeptCode] = useState("");
    const [deptName, setDeptName] = useState("");
    const [location, setlocation] = useState("");

    const selectDeptCode = (e) => {
        setDeptCode(e.target.value);
    };
    const insertName = (e) => {
        setDeptName(e.target.value);
    }
    const insertlocation = (e) => {
        setlocation(e.target.value);
    }

    useEffect(() => {
        axios.get(baseUrl + '/dept/deptlist').then(response => setDept(response.data)).catch(error => console.log(error))
    }, []);

    return (
        <div>
            {dept.map((dept, i) => {
                return (
                    dept && <div key={i}>
                        <div>부서코드 : {dept.dept_code}</div><br />
                        <div>부서명 : {dept.dept_name}</div><br />
                        <div>위치 : {dept.location}</div><br />
                        <button onClick={() => { deleteDept(dept.dept_code) }}>삭제</button>
                        부서수정 : <input type="text" onChange={insertName} />
                        위치수정 : <input type="text" onChange={insertlocation} />
                        <button onClick={() => { updateDept(dept.dept_code) }}>수정</button>
                        <hr />
                    </div>
                );
            })}

            부서명 : <input type="text" onChange={insertName} />
            위치 : <input type="text" onChange={insertlocation} />
            <button onClick={insertDept}>저장</button>
            부서조회<input type="text" onChange={selectDeptCode} />
            <button onClick={searchByDeptCode}>부서코드 조회</button>
            {
                searchDept.length == 0 ?
                    <>asdasd</> :
                    <div>
                        <h4>조회결과</h4>
                        부서코드 <div>{searchDept[0].dept_code}</div>
                        부서명 <div>{searchDept[0].dept_name}</div>
                        위치 <div>{searchDept[0].location}</div>
                    </div>
            }
        </div>
    );

    async function insertDept() {
        const url = baseUrl + "/dept";
        const data = {
            deptName: deptName,
            location: location
        }
        console.log(data)
        axios({
            method: "post",
            url: url,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then((res) => { setRes(res.data); }).catch((error) => { console.log(error); });
    }

    async function deleteDept(dept_code) {

        const url = baseUrl + "/dept/deptlist/" + dept_code;
        axios({
            method: "delete",
            url: url
        }).then((res) => { setRes(res.data); }).catch((error) => { console.log(error); });
    }

    function searchByDeptCode() {

        const url = baseUrl + "/dept/deptlist/" + deptCode;
        axios({
            method: "get",
            url: url
        }).then((res) => {
            setSearchDept(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function updateDept(dept_code) {
        const url = baseUrl + "/dept/deptlist/" + dept_code;
        const data = {
            dept_code: dept_code,
            dept_name: deptName,
            location: location
        }
        axios({
            method: "patch",
            url: url,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then((res) => { setRes(res.data); }).catch((error) => { console.log(error); });
    }
}

export default Dept;