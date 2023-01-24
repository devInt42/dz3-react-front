import axios from "axios";
import { useEffect, useState } from "react";
import WorkplaceData from "./WorkplaceData";
import {HiOutlineBuildingOffice2} from 'react-icons/hi2'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
const CompanyData = () => {
    const baseUrl = "http://localhost:8080";
    const [company, setCompany] = useState([]);
    const [companyIsOpen, setCompanyIsOpen] = useState([]);
    useEffect(()=> {
        axios.get(`${baseUrl}/department/list/company`)
        .then(res => setCompany(res.data))
        .catch(error => console.log(error))
    },[])

    const [toggleIcon, setToggleIcon] = useState([false]);
    const icon = toggleIcon ? <HiChevronUp/>: <HiChevronDown/>
    

    return (
        <div>
            {company && company.map((company, idx) => {
               return(
                <div onClick={() => {
                    companyIsOpen.includes(idx) ? 
                    setCompanyIsOpen(companyIsOpen.filter((company) => company !== idx)):
                    setCompanyIsOpen([...companyIsOpen, idx])
                    
                    console.log((Object.values(companyIsOpen)));
                }} key={idx}>
                <HiOutlineBuildingOffice2 className = "companylist-icon"/>{company.companyCode}.{company.companyName}{icon}
                    {companyIsOpen.includes(idx) && <WorkplaceData companySeq = {company.companySeq} key = {idx}/>}
               </div>
               )
            })}
        </div>
    )

    
}

export default CompanyData;