import axios from "axios";
import { useEffect, useState } from "react";
import WorkplaceData from "./WorkplaceData";
import {HiOutlineBuildingOffice2} from 'react-icons/hi2'
const CompanyData = () => {
    const baseUrl = "http://localhost:8080";
    const [company, setCompany] = useState([]);
    useEffect(()=> {
        axios.get(`${baseUrl}/department/list/company`)
        .then(res => setCompany(res.data))
        .catch(error => console.log(error))
    },[])

    return (
        <div>
            {company && company.map((company, idx) => {
               return( 
               <div><HiOutlineBuildingOffice2 className = "companylist-icon"/>{company.companyCode}.{company.companyName}
                    <WorkplaceData companySeq = {company.companySeq} key = {idx}/>
               </div>
               )
            })}
        </div>
    )
}

export default CompanyData;