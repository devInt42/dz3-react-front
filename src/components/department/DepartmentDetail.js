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
    const [companyName, setCompanyName] = useState("");
    const [workplaceName, setWorkplaceName] = useState("");
    const [departmentParentName, setDepartmentParentName] = useState("");
    const [departmentCode, setDepartmentCode] = useState();
    const [departmentName, setDepartmentName] = useState("");
    const [cWData, setCWData] = useState([]);
    const [companySeq, setCompanySeq] = useState(0);
    const [workplaceSeq, setWorkplaceSeq] = useState(0);
    const [department, setDepartment] = useState({});

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
    useEffect(() => {
        console.log(department);
        if (props.departmentSeq != 0) {
            let param = {
                companySeq: department.companySeq,
                workplaceSeq: department.workplaceSeq
            }
            axios.get(`${baseUrl}/department/list/name`, {
                params: param
            })
                .then(res => setCWData(res.data[0]))
                .catch(error => console.log(error));
            
            setCompanyName(cWData.companyName);
            setWorkplaceName(cWData.workplaceName);
        }
    }, [department])
    return (
        <div>
            <div id="department-detail-header">
                <b><BsDot />부서 정보</b>
                <div>
                    <button>저장</button>
                    <button>삭제</button>
                    <button id="department-detail-closebtn"><TfiClose /></button>
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
                        <td className="department-table-content">{companyName}</td>
                    </tr>
                    <tr>
                        <th className="department-table-title">사업장</th>
                        <td className="department-table-content">{workplaceName}</td>
                    </tr>
                    <tr>
                        <th className="department-table-title">상위부서</th>
                        <td className="department-table-content">상위부서 이름</td>
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