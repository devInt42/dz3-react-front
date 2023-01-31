
import { useEffect, useState } from "react"
import DepartmentDepth from "./DepartmentDepth";
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';
import axios from "axios";
const DepartmentData = (props) => {
    const baseUrl = "http://localhost:8080";
    const [department, setDepartment] = useState([]);
    const [departmentIsOpen, setDepartmentIsOpen] = useState([]);
    const [toggleIcon, setToggleIcon] = useState([]);
    
    useEffect(() => {
        let param = {
            departmentDepth: 0,
            departmentParent: 0,
        }
            axios.get(`${baseUrl}/department/list`,
            {
                params: param
            })
            .then(res => setDepartment(res.data))
    }, [props.refresh])
    useEffect(() => {
        setToggleIcon(departmentIsOpen);
    }, [departmentIsOpen])

    useEffect(() => {
    }, [props.refresh, department])
    return (
        <>
            {
                department && department.map((departmentdata, idx) => {
                    return (
                        <div key={idx} >
                            {
                                props.workplaceSeq === departmentdata.workplaceSeq &&
                                <div className="departmentlist">
                                    <div onClick={() => {
                                        departmentIsOpen.includes(idx) ?
                                            setDepartmentIsOpen(departmentIsOpen.filter(department => department !== idx)) :
                                            setDepartmentIsOpen([...departmentIsOpen, idx]);
                                            props.setDepartmentSeq(departmentdata.departmentSeq);
                                            props.setWorkplaceSeq(departmentdata.workplaceSeq);
                                            props.setCompanySeq(departmentdata.companySeq);
                                    }}>
                                        {toggleIcon.includes(idx) ? <AiFillFolderOpen className="departmentlist-icon" /> :
                                            <AiFillFolder className="departmentlist-icon"/>}
                                    
                                       {departmentdata.departmentCode}.{departmentdata.departmentName}
                                       </div>
                                        {departmentIsOpen.includes(idx) && <DepartmentDepth depth = {departmentdata.departmentDepth} 
                                         seq = {departmentdata.departmentSeq} setDepartmentSeq = {props.setDepartmentSeq}
                                         setWorkplaceSeq = {props.setWorkplaceSeq} setCompanySeq = {props.setCompanySeq}
                                        />}
                                </div>

                            }
                        </div>
                    )
                })
            }
        </>
    )
}
export default DepartmentData;