import axios from 'axios';
import { useState, useEffect } from 'react';

const DepartmentSearch = (props) => {


    const baseUrl = "http://localhost:8080";

    const [searchName, setSearchName] = useState(null);
    const [companyList, setCompanyList] = useState([]);
    const [company, setCompany] = useState();
    const [searchCompanySeq, setSearchCompanySeq] = useState(0);
    useEffect(() => {
        if (JSON.parse(window.sessionStorage.getItem("empInfo")).employeeSeq === 999) {
            axios.get(`${baseUrl}/department/list/company`)
                .then(res => setCompanyList(res.data))
                .catch(error => console.log(error))
        }
        else {
            axios.get(`${baseUrl}/company/info/${JSON.parse(window.sessionStorage.getItem("empInfo")).companySeq}`)
                .then(res => setCompany(res.data))
                .catch(error => console.log(error))
            props.setCompanySeq(JSON.parse(window.sessionStorage.getItem("empInfo")).companySeq);
        }
    }, [props])
    function FindDepartment() {
        const param =
        {
            "searchName": searchName,
            "searchCompanySeq": props.companySeq != 0 ? props.companySeq : JSON.parse(window.sessionStorage.getItem("empInfo")).companySeq
        }
        console.log(param);
        axios.get(`${baseUrl}/department/find`, {
            params: param
        })
            .then(res => props.setSearchData(res.data))
        props.setSearch(true);
    }

    return (
        companyList && <div>
            회사 <input type="text" placeholder='코드/사업장/부서명을 입력하세요.'
                onChange={e => { setSearchName(e.target.value) }} />
            <select
                onChange={e => { setSearchCompanySeq(e.target.value); props.setCompanySeq(e.target.value) }}
            >
                <option disabled>-회사 선택-</option>
                {
                    companyList.length > 0 ?
                        companyList.map((company, idx) => {
                            return (
                                <option key={idx} value={company.companySeq}
                                    >{company.companyName}</option>
                            )
                        })
                        :
                        company && <option value={company.companySeq}>{company.companyName}</option>
                }
            </select>
            <button onClick={() => { FindDepartment() }}>찾기</button>
        </div>
    )
}

export default DepartmentSearch;