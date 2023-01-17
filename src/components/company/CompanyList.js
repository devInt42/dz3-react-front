import axios from 'axios';
import { useState, useEffect } from 'react';
function CompanyList(props) {
    const baseUrl = "http://localhost:8080";
    const [company, setCompany] = useState();
    useEffect(() => {
        axios.get(`${baseUrl}/company/info`)
            .then(res => setCompany(res.data))
            .catch(error => console.log(error));
    }, [])

    return (
        company &&
        <>
            <div className="companylistbox">
                <div className="companylistboxheader">
                    <b>회사</b> <b className="emphasisfont">{company.length}</b> <b>건</b>
                </div>
                <ul>
                    {<Listcompany company={company} setDetailFlag = {props.setDetailFlag} setCompanySeq={props.setCompanySeq} />}
                </ul>
            </div>
        </>
    )
}

function Listcompany(props) {
    return (
        <>
            {
                props.company.map((company) => {
                    return (
                        <div className="box"
                            onClick={() => {
                                props.setCompanySeq(company.companySeq);
                                props.setDetailFlag(true);
                            }}>
                            <li>{company.companyCode}{company.companyName}
                                {company.companyPresident}{company.pcBuisness}</li>
                        </div>
                    )
                })
            }
        </>
    )
}

export default CompanyList;