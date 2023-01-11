import axios from 'axios';
import { useState, useEffect } from 'react';
function CompanyList() {
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
            <div class="companylistbox">
                <div class="companylistboxheader">
                    <b>회사</b> <b class="emphasisfont">{company.length}</b> <b>건</b>
                </div>
                <ul>
                    {listcompany(company)}
                </ul>
            </div>

        </>
    )
}

const listcompany = (company) => {
    console.log(company);
    return (
        <>
            {
                company.map((company) => {
                    return (
                        <div class="box">
                            
                                <li>{company.companyCode}{company.companyName}{company.companyPresident}</li>
                            
                        </div>
                    )
                })
            }
        </>
    )
}
export default CompanyList;