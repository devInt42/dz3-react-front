import { BsDot } from "react-icons/bs";
import { TfiClose } from 'react-icons/tfi'
import Form from 'react-bootstrap/Form';
import "./css/DepartmentDetail.css";
import { React, useEffect, useState } from "react";
import axios from "axios";

import DepartmentParentModal from "./DepartmentParentModal";

const DepartmentDetail = (props) => {
    const baseUrl = "http://localhost:8080";
    const [firstCode, setFirstCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [departmentParentName, setDepartmentParentName] = useState("-");
    const [departmentParentSeq, setDepartmentParentSeq] = useState(0);
    const [departmentParent, setDepartmentParent] = useState({});
    const [departmentCode, setDepartmentCode] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [cWData, setCWData] = useState([]);
    const [department, setDepartment] = useState({});
    const [departmentLoc, setDepartmentLoc] = useState("");
    const [codeDupliCheck, setCodeDupliCheck] = useState(1);
    const [nameDupliCheck, setNameDupliCheck] = useState(1);
    const [useYN, setUseYN] = useState("N");
    const [workplaceIsOpen, setWorkplaceIsOpen] = useState(false);
    //사업장 seq로 회사, 사업장 이름 조회하고 department 에 데이터 셋팅
    const getWorkplace = async () => {
        try {
            const result = await axios.get(`${baseUrl}/department/workplace/${props.workplaceSeq}`)
            setDepartment(result.data[0]);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (props.workplaceSeq !== 0 && props.departmentSeq == 0) {
            getWorkplace();
        }
    }, [props.workplaceSeq])

    //부서 데이터 조회
    const getDepartment = async () => {
        try {
            const result = await axios.get(`${baseUrl}/department/list/${props.departmentSeq}`);
            setDepartment(result.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (props.departmentSeq != 0) {
            getDepartment();
            setWorkplaceIsOpen(false);
        } else {
                setDepartmentParentName("-");
                setDepartmentCode("");
                setDepartmentLoc("");
                setUseYN("N");
                setDepartmentName("");
                setWorkplaceIsOpen(true);
        }
    }, [props.departmentSeq])

    //부서 seq로 회사 이름, 사업장 이름 조회
    const getNames = async () => {
        try {
            const param = {
                companySeq: department.companySeq,
                workplaceSeq: department.workplaceSeq
            }
            const result = await axios.get(`${baseUrl}/department/list/name`, {
                params: param
            });
            setCWData(result.data[0]);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (JSON.stringify(department) !== '{}') {
            getNames();
        }
        setDepartmentName(department.departmentName);
        setDepartmentCode(department.departmentCode);
        setFirstCode(department.departmentCode);
        setFirstName(department.departmentName);
        setDepartmentLoc(department.departmentLoc);
        setDepartmentParentSeq(department.departmentParent);
    }, [department])

    // 로딩
    const [isOndata, setIsOndata] = useState("N");
    useEffect(() => {
        setIsOndata("N");
        const ondataTimer = setInterval(() => {
            setIsOndata("Y");
        }, 200);
        return () => {
            clearInterval(ondataTimer);
        }
    }, [props.departmentSeq])

    //코드중복처리
    useEffect(() => {
        if (`${departmentCode}` === `${firstCode}`) {
            setCodeDupliCheck(0);
        }
        else if (`${departmentCode}`.length > 0) {
            axios.get(`${baseUrl}/department/info/check/${departmentCode}`)
                .then(res => setCodeDupliCheck(res.data))
                .catch(error => console.log(error));
        }
    }, [departmentCode])

    //이름 중복처리
    useEffect(() => {
        if (departmentName === firstName) {
            setNameDupliCheck(0);
        } else if (departmentName !== undefined && departmentName !== null) {
            const param = {
                departmentName: departmentName,
                workplaceSeq: props.workplaceSeq
            }
            axios.get(`${baseUrl}/department/info/namecheck`,
                {
                    params: param
                }
            )
                .then(res => setNameDupliCheck(res.data))
                .catch(error => console.log(error));
        }
    }, [departmentName])

    //상위 부서 정보 얻어오기
    const getDepartmentParent = async () => {
        try {
            const result = await axios.get(`${baseUrl}/department/list/${departmentParentSeq}`);
            setDepartmentParentName(result.data[0].departmentName);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (departmentParentSeq != 0 && departmentParentSeq != undefined) {
            getDepartmentParent();
        } else setDepartmentParentName("-");
    }, [departmentParentSeq])

    return (
        isOndata === "N" ?
            (<div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>) :
            <div>
                <div id="department-detail-header">
                    <b><BsDot />부서 정보</b>
                    <div>
                        <button>저장</button>
                        {!workplaceIsOpen && <button>삭제</button>}
                        <button id="department-detail-closebtn"><TfiClose/></button>
                    </div>
                </div>
                <hr />
                <div id="department-detail-menu-form">
                    <div className="department-detail-menu department-detail-basicmenu">기본 정보</div>
                    <div className="department-detail-menu">부서원 정보</div>
                </div>
                <table id="department-table">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th className="department-table-title">회사</th>
                            <td className="department-table-content">{cWData?.companyName}</td>
                        </tr>
                        <tr>
                            <th className="department-table-title">사업장</th>
                            <td className="department-table-content">{cWData?.workplaceName}</td>
                        </tr>
                        <tr>
                            <th className="department-table-title">상위 부서</th>
                            <td className="department-table-content">
                                <div className="content-have-button">
                                    <Form.Control
                                        style={{ zIndex: "0" }}
                                        value={departmentParentName || "-"}
                                        readOnly
                                    />
                                    <DepartmentParentModal setDepartmentParentName={setDepartmentParentName}
                                        workplaceSeq={props.workplaceSeq} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="department-table-title">부서코드</th>
                            <td className="department-table-content"><Form.Control
                                placeholder="부서 코드를 입력해주세요"
                                style={{ zIndex: "0", backgroundColor: "#ffe9e9" }}
                                onChange={e => setDepartmentCode(codeNumber(e.target.value))}
                                value={departmentCode || ''}
                                isValid={`${departmentCode}`.length < 1 || firstCode === departmentCode? 
                                false : codeDupliCheck === 1 ? false : true}
                                isInvalid={`${departmentCode}`.length < 1 || firstCode === departmentCode? 
                                false : codeDupliCheck === 1 ? true : false}
                            /></td>
                        </tr>
                        <tr>
                            <th className="department-table-title">부서명</th>
                            <td colSpan={3} className="department-table-content"><Form.Control
                                placeholder="부서 이름을 입력해주세요"
                                style={{ zIndex: "0", backgroundColor: "#ffe9e9" }}
                                onChange={e => setDepartmentName(e.target.value)}
                                value={departmentName || ''}
                                isValid={`${departmentName}`.length || firstName === departmentName < 1 ? 
                                false : nameDupliCheck === 1 ? false : true}
                                isInvalid={`${departmentName}`.length || firstName === departmentName < 1 ? 
                                false : nameDupliCheck === 1 ? true : false}
                            /></td>
                        </tr>
                        <tr>
                            <th className="department-table-title">부서주소</th>
                            <td className="department-table-content"><Form.Control
                                placeholder="부서 주소를 입력해주세요"
                                style={{ zIndex: "0", backgroundColor: "#ffe9e9" }}
                                onChange={e => setDepartmentLoc(e.target.value)}
                                value={departmentLoc || ''}
                            /></td>
                        </tr>
                        <tr>
                            <th className="department-table-title">사용여부</th>
                            <td className="department-table-content">
                                <div className="department-table-content-flex">
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        onChange={() => { useYN === "N" ? setUseYN("Y") : setUseYN("N"); }}
                                        checked={useYN === "N" ? false : true}
                                    />
                                    {useYN === "Y" ? (<b>사    용</b>) : (<b>미사용</b>)}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

    )
    function codeNumber(value) {
        if (!value) { return ""; }

        value = value.replace(/[^0-9]/g, "");
        let result = "";
        result = value.substring(0, 4);
        return result;
    }
}

export default DepartmentDetail;