import axios from "axios";
import { useEffect, useState } from "react"
import DepartmentDepth from "./DepartmentDepth";
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';
const DepartmentData = (props) => {
    const baseUrl = "http://localhost:8080";
    const [department, setDepartment] = useState([]);
    const [departmentIsOpen, setDepartmentIsOpen] = useState([]);

    const [toggleIcon, setToggleIcon] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}/department/list/`)
            .then(res => setDepartment(res.data))
            .catch(error => console.log(error));
    }, [])
    useEffect(() => {
        setToggleIcon(departmentIsOpen);
        console.log(toggleIcon);
    }, [departmentIsOpen])
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
                                    }}>
                                        {toggleIcon.includes(idx) ? <AiFillFolderOpen className="departmentlist-icon" /> :
                                            <AiFillFolder className="departmentlist-icon" />}
                                        {departmentdata.departmentCode}.{departmentdata.departmentName}
                                    </div>
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