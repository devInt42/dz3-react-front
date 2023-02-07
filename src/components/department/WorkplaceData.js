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
    const [focusWorkplace, setFocusWorkplace] = useState("");
    
    useEffect(() => {
        axios.get(`${baseUrl}/department/list/workplace`)
            .then(res => setWorkplace(res.data))
            .catch(error => console.log(error));
    }, [props.refresh])


    useEffect(() => { }, [workplace])
    useEffect(() => {
        setToggleIcon(workplaceIsOpen);
    }, [workplaceIsOpen])

    return (
        <>
            {workplace && workplace.map((workplacedata) => {
                return (
                    <div key={workplacedata.workplaceSeq}>
                        {workplacedata.companySeq === props.companySeq &&
                            <div className="workplacelist">
                                <div className = {focusWorkplace === workplacedata.workplaceSeq ?
                                "active-item" : "workplace-item"} onClick={() => {
                                    workplaceIsOpen.includes(workplacedata.workplaceSeq) ?
                                        setWorkplaceIsOpen(workplaceIsOpen.filter(workplace => workplace !== workplacedata.workplaceSeq)) :
                                        setWorkplaceIsOpen([...workplaceIsOpen, workplacedata.workplaceSeq]);
                                    props.setWorkplaceSeq(workplacedata.workplaceSeq);
                                    props.setCompanySeq(workplacedata.companySeq);
                                    props.setDepartmentSeq(0);
                                    props.setDetailFlag(false);
                                    props.setSearch(false);
                                    props.setFocus("");
                                    setFocusWorkplace(workplacedata.workplaceSeq);
                                }}>
                                    <HiOutlineBuildingOffice className="workplacelist-icon" />
                                    {workplacedata.workplaceCode}.{workplacedata.workplaceName}
                                    {toggleIcon.includes(workplacedata.workplaceSeq) ? <HiChevronDown /> : <HiChevronUp />}
                                </div>
                                {workplaceIsOpen.includes(workplacedata.workplaceSeq) && 
                                <DepartmentData workplaceSeq={workplacedata.workplaceSeq} 
                                setDepartmentSeq={props.setDepartmentSeq} setWorkplaceSeq={props.setWorkplaceSeq}
                                setCompanySeq={props.setCompanySeq} refresh={props.refresh}
                                setSearch={props.setSearch} setDetailFlag={props.setDetailFlag}
                                setFocusWorkplace = {setFocusWorkplace} setFocus = {props.setFocus}/>}
                            </div>
                        }
                    </div>
                )
            })}
        </>
    )
}

export default WorkplaceData;