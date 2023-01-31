import axios from "axios";
import { useEffect, useState } from "react";
import DepartmentData from "./DepartmentData";
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import "./css/DepartmentList.css";
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
const WorkplaceData = (props) => {

    const [workplace, setWorkplace] = useState([]);
    const [workplaceIsOpen, setWorkplaceIsOpen] = useState([]);
    const [toggleIcon, setToggleIcon] = useState([]);
    const baseUrl = "http://localhost:8080";
    
    
    useEffect(() => {
        axios.get(`${baseUrl}/department/list/workplace`)
            .then(res => setWorkplace(res.data))
            .catch(error => console.log(error));
    }, [props.refresh])
    

    useEffect(() => {}, [workplace])
    useEffect(() => {
        setToggleIcon(workplaceIsOpen);
    }, [workplaceIsOpen])

    return (
        <>
            {workplace && workplace.map((workplace, idx) => {
                return (
                    <div key={idx}>
                        {workplace.companySeq === props.companySeq &&
                            <div className="workplacelist">
                                <div onClick = {() => {
                        workplaceIsOpen.includes(idx) ? 
                        setWorkplaceIsOpen(workplaceIsOpen.filter(workplace => workplace !== idx)) :
                        setWorkplaceIsOpen([...workplaceIsOpen, idx]);
                        props.setWorkplaceSeq(workplace.workplaceSeq);
                        props.setCompanySeq(workplace.companySeq);
                        props.setDepartmentSeq(0);
                    }}>
                                    <HiOutlineBuildingOffice className="workplacelist-icon" />
                                    {workplace.workplaceCode}.{workplace.workplaceName}
                                    {toggleIcon.includes(idx) ? <HiChevronDown /> : <HiChevronUp />}
                                </div>
                                {workplaceIsOpen.includes(idx) && <DepartmentData workplaceSeq = {workplace.workplaceSeq} setDepartmentSeq = {props.setDepartmentSeq} setWorkplaceSeq = {props.setWorkplaceSeq} 
                                setCompanySeq = {props.setCompanySeq} refresh = {props.refresh}/>}
                            </div>
                        }
                    </div>
                )
            })}
        </>
    )
}

export default WorkplaceData;