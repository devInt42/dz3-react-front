import axios from "axios";
import { useEffect, useState } from "react";
import DepartmentData from "./DepartmentData";
import {HiOutlineBuildingOffice} from 'react-icons/hi2';
import "./css/DepartmentList.css";
const WorkplaceData = (props) => {

    const [workplace, setWorkplace] = useState([]);
    const baseUrl = "http://localhost:8080";
    useEffect(()=> {
        axios.get(`${baseUrl}/department/list/workplace`)
        .then(res => setWorkplace(res.data) )
        .catch(error => console.log(error));
    }, [])
    
    return (
        <>
            {workplace && workplace.map((workplace, idx) => {
                return(
                    <div>
                        {workplace.companySeq === props.companySeq &&
                            <div className = "workplacelist"><HiOutlineBuildingOffice className= "workplacelist-icon"/>
                            {workplace.workplaceCode}.{workplace.workplaceName}
                                <DepartmentData workplaceSeq = {workplace.workplaceSeq} key = {idx}/>
                            </div>
                        }
                    </div>
                )
            })}
        </>
    )
}

export default WorkplaceData;