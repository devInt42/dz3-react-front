import {useEffect, useState} from "react";
import axios from 'axios';


const Company = () => {
    let [companydata, setCompanydata] = useState([]);
    const baseUrl = "http://localhost:8080";
    

    useEffect( () => {
        console.log("company 페이지입니다.")
        axios.get(`${baseUrl}/api/company/info`)
        .then(res => setCompanydata(res.data))
        .catch(error => console.log(error))
    }, [])

    const deletecompany = (company_code) => {
        axios.get(`${baseUrl}/api/company/delete/${company_code}`)
    }
    return (
        <div>
            <h1>회사 정보</h1>
            <br/>
            <br/>
            <table border = "1">
                <th>회사 코드</th>
                <th>회사 이름</th>
                <th>업태</th>
                <th>대표자명</th>
                <th>주소</th>
                {companydata.map((company) => {
                    return(
                            <tr>
                                <td>{company.company_code}</td><td>{company.company_name}</td>
                                <td>{company.company_category}</td>
                                <td>{company.company_president}</td><td>{company.company_addr}</td>
                                <td><button onClick = {() => deletecompany(company.company_code)}>삭제</button></td>
                            </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Company;