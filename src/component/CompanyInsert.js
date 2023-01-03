import axios from 'axios';
import { useState } from 'react';

const CompanyInsert = (() => {

    let [companyName, setCompanyName] = useState("");
    let [companyCategory, setCompanyCategory] = useState("");
    let [companyCall, setCompanyCall] = useState("");
    let [companyRegist, setCompanyRegist] = useState("");
    let [companyPregident, setCompanyPregident] = useState("");
    let [companyDomain, setCompanyDomain] = useState("");
    let [companyAddr, setCompanyAddr] = useState("");
    let [companyHomepage, setCompanyHomepage] = useState("");

    const data = {
        "company_name": companyName,
        "company_category": companyCategory,
        "company_call": companyCall,
        "company_regist": companyRegist,
        "company_president": companyPregident,
        "company_domain": companyDomain,
        "company_addr": companyAddr,
        "company_homepage": companyHomepage
    }

    const baseUrl = "http://localhost:8080";

    async function insertCompany() {
        
        await axios.post(
            `${baseUrl}/api/company/insert`
            , JSON.stringify(data)
            ,
            {   headers: {
                 "Content-Type": 'application/json'
            },
            })
            .then(res => console.log(res.data))
            .catch(error => console.log(error));
    }
    return (
        <div>
            회사 이름: <input type="text" id="companyName" onChange={(e) => setCompanyName(e.target.value)} /><br />
            업태: <input type="text" id="companyCategory" onChange={(e) => setCompanyCategory(e.target.value)} /> <br />
            전화번호:  <input type="phone" id="companyCall" onChange={(e) => setCompanyCall(e.target.value)} /> <br />
            사업자 등록번호: <input type="text" id="companyRegist" onChange={(e) => setCompanyRegist(e.target.value)} /> <br />
            대표자명: <input type="text" id="companyPregident" onChange={(e) => setCompanyPregident(e.target.value)} /> <br />
            도메인: <input type="text" id="companyDomain" onChange={(e) => setCompanyDomain(e.target.value)} /> <br />
            회사주소: <input type="text" id="companyAddr" onChange={(e) => setCompanyAddr(e.target.value)} /> <br />
            홈페이지주소: <input type="text" id="companyHomepage" onChange={(e) => setCompanyHomepage(e.target.value)} /><br />
            <button type="button" onClick={() => insertCompany()}>추가</button>

        </div>
    )

})
export default CompanyInsert;