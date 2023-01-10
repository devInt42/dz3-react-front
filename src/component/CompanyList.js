import axios from 'axios';
import { useState, useEffect } from 'react';
import AOS from "aos";
import 'aos/dist/aos.css';
function CompanyList() {
    const baseUrl = "http://localhost:8080";

    const [company, setCompany] = useState();
    useEffect(() => {
        axios.get(`${baseUrl}/company/info`)
            .then(res => setCompany(res.data))
            .catch(error => console.log(error));
    }, [])

    useEffect (() => {
        AOS.init();
    },[])

    return (
        company &&
        <>
        <div class = "companylistbox">
            <div class = "companylistboxheader">
            <b>회사</b> <b class = "emphasisfont">{company.length}</b> <b>건</b>
            </div>
        <ul>
            { listcompany(company) }
        </ul>
        </div>
        
        </>
    )
}

const listcompany = ( company ) => {
    return (
          <>
            {
                company.map((company) => {
                    return (
                        <div class = "box" data-aos = "fade-up">
                        <>
                            <li>{company.companyCode}{company.companyName}{company.companyPresident}</li>
                        </>
                        </div>
                    )
                })
            }
        </>
    )
}
export default CompanyList;