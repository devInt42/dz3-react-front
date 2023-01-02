import {useEffect, useState} from "react";
import axios from 'axios';


const Company = () => {
    let [companydata, setCompanydata] = useState([]);
    
    useEffect( () => {
        console.log("company 페이지입니다.")
        axios.get("/api/company/info")
        .then(res => setCompanydata(res.data))
        .catch(error => console.log(error))
        
    }, [])

    return (
        <div>
            <h1>회사 정보</h1>
            <br/>
            <br/>
            <table border = "1">
                <th>회사 코드</th>
                <th>회사 이름</th>
                <th>회사 약칭</th>
                <th>설립일</th>
                <th>폐업일</th>
                {companydata.map((company) => {
                    return(
                        
                            <tr>
                                <td>{company.company_code}</td><td>{company.company_name}</td>
                                <td>{company.company_abbreviation}</td>
                                <td>{company.company_startdate}</td><td>{company.company_close}</td>
                            </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Company;