import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import EmpBasicSaveAlert from "../alert/EmpBasicSaveAlert";
import EmpBasicSaveFailAlert from "../alert/EmpBasicSaveFailAlert";
import EmpBasicUpdateAlert from "../alert/EmpBasicUpdateAlert";
import EmpBasicUpdateFailAlert from "../alert/EmpBasicUpdateFailAlert";
import EmpBasicDeleteAlert from "../alert/EmpBasicDeleteAlert";
import ZippopupPostCode from "./zipcode/ZippopupZipCode";
import ZippopupDom from "./zipcode/ZippopupDom";

import style from "./css/EmpBasic.module.css";

import { BsFilePerson } from "react-icons/bs";
import { FcPlus } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import "./css/EmpLnb.css";

import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

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

    const [employeeSeq, setEmployeeSeq] = useState(0);
    const [employeeCode, setEmployeeCode] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeBirth, setEmployeeBirth] = useState("");
    const [employeePwd, setEmployeePwd] = useState("");
    const [employeePh, setEmployeePh] = useState("");
    const [employeePmail, setEmployeePmail] = useState("");
    const [pmailDomain, setPmailDomain] = useState("");
    const [pmailId, setPmailId] = useState("");
    const [employeeCmail, setEmployeeCmail] = useState("");
    const [employeeAddr, setEmployeeAddr] = useState("");
    const [firstAddr, setFirstAddr] = useState("");
    const [addrCode, setAddrCode] = useState("");
    const [detailedAddr, setDetailedAddr] = useState("");
    const [employeeJoin, setEmployeeJoin] = useState("");
    const [employeeLeave, setEmployeeLeave] = useState(null);
    const [employeeGender, setEmployeeGender] = useState("");
    const [employeeLanguage, setEmployeeLanguage] = useState("");
    const [useYN, setUseYN] = useState(true);
    const [employeeHcall, setEmployeeHcall] = useState("");
    const [approvalPwd, setApprovalPwd] = useState("");
    const [firstId, setFirstId] = useState("");
    const [FirstMail, setFirstMail] = useState("");

    const [zipcodeIsOpen, setZipcodeIsOpen] = useState();

    // 비밀번호 표시 미표시 사용할 때 사용함수
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const [checked2, setChecked2] = useState(true);
    const handleChange2 = (e) => {
        setChecked2(e.target.checked);
    };

    // employee값 불러와서 세팅
    useEffect(() => {
        if (props.employeeSeq > 0) {
            setEmployeeSeq(empSelected.employeeSeq);
            setEmployeeCode(empSelected.employeeCode);
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
            setFirstId(empSelected.employeeId);
            setFirstMail(empSelected.employeeCmail);
            if (empSelected.useYN == "Y") {
                setUseYN(true);
            } else {
                setUseYN(false);
            }
            if (empSelected.employeePmail != "" && empSelected.employeePmail != undefined) {
                let emailtmp = empSelected.employeePmail.split("@");
                setPmailId(emailtmp[0])
                setPmailDomain(emailtmp[1])
            }
            if(empSelected.employeeAddr != "" &&  empSelected.employeeAddr != undefined){
                let addrtmp = empSelected.employeeAddr.split("/");
                setAddrCode(addrtmp[0]);
                setFirstAddr(addrtmp[1]);
                setDetailedAddr(addrtmp[2]);
            }
        }
    }, [empSelected]);

    // 계정 사용 미사용 여부
    const [useEmp, setUseEmp] = useState("");
    useEffect(() => {
        if (useYN) {
            setUseEmp("Y");
        } else {
            setUseEmp("N");
        }
    }, [useYN]);

    const label = { inputProps: { "aria-label": "Size switch demo" } };

    // 신규 입사자 등록 시 인풋박스 초기화
    const newSave = () => {
        setEmployeeCode("");
        setEmployeeBirth("");
        setEmployeeName("");
        setEmployeePwd("");
        setEmployeePh("");
        setEmployeeId("");
        setEmployeePmail("");
        setEmployeeCmail("");
        setEmployeeAddr("");
        setEmployeeHcall("");
        setApprovalPwd("");
        setEmployeeGender("");
        setEmployeeLanguage("");
        setEmployeeJoin("");
        setEmployeeLeave("");
        setFirstId("");
        setFirstMail("");
        setPmailDomain("");
        setPmailId("");
        setFirstAddr("");
        setAddrCode("");
        setDetailedAddr("");
        props.clickEmp();
        props.setSelectAct(true);
    };

    // 저장 필수값 검사
    const [insertCheck, setInsertCheck] = useState(false);
    const [insertFail, setInsertFail] = useState();
    function insertValid() {
        if (
            employeeBirth.length == 0 ||
            employeeName.length == 0 ||
            employeePwd.length == 0 ||
            approvalPwd.length == 0 ||
            employeeJoin.length == 0
        ) {
            setInsertFail(<EmpBasicSaveFailAlert setInsertCheck={setInsertCheck} />);
        } else {
            setInsertCheck(true);
        }
    }

    // 수정 필수값 검사
    const [updateCheck, setUpdateCheck] = useState(false);
    const [updateFail, setUpdateFail] = useState();
    function updateValid() {
        if (
            employeeBirth.length == 0 ||
            employeeName.length == 0 ||
            employeePwd.length == 0 ||
            approvalPwd.length == 0 ||
            employeeJoin.length == 0
        ) {
            setUpdateFail(
                <EmpBasicUpdateFailAlert setUpdateCheck={setUpdateCheck} />
            );
        } else {
            if (employeeId == "") setReturnId([]);
            if (employeeCmail == "") setReturnCmail([]);
            setUpdateCheck(true);
        }
    }

    const [deleteCheck, setDeleteCheck] = useState(false);
    function deleteValid() {
            setDeleteCheck(true);
    }

    // 로그인ID 중복체크
    useEffect(() => {
        if (employeeId != "" && employeeId != undefined) idCheck();
    }, [employeeId]);

    const [returnId, setReturnId] = useState([]);
    const idCheck = async () => {
        try {
            let idRes = await axios.get(`${baseUrl}/employee/emplist/checkid`, {
                params: { employeeId: employeeId },
            });
            setReturnId(idRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    // 메일ID 중복체크
    useEffect(() => {
        if (employeeCmail != "" && employeeCmail != undefined)
            cmailCheck();
    }, [employeeCmail]);

    const [returnCmail, setReturnCmail] = useState([]);
    const cmailCheck = async () => {
        try {
            let cmailRes = await axios.get(`${baseUrl}/employee/emplist/checkcmail`, {
                params: { employeeCmail: employeeCmail },
            });
            setReturnCmail(cmailRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h5 style={{ display: "inline" }}>사원 상세</h5>
            <span style={{ float: "right" }} onClick={() => {newSave(); props.setEmpSeq(0)}}>
                <FcPlus />&nbsp;
                신규 입사자 등록
            </span>
            <table className={style.basic_tbl}>
                <thead></thead>
                <tbody>
                    <tr>
                        <th rowSpan={2}>사진</th>
                        <td rowSpan={2}>
                            {/* <BsFilePerson style={{ width: "40px", height: "40px" }} /> */}
                            <img src={process.env.PUBLIC_URL + "/empimg.png"}
                                style={{ width: "60px", height: "60px" }} />
                        </td>
                        <th>* 이름</th>
                        <td>
                            <input
                                type="text"
                                className={style.emp_input}
                                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                                value={employeeName || ""}
                                onChange={(e) => {
                                    setEmployeeName(e.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>* 생년월일</th>
                        <td>
                            <input
                                type="date"
                                value={employeeBirth || ""}
                                onChange={(e) => {
                                    setEmployeeBirth(e.target.value);
                                }}
                                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>로그인 ID</th>
                        <td>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    className={style.emp_input}
                                    value={employeeId || ""}
                                    style={{ backgroundColor: "rgba(175, 174, 174, 0.328)" }}
                                    onChange={(e) => {
                                        setEmployeeId(e.target.value);
                                    }}
                                    autoComplete="off"
                                    isValid={
                                        employeeId != "" ? firstId == employeeId ? true : (returnId.length > 0 ? false : true) : false
                                    }
                                    isInvalid={
                                        employeeId != "" ? firstId == employeeId ? false : (returnId.length > 0 ? true : false) : true
                                    }
                                />
                                {firstId == employeeId ? <Form.Control.Feedback type="valid">현재 로그인 ID 입니다.</Form.Control.Feedback> :
                                    employeeId != "" && employeeId != undefined &&
                                    <>
                                        <Form.Control.Feedback type="valid">
                                            사용 가능한 ID 입니다.
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            중복된 아이디가 존재합니다.
                                        </Form.Control.Feedback> </>}
                            </Form.Group>
                        </td>
                        <th>메일 ID</th>
                        <td>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    className={style.emp_input}
                                    value={employeeCmail || ""}
                                    style={{ backgroundColor: "rgba(175, 174, 174, 0.328)" }}
                                    onChange={(e) => {
                                        setEmployeeCmail(e.target.value);
                                    }}
                                    autoComplete="off"
                                    isValid={
                                        employeeCmail != "" ? FirstMail == employeeCmail ? true : (returnCmail.length > 0 ? false : true) : false
                                    }
                                    isInvalid={
                                        employeeCmail != "" ? FirstMail == employeeCmail ? false : (returnCmail.length > 0 ? true : false) : true
                                    }
                                />
                                {FirstMail == employeeCmail ? <Form.Control.Feedback type="valid">현재 메일 ID 입니다.</Form.Control.Feedback> :
                                    employeeCmail != "" && employeeCmail != undefined && <>
                                        <Form.Control.Feedback type="valid">
                                            사용 가능한 메일입니다.
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            중복된 메일이 존재합니다.
                                        </Form.Control.Feedback></>}
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <th>* 로그인 비밀번호</th>
                        <td>

                            <input
                                type="password"
                                className={style.emp_pwd}
                                value={employeePwd || ""}
                                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                                onChange={(e) => {
                                    setEmployeePwd(e.target.value);
                                }}
                                autoComplete="off"
                            />
                            {/* {checked ? (
                            ) : (
                                <input
                                    type="text"
                                    className={style.emp_pwd}
                                    value={employeePwd || ""}
                                    style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                                    onChange={(e) => {
                                        setEmployeePwd(e.target.value);
                                    }}
                                    autoComplete="current-password"
                                />
                            )}
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                            />
                            비밀번호 표시 */}
                        </td>
                        <th>* 결재 비밀번호</th>
                        <td>

                            <input
                                type="password"
                                className={style.emp_pwd}
                                value={approvalPwd || ""}
                                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                                onChange={(e) => {
                                    setApprovalPwd(e.target.value);
                                }}
                                autoComplete="off"
                            />
                            {/* {checked2 ? (
                            ) : (
                                <input
                                    type="text"
                                    className={style.emp_pwd}
                                    value={approvalPwd || ""}
                                    style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                                    onChange={(e) => {
                                        setApprovalPwd(e.target.value);
                                    }}
                                    autoComplete="current-password"
                                />
                            )}
                            <Checkbox
                                checked={checked2}
                                onChange={handleChange2}
                                inputProps={{ "aria-label": "controlled" }}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                            />
                            비밀번호 표시 */}
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <div className={style.emp_input_gender}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="남"
                                    onChange={(e) => {
                                        setEmployeeGender(e.target.value);
                                    }}
                                    checked={employeeGender == "남" || ""}
                                />
                                <label>남</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="여"
                                    onChange={(e) => {
                                        setEmployeeGender(e.target.value);
                                    }}
                                    checked={employeeGender == "여" || ""}
                                />
                                <label>여</label>
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
                            <select
                                onChange={(e) => {
                                    setEmployeeLanguage(e.target.value);
                                }}
                                value={employeeLanguage || ""}
                            >
                                {lang &&
                                    lang.map((lang, i) => (
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
                            <input
                                type="text"
                                className={style.emp_input}
                                style={{ width: "45%" }}
                                // value={employeePmail || ""}
                                value={pmailId || ""}
                                onChange={(e) => {
                                    setPmailId(e.target.value);
                                }}
                            />&nbsp;&nbsp;<MdAlternateEmail style={{ width: "20px", height: "20px" }} />&nbsp;&nbsp;
                            <Form.Select size="sm" style={{ width: "45%", display: "inline" }}
                                value={pmailDomain || ""}
                                onChange={(e) => setPmailDomain(e.target.value)}>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="kokao.com">kokao.com</option>
                                <option value="korea.kr">korea.kr</option>
                                <option value="msn.com">msn.com</option>
                                <option value="nate.com">nate.com</option>
                                <option value="narasarang.or.kr">narasarang.or.kr</option>
                                <option value="tistory.com">tistory.com</option>
                            </Form.Select>
                        </td>
                    </tr>

                    <tr>
                        <th>휴대전화</th>
                        <td>
                            <input
                                type="text"
                                className={style.emp_input}
                                value={employeePh || ""}
                                onChange={(e) => {
                                    setEmployeePh(PhoneNumber(e.target.value));
                                }}
                                maxLength={13}
                            />
                        </td>
                        <th>전화번호(집)</th>
                        <td>
                            <input
                                type="text"
                                className={style.emp_input}
                                value={employeeHcall || ""}
                                onChange={(e) => {
                                    setEmployeeHcall(PhoneNumber(e.target.value));
                                }}
                                maxLength={13}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colSpan={3}>
                            <input type="text" className={style.emp_input} style={{ width: "20%" }}
                                value={addrCode || ""} onChange={(e) => {setAddrCode(e.target.value)}} readOnly/>
                            <input type="text" className={style.emp_input} style={{ width: "50%" }} 
                                value={firstAddr || ""} onChange={(e) => {setFirstAddr(e.target.value)}} readOnly/>
                            <button className={style.emp_addr_input} onClick={() => setZipcodeIsOpen(true)}>우편번호 검색</button>
                            <div id="zippopupdom">
                                {
                                    zipcodeIsOpen && (
                                        <ZippopupDom>
                                            <ZippopupPostCode
                                                onClose={setZipcodeIsOpen}
                                                setFirstAddr={setFirstAddr}
                                                setAddrCode={setAddrCode}
                                            />
                                        </ZippopupDom>
                                    )
                                }
                            </div>
                            <input
                                type="text"
                                className={style.emp_input}
                                value={detailedAddr || ""}
                                onChange={(e) => {
                                    setDetailedAddr(e.target.value);
                                }}
                                placeholder="상세 주소를 입력해 주세요."
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>* 최초 입사일</th>
                        <td>
                            <input
                                type="date"
                                value={employeeJoin || ""}
                                onChange={(e) => {
                                    setEmployeeJoin(e.target.value);
                                }}
                                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                            />
                        </td>
                        <th>최종 퇴사일</th>
                        <td>
                            {props.selectAct == true ? <></> :
                                <input
                                    type="date"
                                    value={employeeLeave || ""}
                                    onChange={(e) => {
                                        setEmployeeLeave(e.target.value);
                                    }}
                                />}
                        </td>
                    </tr>
                    <tr>
                        <th>계정사용</th>
                        <td colSpan={3}>
                            <Switch
                                {...label}
                                size="small"
                                checked={useYN || false}
                                onChange={() => {
                                    setUseYN(!useYN);
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                            &nbsp;
                            {useYN ? (
                                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                                    사용
                                </span>
                            ) : (
                                <span>미사용</span>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={style.menu_btn}>
                {props.selectAct == true ? (
                    <>
                        <button onClick={insertValid}>저장</button>
                        <div>수정/삭제는 왼쪽 사원을 선택해주세요.</div>
                    </>
                ) : (
                    <>
                        <button onClick={updateValid}>저장</button>
                        <button onClick={deleteValid}>삭제</button>
                    </>
                )}
            </div>
            {insertCheck && (
                <EmpBasicSaveAlert
                    setInsertCheck={setInsertCheck}
                    insertEmp={insertEmp}
                    employeeId={employeeId} returnId={returnId} firstId={firstId}
                    employeeCmail={employeeCmail} returnCmail={returnCmail} FirstMail={FirstMail}
                    employeeName={employeeName}
                />
            )}
            {insertFail}
            {updateCheck && (
                <EmpBasicUpdateAlert
                    setUpdateCheck={setUpdateCheck}
                    updateEmp={updateEmp}
                    employeeId={employeeId} returnId={returnId} firstId={firstId}
                    employeeCmail={employeeCmail} returnCmail={returnCmail} FirstMail={FirstMail}
                    employeeSeq={employeeSeq}
                />
            )}
            {updateFail}
            {deleteCheck && (
                <EmpBasicDeleteAlert
                    setDeleteCheck={setDeleteCheck}
                    employeeSeq={employeeSeq}
                    deleteEmp={deleteEmp}
                />
            )}
        </div>
    );

    async function insertEmp() {
        const url = baseUrl + "/employee";
        const data = {
            employeeCode: employeeCode,
            employeeId: employeeId,
            employeeName: employeeName,
            employeeBirth: employeeBirth,
            employeePwd: employeePwd,
            employeePh: employeePh,
            employeePmail: pmailId + "@" + pmailDomain,
            employeeCmail: employeeCmail,
            employeeAddr: addrCode + " / " + firstAddr + " / " + detailedAddr,
            employeeJoin: employeeJoin,
            employeeLeave: employeeLeave,
            employeeGender: employeeGender,
            employeeLanguage: employeeLanguage,
            useYN: useEmp,
            employeeHcall: employeeHcall,
            approvalPwd: approvalPwd,
        };
        console.log(data);
        axios({
            method: "post",
            url: url,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                console.log("저장성공!!");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function updateEmp() {
        const url = baseUrl + "/employee/emplist/update/" + employeeSeq;
        const data = {
            employeeCode: employeeCode,
            employeeId: employeeId,
            employeeName: employeeName,
            employeeBirth: employeeBirth,
            employeePwd: employeePwd,
            employeePh: employeePh,
            employeePmail: pmailId + "@" + pmailDomain,
            employeeCmail: employeeCmail,
            employeeAddr: addrCode + " / " + firstAddr + " / " + detailedAddr,
            employeeJoin: employeeJoin,
            employeeLeave: employeeLeave,
            employeeGender: employeeGender,
            employeeLanguage: employeeLanguage,
            useYN: useEmp,
            employeeHcall: employeeHcall,
            approvalPwd: approvalPwd,
        };
        console.log("update data : " + data);
        axios({
            method: "patch",
            url: url,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                console.log("수정성공!!");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function deleteEmp() {
        const url = baseUrl + "/employee/emplist/delete/" + employeeSeq;
        axios({
            method: "delete",
            url: url,
        })
            .then((res) => {
                console.log("삭제성공!!");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //자동으로 하이픈 삽입
    function PhoneNumber(value) {
        if (!value) {
            return "";
        }

        value = value.replace(/[^0-9]/g, "");

        let result = [];
        let restNumber = "";

        if (value.startsWith("02")) {
            //서울 지역번호
            result.push(value.substr(0, 2));
            restNumber = value.substring(2);
        }
        else if (value.startsWith("1")) {
            // 지역 번호가 없는 경우
            // 1xxx-yyyy
            restNumber = value;
        } else {
            // 나머지 3자리 지역번호
            // 0xx-yyyy-zzzz
            result.push(value.substr(0, 3));
            restNumber = value.substring(3);
        }

        if (restNumber.length === 7) {
            // 7자리만 남았을 때는 xxx-yyyy
            result.push(restNumber.substring(0, 3));
            result.push(restNumber.substring(3));
        } else {
            result.push(restNumber.substring(0, 4));
            result.push(restNumber.substring(4));
        }
        return result.filter((val) => val).join("-");
    }

}

export default EmpBasic;
