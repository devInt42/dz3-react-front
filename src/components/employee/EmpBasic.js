import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/EmpBasic.module.css"

function EmpBasic(props) {

    const baseUrl = "http://localhost:8080";
    const [empSelected, setEmpSelected] = useState([]);
    useEffect(() => {
        axios
            .get(baseUrl + "/employee/emplist/" + props.employeeSeq)
            .then((response) => setEmpSelected(response.data[0]))
            .catch((error) => console.log(error));
    }, [props.employeeSeq]);

    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeBirth, setEmployeeBirth] = useState("");
    const [employeePwd, setEmployeePwd] = useState("");
    const [employeePh, setEmployeePh] = useState("");
    const [employeePmail, setEmployeePmail] = useState("");
    const [employeeCmail, setEmployeeCmail] = useState("");
    const [employeeAddr, setEmployeeAddr] = useState("");

    useEffect(()=>{
        if(props.employeeSeq > 0){
            setEmployeeId(empSelected.employeeId);
            setEmployeeName(empSelected.employeeName);
            setEmployeeBirth(empSelected.employeeBirth);
            setEmployeePwd(empSelected.employeePwd);
            setEmployeePh(empSelected.employeePh);
            setEmployeePmail(empSelected.employeePmail);
            setEmployeeCmail(empSelected.employeeCmail);
            setEmployeeAddr(empSelected.employeeAddr);
        }
    }, [empSelected])

    const insertEmployeeName = (e) => {
        setEmployeeName(e.target.value);
      };

    return (
        <div>
            <table className={style.basic_tbl}>
                <thead></thead>
                <tbody>
                    <tr>
                        <th>사진</th>
                        <td colSpan={3}>content</td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td colSpan={3}>
                            <input type="text" value={employeeName || ""} onChange={insertEmployeeName}/>
                        </td>
                    </tr>
                    <tr>
                        <th>로그인 ID</th>
                        <td>
                            <input type="text" value={employeeId || ""} onChange={insertEmployeeName}/>
                        </td>
                        <th>메일 ID</th>
                        <td>
                            <input type="text" value={employeeCmail || ""} onChange={insertEmployeeName}/>
                        </td>
                    </tr>
                    <tr>
                        <th>로그인 비밀번호</th>
                        <td>
                            <input type="text" value={employeePwd || ""} onChange={insertEmployeeName}/>
                        </td>
                        <th>결제 비밀번호</th>
                        <td>password</td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>man</td>
                        <th>사용언어</th>
                        <td>Korea</td>
                    </tr>
                    <tr>
                        <th>개인메일</th>
                        <td colSpan={3}>
                            <input type="text" value={employeePmail || ""} onChange={insertEmployeeName}/>
                        </td>
                    </tr>
                    <tr>
                        <th>급여메일</th>
                        <td colSpan={3}>email</td>
                    </tr>
                    <tr>
                        <th>휴대전화</th>
                        <td>
                            <input type="text" value={employeePh || ""} onChange={insertEmployeeName}/>
                        </td>
                        <th>전화번호(집)</th>
                        <td>call</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colSpan={3}>
                            <input type="text" value={employeeAddr || ""} onChange={insertEmployeeName}/>
                        </td>
                    </tr>
                    <tr>
                        <th>최초 입사일</th>
                        <td>join</td>
                        <th>최종 퇴사일</th>
                        <td>leave</td>
                    </tr>
                    <tr>
                        <th>라이선스</th>
                        <td colSpan={3}>license</td>
                    </tr>
                    <tr>
                        <th>계정사용</th>
                        <td>use</td>
                        <th>모바일사용</th>
                        <td>mobile</td>
                    </tr>
                </tbody>
            </table>
            {/* {empSelected.map((emp, i) => {
                
                return(
                    <div key={emp.employeeSeq}>
                        <div>{emp.employeeCode}</div>
                        <div>{emp.employeeId}</div>
                        <div>{emp.employeeName}</div>
                        <div>{emp.employeeBirth}</div>
                        <div>{emp.employeePwd}</div>
                        <div>{emp.employeePh}</div>
                        <div>{emp.employeePmail}</div>
                        <div>{emp.employeeCmail}</div>
                        <div>{emp.employeeAddr}</div>
                    </div>
                )
            })} */}
        </div>
    );
}

export default EmpBasic;