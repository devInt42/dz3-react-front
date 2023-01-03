import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
const CompanyDetail = () => {
    let {companyCode} = useParams();
    const baseUrl = "http://localhost:8080";
    let [companyInfo, setCompanyInfo] = useState();

    useEffect( () => {
        axios.get(`${baseUrl}/api/company/info/${companyCode}`)
        .then(res => setCompanyInfo(res.data))
        .catch(error => console.log(error));
        // console.log(Object.keys(companyInfo));
    },[])
    

    return (
        companyInfo && <div>
            <h2>11번 회사</h2>
            <div>
                <table border = "1">
                    <th>회사 코드</th>
                    <th>회사 명</th>
                    <th>업태</th>
                    <th>전화번호</th>
                    <th>사업자등록번호</th>
                    <th>대표자명</th>
                    <th>도메인</th>
                    <th>주소</th>
                    <th>홈페이지주소</th>
                    <tr>
                        <td>{Object.values(companyInfo)[0]}</td>
                        <td>{Object.values(companyInfo)[1]}</td>
                        <td>{Object.values(companyInfo)[2]}</td>
                        <td>{Object.values(companyInfo)[3]}</td>
                        <td>{Object.values(companyInfo)[4]}</td>
                        <td>{Object.values(companyInfo)[5]}</td>
                        <td>{Object.values(companyInfo)[6]}</td>
                        <td>{Object.values(companyInfo)[7]}</td>
                        <td>{Object.values(companyInfo)[8]}</td>
                        <td>{Object.values(companyInfo)[9]}</td>
                        
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default CompanyDetail;