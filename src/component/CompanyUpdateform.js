import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CompanyUpdateform = () => {

    let {companyCode} = useParams();
    let [companyInfo, setCompanyInfo] = useState({});
    const baseUrl = "http://localhost:8080";
    useEffect(()=> {
        axios.get(`${baseUrl}/api/company/info/${companyCode}`)
        .then(res => setCompanyInfo(res.data))
        .catch(error => console.log(error));
    },[])
    
    let [companyName, setCompanyName] = useState(Object.values(companyInfo)[1]);
    let [companyCategory, setCompanyCategory] = useState(Object.values(companyInfo)[2]);
    let [companyCall, setCompanyCall] = useState(Object.values(companyInfo)[3]);
    let [companyRegist, setCompanyRegist] = useState(Object.values(companyInfo)[4]);
    let [companyPregident, setCompanyPregident] = useState(Object.values(companyInfo)[5]);
    let [companyDomain, setCompanyDomain] = useState(Object.values(companyInfo)[6]);
    let [companyAddr, setCompanyAddr] = useState(Object.values(companyInfo)[7]);
    let [companyHomepage, setCompanyHomepage] = useState(Object.values(companyInfo)[8]);


    
    
    
    console.log(companyInfo);
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
    
    return (
    <div>
            회사명:<input type = "text" defaultValue = {Object.values(companyInfo)[1]} 
            onChange = {e => {setCompanyName(e.target.value)}}></input>
            업태:<input type = "text" defaultValue = {Object.values(companyInfo)[2]}
            onChange = {e => {setCompanyCategory(e.target.value)}}></input>
            전화번호:<input type = "text" defaultValue = {Object.values(companyInfo)[3]}
            onChange = {e => {setCompanyCall(e.target.value)}}></input>
            사업자등록번호:<input type = "text" defaultValue = {Object.values(companyInfo)[4]}
            onChange = {e => {setCompanyRegist(e.target.value)}}></input>
            대표자명:<input type = "text" defaultValue = {Object.values(companyInfo)[5]}
            onChange = {e => {setCompanyPregident(e.target.value)}}></input>
            도메인주소:<input type = "text" defaultValue = {Object.values(companyInfo)[6]}
            onChange = {e => {setCompanyDomain(e.target.value)}}></input>
            주소:<input type = "text" defaultValue = {Object.values(companyInfo)[7]}
            onChange = {e => {setCompanyAddr(e.target.value)}}></input>
            홈페이지주소:<input type = "text" defaultValue = {Object.values(companyInfo)[8]}
            onChange = {e => {setCompanyHomepage(e.target.value)}}></input>
            <button type = "button" onClick = {()=> {updateCompanyInfo(data,companyCode)}}>수정</button>
            
        </div>
    )
}

function updateCompanyInfo(data,companyCode) {
    const baseUrl = "http://localhost:8080";
    console.log(data);
    axios.post(`${baseUrl}/api/company/update/${companyCode}`,JSON.stringify(data), {
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .catch(error => console.log(error))
}

export default CompanyUpdateform;