import CompanyData from "./CompanyData";
import DepartmentList from "./DepartmentList";
import { BsDot } from "react-icons/bs";
import { TfiClose } from 'react-icons/tfi'
import Form from 'react-bootstrap/Form';
import "./css/DepartmentDetail.css";
import { useEffect, useState } from "react";
import axios from "axios";
const DepartmentDetail = (props) => {
    const baseUrl = "http://localhost:8080"
    const [departmentParentName, setDepartmentParentName] = useState("");
    const [departmentCode, setDepartmentCode] = useState();
    const [departmentName, setDepartmentName] = useState("");
    const [cWData, setCWData] = useState([]);
    const [department, setDepartment] = useState({});
    const [result, setResult] = useState([]);
    const [workplace, setWorkplace] = useState({});
    
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
        if(props.workplaceSeq !== 0) {
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
        }
    }, [props.departmentSeq])
    
    //부서 seq로 회사 이름, 사업장 이름 조회
    const getNames = async() => {
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
        catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(JSON.stringify(department) !== '{}') {
            getNames();
        }
    }, [department])


    /// 로딩
    const [isOndata, setIsOndata] = useState("N");
    useEffect(() => {
        setIsOndata("N");
        const ondataTimer = setInterval(() => {
            setIsOndata("Y");
        }, 5);

        return () => {
            clearInterval(ondataTimer);
        }
    }, [props.departmentSeq])


    return (
        isOndata === "N" ?
            (<div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>) :
        <div>
            <div id="department-detail-header">
                <b><BsDot/>부서 정보</b>
                <div>
                    <button>저장</button>
                    <button>삭제</button>
                    <button id="department-detail-closebtn"><TfiClose /></button>
                </div>
            </div>
            <hr/>
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
                        <td className="department-table-content"></td>
                    </tr>
                    <tr>
                        <th className="department-table-title">부서코드</th>
                        <td className="department-table-content">부서코드!!</td>
                    </tr>
                    <tr>
                        <th className="department-table-title">부서명</th>
                        <td colSpan={3} className="department-table-content"><Form.Control
                            placeholder="부서 이름을 입력해주세요"
                            Style="z-index: 0; background-color:#ffe9e9;"
                        /></td>
                    </tr>
                    <tr>
                        <th className="department-table-title">부서주소</th>
                        <td className="department-table-content">부서주소</td>
                    </tr>
                    <tr>
                        <th className="department-table-title">사용여부</th>
                        <td className="department-table-content">사용 미사용</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default DepartmentDetail;