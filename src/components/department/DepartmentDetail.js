import { BsDot } from "react-icons/bs";
import { TfiClose } from 'react-icons/tfi'
import Form from 'react-bootstrap/Form';
import "./css/DepartmentDetail.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import SaveFailDepartmentAlert from "./alert/SaveFailDepartmentAlert";
import DepartmentParentModal from "./DepartmentParentModal";
import SaveDepartmentAlert from "./alert/SaveDepartmentAlert";
import UpdateDepartmentAlert from "./alert/UpdateDepartmentAlert";
import DeleteDepartmentAlert from "./alert/DeleteDepartmentAlert";

const DepartmentDetail = (props) => {
    const baseUrl = "http://localhost:8080";
    const [firstCode, setFirstCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [departmentParentName, setDepartmentParentName] = useState("-");
    const [departmentParentSeq, setDepartmentParentSeq] = useState(0);
    const [departmentCode, setDepartmentCode] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [departmentParentDepth, setDepartmentParentDepth] = useState(0);
    const [departmentDepth, setDepartmentDepth] = useState(0);
    const [cWData, setCWData] = useState([]);
    const [department, setDepartment] = useState({});
    const [departmentLoc, setDepartmentLoc] = useState("");
    const [codeDupliCheck, setCodeDupliCheck] = useState(1);
    const [nameDupliCheck, setNameDupliCheck] = useState(1);
    const [useYN, setUseYN] = useState("N");
    const [checked, setChecked] = useState(0);
    const [notRequire, setNotRequire] = useState('');
    const [allCheck, setAllCheck] = useState(false);
    const [checkDelete, setCheckDelete] = useState(false);
    const [departmentCall, setDepartmentCall] = useState("");
    const [departmentFax, setDepartmentFax] = useState("");
    const [areaCode, setAreaCode] = useState("");

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
        setNotRequire('');
        setDepartmentDepth(0);
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
            props.setInsertForm(false);
        } else {
            setNotRequire('');
            setDepartmentParentName("-");
            setDepartmentParentSeq("");
            setDepartmentCode("");
            setDepartmentLoc("");
            setUseYN("N");
            setDepartmentName("");
            setDepartmentDepth(0);
            setAllCheck(false);
            setCheckDelete(false);
            setDepartmentCall("");
            setDepartmentFax("");
            setAreaCode("");
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


    //전화번호, 팩스번호 스타일
    const [callStyle, setCallStyle] = useState(false);
    const [faxStyle, setFaxStyle] = useState(false);
    useEffect(() => {

        departmentCall < 0 ? setDepartmentCall('') : CallNumberCheck(departmentCall) ? setCallStyle(true) : setCallStyle(false);

    }, [departmentCall])

    useEffect(() => {

        departmentFax < 0 ? setDepartmentFax('') : FaxNumberCheck(departmentFax) ? setFaxStyle(true) : setFaxStyle(false);

    }, [departmentFax])

    //값 표기
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
        setDepartmentDepth(department.departmentDepth);
        setUseYN(department.useYN);
        setDepartmentCall((department.departmentCall == null) ? "" : department.departmentCall);
        setDepartmentFax(department.departmentFax == null ? "" : department.departmentFax);
    }, [department])

    // 로딩
    const [isOndata, setIsOndata] = useState("N");
    useEffect(() => {
        setIsOndata("N");
        setNotRequire('');
        const ondataTimer = setInterval(() => {
            setIsOndata("Y");
        }, 200);
        return () => {
            clearInterval(ondataTimer);
        }
    }, [props.departmentSeq])

    //코드중복처리
    useEffect(() => {
        if (`${departmentCode}` == `${firstCode}` && props.departmentSeq !== 0) {
            setCodeDupliCheck(0);
        }
        else if (`${departmentCode}`.length > 0 && departmentCode != undefined) {
            const param = {
                "departmentCode": departmentCode,
                "companySeq": props.companySeq,
            }
            axios.get(`${baseUrl}/department/info/check/`, {
                params: param
            })
                .then(res => setCodeDupliCheck(res.data))
                .catch(error => console.log(error));
        }
        else {
            setCodeDupliCheck(1);
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

    //상위 부서명 정보 얻어오기
    const getDepartmentParent = async () => {
        try {
            const result = await axios.get(`${baseUrl}/department/list/${departmentParentSeq}`);
            setDepartmentParentName(result.data[0].departmentName);
            setDepartmentParentDepth(result.data[0].departmentDepth);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (departmentParentSeq != 0 && departmentParentSeq != undefined) {
            getDepartmentParent();
        } else setDepartmentParentName("-");
    }, [departmentParentSeq])

    //필수 입력값이 잘 들어 갔는지 확인
    const AllCheck = () => {
        setChecked(checked + 1);
        if (codeDupliCheck === 1 || `${departmentCode}`.length < 1) {
            setNotRequire(<SaveFailDepartmentAlert />)
            return false;
        }
        if (nameDupliCheck === 1 || `${departmentName}`.length < 1) {
            setNotRequire(<SaveFailDepartmentAlert />)
            return false;
        }
        if (`${departmentLoc}`.length < 1) {
            setNotRequire(<SaveFailDepartmentAlert />)
            return false;
        }
        setAllCheck(true);
        return true
    }
    //추가 준비
    const InsertForm = () => {
        setDepartmentParentName(departmentName);
        setDepartmentParentSeq(props.departmentSeq);
        setDepartmentCode("");
        setDepartmentLoc("");
        setUseYN("N");
        setDepartmentName("");
        setDepartmentParentDepth(departmentDepth);
        setAllCheck(false);
        setCheckDelete(false);
        setFirstCode("");
        setFirstName("");
        setDepartmentCall("");
        setDepartmentFax("");
        setChecked(0);
        props.setInsertForm(true);
    }

    //수정, 추가에 필요한 데이터
    const data = {
        "companySeq": props.companySeq,
        "workplaceSeq": props.workplaceSeq,
        "departmentParent": departmentParentSeq,
        "departmentCode": departmentCode,
        "departmentName": departmentName,
        "departmentLoc": departmentLoc,
        "useYN": useYN,
        "departmentDepth": departmentDepth,
        "departmentCall": departmentCall,
        "departmentFax": departmentFax
    }
    const InsertData = () => {
        const param = {
            "departmentParentDepth": departmentParentDepth,
        }
        axios.post(`${baseUrl}/department/insert`, JSON.stringify(data), {
            headers: {
                "Content-Type": 'application/json'
            },
            params: param
        })
    }
    const Update = (seq) => {
        const param = {
            "departmentParentDepth": departmentParentDepth,
        }
        axios.post(`${baseUrl}/department/update/${seq}`, JSON.stringify(data), {
            headers: {
                "Content-Type": 'application/json'
            },
            params: param
        })
    }
    const Delete = () => {
        axios.get(`${baseUrl}/department/delete/${props.departmentSeq}`)
    }

    return (
        isOndata === "N" ?
            (<div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>) :
            <div>
                <div id="department-detail-header">
                    <b><BsDot />부서 정보</b>
                    <div>
                        {
                            (props.departmentSeq !== 0 && !props.insertForm) &&
                            <button onClick={() => InsertForm()}>추가</button>
                        }
                        {(props.departmentSeq !== 0 || props.workplaceSeq !== 0)
                            && <button onClick={() => AllCheck()}>저장</button>}
                        {
                            props.insertForm && allCheck &&
                            <SaveDepartmentAlert setAllCheck={setAllCheck} InsertData={InsertData}
                                setRefresh={props.setRefresh} InitSeq={props.InitSeq} refresh={props.refresh}
                                setInsertForm={props.setInsertForm} setDetailFlag={props.setDetailFlag} />
                        }
                        {
                            (props.departmentSeq !== 0 && allCheck && !props.insertForm) &&
                            <UpdateDepartmentAlert setAllCheck={setAllCheck} Update={Update} seq={props.departmentSeq}
                                setRefresh={props.setRefresh} refresh={props.refresh} setInsertForm={props.setInsertForm} />
                        }
                        {
                            (props.departmentSeq !== 0 && checkDelete) &&
                            <DeleteDepartmentAlert setCheckDelete={setCheckDelete} Delete={Delete}
                                setRefresh={props.setRefresh} InitSeq={props.InitSeq} refresh={props.refresh}
                                setInsertForm={props.setInsertForm} setDetailFlag={props.setDetailFlag} />
                        }

                        {
                            (props.departmentSeq !== 0 && !props.insertForm) && <button type="button"
                                onClick={() => setCheckDelete(true)}>삭제</button>
                        }
                        <button id="department-detail-closebtn" onClick={() => { props.InitSeq(); props.setDetailFlag(false); props.setInsertForm(false); props.setSearch(false) }}><TfiClose /></button>
                    </div>
                </div>
                {notRequire}
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
                                        onChange={e => setDepartmentName(e.target.value)}
                                        value={departmentParentName || "-"}
                                        readOnly
                                    />
                                    <DepartmentParentModal setDepartmentParentName={setDepartmentParentName}
                                        workplaceSeq={props.workplaceSeq} companyName={cWData.companyName}
                                        workplaceName={cWData.workplaceName}
                                        setDepartmentParentSeq={setDepartmentParentSeq}
                                        setDepartmentParentDepth={setDepartmentParentDepth}
                                    />
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
                                isValid={`${departmentCode}`.length < 1 || firstCode === departmentCode ?
                                    false : codeDupliCheck === 1 ? false : true}
                                isInvalid={`${departmentCode}`.length < 1 || firstCode === departmentCode ?
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
                                isValid={`${departmentName}`.length < 1 || firstName === departmentName ?
                                    false : nameDupliCheck === 1 ? false : true}
                                isInvalid={`${departmentName}`.length < 1 || firstName === departmentName ?
                                    false : nameDupliCheck === 1 ? true : false}
                            /></td>
                        </tr>
                        <tr>
                            <td className="department-table-title">전화 번호</td>
                            <td className="department-table-content">
                                <div className="company-table-td-twocontent">
                                    <select name="area-code" className="company-select-option"
                                        onChange={(e) => {
                                            setDepartmentCall("");
                                            setAreaCode(e.target.value)
                                        }}>
                                        <option value="">직접 입력</option>
                                        <option value="010-">010</option>
                                        <option value="02-">02</option>
                                        <option value="031-">031</option>
                                        <option value="032-">032</option>
                                        <option value="033-">033</option>
                                        <option value="041-">041</option>
                                        <option value="042-">042</option>
                                        <option value="043-">043</option>
                                        <option value="044-">044</option>
                                        <option value="051-">051</option>
                                        <option value="052-">052</option>
                                        <option value="053-">053</option>
                                        <option value="054-">054</option>
                                        <option value="055-">055</option>
                                        <option value="061-">061</option>
                                        <option value="062-">062</option>
                                        <option value="063-">063</option>
                                        <option value="064-">064</option>
                                    </select>
                                    <Form.Control
                                        placeholder="대표 전화를 입력해 주십시오."
                                        onChange={e => { setDepartmentCall(CallNumber(areaCode + e.target.value)) }}
                                        value={`${departmentCall}`.substring(areaCode.length) || ""}
                                        isValid={callStyle}
                                        isInvalid={`${departmentCall}`.length < 1 ? '' : callStyle ? false : true}
                                        style={{ zIndex: 0 }}
                                    />
                                </div>
                            </td>
                            <td className="department-table-title">대표 팩스</td>
                            <td className="department-table-content"><Form.Control
                                placeholder="대표 팩스를 입력해 주십시오."
                                onChange={e => { setDepartmentFax(FaxNumber(e.target.value)); }}
                                value={departmentFax || ""}
                                isValid={faxStyle}
                                isInvalid={`${departmentFax}`.length < 1 ? '' : faxStyle ? false : true}
                                style={{ zIndex: 0 }}
                            />
                            </td>
                        </tr>
                        <tr>
                            <th className="department-table-title">부서주소</th>
                            <td className="department-table-content"><Form.Control
                                placeholder="부서 주소를 입력해주세요"
                                style={{ zIndex: "0", backgroundColor: "#ffe9e9" }}
                                onChange={e => setDepartmentLoc(e.target.value)}
                                value={departmentLoc || ''}
                                isValid={firstName === departmentName ?
                                    false : `${departmentLoc}`.length < 1 ? false : true}
                                isInvalid={`${departmentLoc}`.length < 1 && checked > 0 ? true : false}
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
                                        checked={useYN == "Y" ? true : false}
                                    />
                                    {useYN == "Y" ? (<b>사    용</b>) : (<b>미사용</b>)}
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
    //자동으로 하이픈 삽입
    function CallNumber(value) {
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
    function FaxNumber(value) {
        if (!value) { return ""; }

        value = value.replace(/[^0-9]/g, "");
        let result = [];
        let restNumber = "";

        if (value.startsWith("02")) {
            result.push(value.substring(0, 2));
            restNumber = value.substring(2);
        } else if (value.startsWith("0505") || value.startsWith("0504")) {
            result.push(value.substring(0, 4));
            restNumber = value.substring(4);
        }
        else {
            result.push(value.substring(0, 3));
            restNumber = value.substring(3);
        }

        if (restNumber.length === 7) {
            result.push(restNumber.substring(0, 3));
            result.push(restNumber.substring(3));
        } else {
            result.push(restNumber.substring(0, 4));
            result.push(restNumber.substring(4));
        }
        return result.filter((val) => val).join("-");
    }

    //유효성 검사를 하기 위한 함수
    function CallNumberCheck(value) { //대표번호 유효성 검사
        const check = /^0[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/;
        return check.test(value);
    }

    function FaxNumberCheck(value) {
        const check = /(^02[0-9]{0}|^01[0-9]{1}|050[0-9]{1}|[0-9]{3})-[0-9]{3,4}-[0-9]{4}$/;
        return check.test(value);
    }
}

export default DepartmentDetail;