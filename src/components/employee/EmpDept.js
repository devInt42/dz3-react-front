import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/EmpDept.module.css"

function EmpDept(props) {
    const baseUrl = 'http://localhost:8080';

    const [cWDdata, setCWDData] = useState({});
    const [employee, setEmployee] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [workplaceName, setWorkplaceName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [departmentSeq, setDepartmentSeq] = useState(0);
    const [mainCompanyYN, setMainCompanyYN] = useState("Y");
    const [mainDepartmentYN, setMainDepartmentYN] = useState("Y");

    useEffect(() => {
        axios.get(`${baseUrl}/department-employee/belong`, {
            params: {
                "employeeSeq": props.employeeSeq
            }
        })
            .then(res => setCWDData(res.data))
            .catch(error => console.log(error));

        axios.get(`${baseUrl}/employee/emplist/${props.employeeSeq}`)
            .then(res => setEmployee(res.data[0]))
            .catch(error => console.log(error));
            

        setMainCompanyYN(cWDdata.mainCompanyYN);
        setMainDepartmentYN(cWDdata.mainDepartmentYN);
    }, [props.employeeSeq])
    return (
        <div>
            <table className={style.dept_tbl}>
                <thead></thead>
                <tbody>
                    <tr>
                        <th>회사/부서</th>
                        <td colSpan={3}>{cWDdata.companyName}/{cWDdata.workplaceName}/{cWDdata.departmentName}</td>
                    </tr>
                    <tr>
                        <th>사번</th>
                        <td colSpan={3}>{employee.employeeCode}</td>
                    </tr>
                    <tr>
                        <th>회사구분</th>
                        <td>
                            <input type='radio'
                                name='main-company-yn'
                                value='Y'
                                onChange={(e) => { setMainCompanyYN(e.target.value); }} 
                                checked={mainCompanyYN === "Y" ? true : false} /><label>주회사</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='radio'
                                name='main-company-yn'
                                value='N'
                                onChange={(e) => { setMainCompanyYN(e.target.value) }} 
                                checked={mainCompanyYN === "N" ? true : false} /><label>부회사</label>
                        </td>
                        <th>부서구분</th>
                        <td>
                            <input type='radio'
                                name='main-department-yn'
                                value='Y'
                                onChange={(e) => { setMainDepartmentYN(e.target.value); }} 
                                checked={mainDepartmentYN === "Y" ? true : false} /><label>주부서</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='radio'
                                name='main-department-yn'
                                value='N'
                                onChange={(e) => { setMainDepartmentYN(e.target.value) }} 
                                checked={mainDepartmentYN === "N" ? true : false} /><label>부부서</label></td>
                    </tr>

                    <tr>
                        <th>직급</th>
                        <td>사원</td>
                        <th>직책</th>
                        <td>개발</td>
                    </tr>
                    <tr>
                        <th>재직구분</th>
                        <td colSpan={3}>재직</td>

                    </tr>

                    <tr>
                        <th>입사일</th>
                        <td>{employee.employeeJoin}</td>
                        <th>퇴사일</th>
                        <td>{employee.employeeLeave}</td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>{employee.employeePh}</td>
                        <th>팩스번호</th>
                        <td>01012345678</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colSpan={3}>{cWDdata.departmentLoc}</td>
                    </tr>
                    <tr>
                        <th>조직도</th>
                        <td colSpan={3}>사용</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmpDept;