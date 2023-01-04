import axios from 'axios';
import { useState, useEffect } from 'react';
function CompanyList() {
    const baseUrl = "http://localhost:8080";

    const [company, setCompany] = useState();
    useEffect(() => {
        axios.get(`${baseUrl}/api/company/info`)
            .then(res => setCompany(res.data))
            .catch(error => console.log(error));
    }, [])


    return (
        <ul>
            { listcompany(company) }
            
        </ul>
    )
}

const listcompany = ( company ) => {
    return (
        company && <>
            {
                company.map((company) => {
                    return (
                        <>
                            <li>{company.company_code}</li>
                            <li>{company.company_name}</li>
                            <li>{company.company_president}</li>
                        </>
                    )
                })
            }
        </>
    )
}
export default CompanyList;