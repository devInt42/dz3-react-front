
import { useEffect, useState } from "react"
import DepartmentDepth from "./DepartmentDepth";
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';
import axios from "axios";
const DepartmentData = (props) => {
    const baseUrl = "http://localhost:8080";
    const [department, setDepartment] = useState([]);
    const [departmentIsOpen, setDepartmentIsOpen] = useState([]);
    const [toggleIcon, setToggleIcon] = useState([]);
    const [active, setActive] = useState(0);
    const [departmentFocus, setDepartmentFocus] = useState(0);
    useEffect(() => {
        const param = {
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
    }, [department])
    return (
        <>
            {
                department && department.map((departmentdata) => {
                    return (
                        <div key={departmentdata.departmentSeq}>
                            {
                                props.workplaceSeq === departmentdata.workplaceSeq &&
                                <div className="departmentlist">
                                    <div className = {departmentdata.departmentSeq === departmentFocus ? 
                                    "active-item": "department-item"}
                                    onClick={() => {
                                        departmentIsOpen.includes(departmentdata.departmentSeq) ?
                                            setDepartmentIsOpen(departmentIsOpen.filter(department => department !== departmentdata.departmentSeq)) :
                                            setDepartmentIsOpen([...departmentIsOpen, departmentdata.departmentSeq]);
                                        props.setDepartmentSeq(departmentdata.departmentSeq);
                                        props.setWorkplaceSeq(departmentdata.workplaceSeq);
                                        props.setCompanySeq(departmentdata.companySeq);
                                        props.setDetailFlag(true);
                                        props.setSearch(false);
                                        props.setFocus("");
                                        props.setFocusWorkplace("");
                                        setDepartmentFocus(departmentdata.departmentSeq);
                                    }}>
                                        {toggleIcon.includes(departmentdata.departmentSeq) ? <AiFillFolderOpen className="departmentlist-icon" /> :

                                            <AiFillFolder className="departmentlist-icon" />}

                                        {departmentdata.departmentCode}.{departmentdata.departmentName}
                                    </div>
                                    {departmentIsOpen.includes(departmentdata.departmentSeq) && <DepartmentDepth 
                                        depth={departmentdata.departmentDepth}
                                        seq={departmentdata.departmentSeq} setDepartmentSeq={props.setDepartmentSeq}
                                        setWorkplaceSeq={props.setWorkplaceSeq} setCompanySeq={props.setCompanySeq}
                                        refresh={props.refresh} setSearch={props.setSearch}
                                        setDetailFlag={props.setDetailFlag} setFocus = {props.setFocus} 
                                        setFocusWorkplace = {props.setFocusWorkplace} setDepartmentFocus = {setDepartmentFocus}
                                        departmentFocus = {departmentFocus}
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