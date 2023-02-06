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
        if (props.companySeq != undefined) {
            axios.get(`${baseUrl}/department/list/company`, {
                headers: { Authorization: window.sessionStorage.getItem("empInfo") }
            })
                .then(res => setCompany(res.data))
                .catch(error => console.log(error))
        }
    }, [])

    useEffect(() => {
        if (props.companySeq != "" && props.companySeq != undefined) {
            axios.get(`${baseUrl}/department/list/company/${props.companySeq}`)
                .then(res => setCompany(res.data))
                .catch(error => console.log(error))
            console.log(company);
        }
    }, [props.companySeq])
    const [toggleIcon, setToggleIcon] = useState([]);


    useEffect(() => {
        setToggleIcon(companyIsOpen);
    }, [companyIsOpen])

    return (
        <div>
            {company && company.map((companydata) => {
                return (
                    <div key={companydata.companySeq}>
                        <div onClick={() => {
                            companyIsOpen.includes(companydata.companySeq) ?
                                setCompanyIsOpen(companyIsOpen.filter((company) => company !== companydata.companySeq))
                                :
                                setCompanyIsOpen([...companyIsOpen, companydata.companySeq]);
                            props.setSearch(false);
                            props.setDetailFlag(false);
                            props.setDepartmentSeq(0);
                            props.setWorkplaceSeq(0);
                        }}>
                            <HiOutlineBuildingOffice2 className="companylist-icon" />{companydata.companyCode}.{companydata.companyName}
                            {toggleIcon.includes(companydata.companySeq) ? <HiChevronDown /> : <HiChevronUp />}
                        </div>
                        {companyIsOpen.includes(companydata.companySeq) && <WorkplaceData companySeq={companydata.companySeq} key={companydata.companySeq}
                            setDepartmentSeq={props.setDepartmentSeq} setWorkplaceSeq={props.setWorkplaceSeq}
                            setCompanySeq={props.setCompanySeq} refresh={props.refresh} setSearch={props.setSearch}
                            setDetailFlag={props.setDetailFlag} />
                        }
                    </div>
                )
            })}
        </div>
    )


}

export default CompanyData;