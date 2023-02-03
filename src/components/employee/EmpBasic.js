import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/EmpBasic.module.css"

import { BsFilePerson } from "react-icons/bs";

import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

function EmpBasic(props) {

    const baseUrl = "http://localhost:8080";
    const [empSelected, setEmpSelected] = useState([]);
    useEffect(() => {
        axios
            .get(baseUrl + "/employee/emplist/" + props.employeeSeq)
            .then((response) => setEmpSelected(response.data[0]))
            .catch((error) => console.log(error));
    }, [props.employeeSeq]);

    const [lang, setLang] = useState([]);
    useEffect(() => {
        axios
            .get(baseUrl + "/employee/emplang")
            .then((response) => setLang(response.data))
            .catch((error) => console.log(error));
    }, []);

    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeBirth, setEmployeeBirth] = useState("");
    const [employeePwd, setEmployeePwd] = useState("");
    const [employeePh, setEmployeePh] = useState("");
    const [employeePmail, setEmployeePmail] = useState("");
    const [employeeCmail, setEmployeeCmail] = useState("");
    const [employeeAddr, setEmployeeAddr] = useState("");
    const [employeeJoin, setEmployeeJoin] = useState("");
    const [employeeLeave, setEmployeeLeave] = useState("");
    const [employeeGender, setEmployeeGender] = useState("");
    const [employeeLanguage, setEmployeeLanguage] = useState("");
    const [useYN, setUseYN] = useState(true);
    const [employeeHcall, setEmployeeHcall] = useState("");
    const [approvalPwd, setApprovalPwd] = useState("");

    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const [checked2, setChecked2] = useState(true);
    const handleChange2 = (e) => {
        setChecked2(e.target.checked);
    };

    useEffect(() => {
        if (props.employeeSeq > 0) {
            setEmployeeId(empSelected.employeeId);
            setEmployeeName(empSelected.employeeName);
            setEmployeeBirth(empSelected.employeeBirth);
            setEmployeePwd(empSelected.employeePwd);
            setEmployeePh(empSelected.employeePh);
            setEmployeePmail(empSelected.employeePmail);
            setEmployeeCmail(empSelected.employeeCmail);
            setEmployeeAddr(empSelected.employeeAddr);
            setEmployeeJoin(empSelected.employeeJoin);
            setEmployeeLeave(empSelected.employeeLeave);
            setEmployeeGender(empSelected.employeeGender);
            setEmployeeLanguage(empSelected.employeeLanguage);
            setEmployeeHcall(empSelected.employeeHcall);
            setApprovalPwd(empSelected.approvalPwd);
            if (empSelected.useYN == "1") {
                setUseYN(true);
            } else { setUseYN(false); }
        }
    }, [empSelected])

    const label = { inputProps: { 'aria-label': 'Size switch demo' } };
    console.log(employeeGender)


    return (
        <div>
            <table className={style.basic_tbl}>
                <thead></thead>
                <tbody>
                    <tr>
                        <th>사진</th>
                        <td colSpan={3}>
                            <BsFilePerson style={{ width: "40px", height: "40px" }} />
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td colSpan={3}>
                            <input type="text" className={style.emp_input} value={employeeName || ""} onChange={(e) => { setEmployeeName(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <th>로그인 ID</th>
                        <td>
                            <input type="text" className={style.emp_input} value={employeeId || ""} onChange={(e) => { setEmployeeId(e.target.value) }} />
                        </td>
                        <th>메일 ID</th>
                        <td>
                            <input type="text" className={style.emp_input} value={employeeCmail || ""} onChange={(e) => { setEmployeeCmail(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <th>로그인 비밀번호</th>
                        <td>{checked ?
                            <input type="text" className={style.emp_pwd} value={employeePwd || ""}
                                onChange={(e) => { setEmployeePwd(e.target.value) }} autoComplete="off" /> :
                            <input type="password" className={style.emp_pwd} value={employeePwd || ""}
                                onChange={(e) => { setEmployeePwd(e.target.value) }} autoComplete="current-password" />
                        }
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            />비밀번호 표시
                        </td>
                        <th>결재 비밀번호</th>
                        <td>
                        {checked2 ?
                            <input type="text" className={style.emp_pwd} value={approvalPwd || ""}
                                onChange={(e) => { setApprovalPwd(e.target.value) }} autoComplete="off" /> :
                            <input type="password" className={style.emp_pwd} value={approvalPwd || ""}
                                onChange={(e) => { setApprovalPwd(e.target.value) }} autoComplete="current-password" />
                        }
                            <Checkbox
                                checked={checked2}
                                onChange={handleChange2}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            />비밀번호 표시
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <div className={style.emp_input_gender}>
                                <input type='radio'
                                    name='gender'
                                    value='남'
                                    onChange={(e) => { setEmployeeGender(e.target.value) }} checked={employeeGender == '남' || ""} /><label>남</label>
                                <input type='radio'
                                    name='gender'
                                    value='여'
                                    onChange={(e) => { setEmployeeGender(e.target.value) }} checked={employeeGender == '여' || ""} /><label>여</label>
                            </div>
                            {/* <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value='남' control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 16,},}}/>}
                                        onChange={(e) => { setEmployeeGender(e.target.value) }} checked={employeeGender == '남'} label="남" />
                                    <FormControlLabel value='여' control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 16,},}}/>}
                                        onChange={(e) => { setEmployeeGender(e.target.value) }} checked={employeeGender == '여'} label="여" />
                                </RadioGroup>
                            </FormControl> */}
                        </td>
                        <th>사용언어</th>
                        <td>
                            <select onChange={(e) => { setEmployeeLanguage(e.target.value) }} value={employeeLanguage || ""}>
                                {lang && lang.map((lang, i) => (
                                    <option value={lang} key={i}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>개인메일</th>
                        <td colSpan={3}>
                            <input type="text" className={style.emp_input} value={employeePmail || ""} onChange={(e) => { setEmployeePmail(e.target.value) }} />
                        </td>
                    </tr>

                    <tr>
                        <th>휴대전화</th>
                        <td>
                            <input type="text" className={style.emp_input} value={employeePh || ""} onChange={(e) => { setEmployeePh(e.target.value) }} />
                        </td>
                        <th>전화번호(집)</th>
                        <td>call</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colSpan={3}>
                            <input type="text" className={style.emp_input} value={employeeAddr || ""} onChange={(e) => { setEmployeeAddr(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <th>최초 입사일</th>
                        <td>
                            <input type="date" value={employeeJoin || ""} onChange={(e) => { setEmployeeJoin(e.target.value) }} />
                        </td>
                        <th>최종 퇴사일</th>
                        <td>
                            <input type="date" value={employeeLeave || ""} onChange={(e) => { setEmployeeLeave(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <th>계정사용</th>
                        <td colSpan={3}>
                            <Switch {...label} size="small"
                                checked={useYN || false}
                                onChange={() => { setUseYN(!useYN) }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />&nbsp;{useYN ? <span style={{ fontSize: "12px", fontWeight: "bold" }}>사용</span> : <span>미사용</span>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmpBasic;
