import DepartmentDetail from './DepartmentDetail';
import DepartmentList from './DepartmentList';
import Alert from 'react-bootstrap/Alert';
import "./css/Department.css"
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useState } from 'react';
import DepartmentNotSelect from './DepartmentNotSelect';
const Department = () => {
    const [departmentSeq, setDepartmentSeq] = useState(0);
    const [workplaceSeq, setWorkplaceSeq] = useState(0);
    const [companySeq, setCompanySeq] = useState(0);
    const [refresh, setRefresh] = useState(0);
    
    const InitSeq = () => {
        setCompanySeq(0);
        setWorkplaceSeq(0);
        setDepartmentSeq(0);
    }
    return (
        <div>

            <h2>부서 관리</h2>
            <hr className="line"></hr>
            <Alert variant='secondary' className="header-alert">
                <IoInformationCircleOutline /> 회사별 조직도(부서)를 등록할 수 있습니다.
            </Alert>
            <div id="department-form">
                <div id="department-list-box">
                    <DepartmentList setDepartmentSeq={setDepartmentSeq} setWorkplaceSeq={setWorkplaceSeq}
                        setCompanySeq={setCompanySeq} refresh={refresh} />
                </div>
                {
                    (workplaceSeq != 0) &&
                    <div id="department-info">
                        <DepartmentDetail departmentSeq={departmentSeq} workplaceSeq={workplaceSeq} companySeq={companySeq}
                            setRefresh={setRefresh} InitSeq ={InitSeq}
                        />
                    </div>
                }
                {
                    workplaceSeq === 0 &&
                    <div id="companynotselectform">
                        <div>
                            <DepartmentNotSelect />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Department;