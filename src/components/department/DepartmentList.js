import { useEffect, useState } from "react";
import axios from 'axios';
const DepartmentList = () => {
    return (
        <>
            <ListDepartment/>
        </>
    )
    
}

const ListDepartment = () => {
    const baseUrl = "http://localhost:8080";
    const [department, setDepartment] = useState();
    useEffect(() => {
        axios.get(`${baseUrl}/department/list`)
        .then(res => setDepartment(res.data))
    },[])

    return (
        department && <>
            <div>
                {department.map((department, idx) => {
                    return(
                        <span key={idx}>{department.departmentName}</span>
                    )
                }) }
            </div>
        </>
    )
}

export default DepartmentList;