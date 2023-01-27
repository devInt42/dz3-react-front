import axios from "axios";
import { useEffect, useState } from "react";
import WorkplaceData from "./WorkplaceData";
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
const CompanyData = (props) => {
    const baseUrl = "http://localhost:8080";
    const [company, setCompany] = useState([]);
    const [companyIsOpen, setCompanyIsOpen] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}/department/list/company`)
            .then(res => setCompany(res.data))
            .catch(error => console.log(error))
    }, [])

    const [toggleIcon, setToggleIcon] = useState([]);


    useEffect(() => {
        setToggleIcon(companyIsOpen);
    }, [companyIsOpen])

    return (
        <div>
            {company && company.map((company, idx) => {
                return (
                    <div key={idx}>
                        <div onClick={() => {
                            companyIsOpen.includes(idx) ?
                                setCompanyIsOpen(companyIsOpen.filter((company) => company !== idx)) :
                                setCompanyIsOpen([...companyIsOpen, idx]);
                        }}>
                            <HiOutlineBuildingOffice2 className="companylist-icon" />{company.companyCode}.{company.companyName}
                            {toggleIcon.includes(idx) ? <HiChevronDown /> : <HiChevronUp />}
                        </div>
                        {companyIsOpen.includes(idx) && <WorkplaceData companySeq={company.companySeq} key={idx} 
                        setDepartmentSeq={props.setDepartmentSeq} setWorkplaceSeq = {props.setWorkplaceSeq} />
                        }
                    </div>
                )
            })}
        </div>
    )


}

export default CompanyData;