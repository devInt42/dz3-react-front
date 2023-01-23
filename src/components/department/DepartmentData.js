import axios from "axios";
import { useEffect, useState } from "react"
import DepartmentDepth from "./DepartmentDepth";
const DepartmentData = (props) => {
    const baseUrl = "http://localhost:8080";
    const [department, setDepartment] = useState();
    useEffect(() => {
        axios.get(`${baseUrl}/department/list/`)
        .then(res => setDepartment(res.data))
        .catch(error => console.log(error));
    } ,[])
    return (
        <>
            {
                department && department.map((department, idx) => {
                    return(
                    <>
                        {
                            department.workplaceSeq === props.workplaceSeq &&
                            <DepartmentDepth departmentName = {department.departmentName}
                                             departmentDepth = {department.departmentDepth}
                                             departmentCode = {department.departmentCode}
                            />
                        }
                    </>
                        )
                })
            }
        </>
    )
}
export default DepartmentData;