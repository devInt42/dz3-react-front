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
                department && department.map((departmentdata, idx) => {
                    return(
                    <div key = {idx}>
                        {
                            departmentdata.workplaceSeq === props.workplaceSeq &&
                            <DepartmentDepth departmentName = {departmentdata.departmentName}
                                             departmentDepth = {departmentdata.departmentDepth}
                                             departmentCode = {departmentdata.departmentCode}
                                             department = {department}
                            />
                        }
                    </div>
                        )
                })
            }
        </>
    )
}
export default DepartmentData;