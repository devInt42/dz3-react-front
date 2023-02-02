import axios from 'axios';
import { useState, useEffect } from 'react';

const DepartmentSearch = (props) => {


    const baseUrl = "http://localhost:8080";

    const [searchName, setSearchName] = useState(null);
    const [searchCompanySeq, setSearchCompanySeq] = useState(0);
    const [companyList, setCompanyList] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}/department/list/company`)
        .then(res => setCompanyList(res.data))
        .catch(error => console.log(error) )
    }, [])


    function FindDepartment() {
        const param = 
            {
                "searchName": searchName,
                "searchCompanySeq": searchCompanySeq
            }
        
        axios.get(`${baseUrl}/department/find`, {
            params: param
        })
        .then(res => props.setSearchData(res.data))
            props.setSearch(true);
    }

    return (
        <div>
            회사 <input type="text" placeholder='코드/사업장/부서명을 입력하세요.'
                onChange={e => {setSearchName(e.target.value)}} />
            <select onChange={e => {setSearchCompanySeq(e.target.value); props.setCompanySeq(e.target.value)}}>
                {
                    companyList && companyList.map((company) => {
                        return (
                        <option key = {company.companySeq} value = {company.companySeq}>{company.companyName}</option>
                        )
                    })
                }
            </select>
             <button onClick={() => {FindDepartment()}}>찾기</button>
        </div>
    )
}

export default DepartmentSearch;