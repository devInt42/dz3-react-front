import axios from 'axios';
import { useState, useEffect } from 'react';

const DepartmentSearch = (props) => {


    const baseUrl = "http://localhost:8080";

    const [searchcompanyCode, setSearchCompanyCode] = useState(0);
    const [searchcompanyName, setSearchCompanyName] = useState("");

    function FindDepartment() {
        const companycode = searchcompanyCode;
        const companyname = searchcompanyName;
        const useyn = searchuseYN;
        axios.get(`${baseUrl}/company/find`, {
            params: {
                companycode: companycode,
                companyname: companyname,
                useyn: useyn
            }
        })
        .then(res => props.setSearchData(res.data))
    }

    return (
        <div>
            회사 <input type="text" placeholder='회사코드/회사명을 입력하세요.'
                onChange={e => {
                    isNaN(e.target.value) || e.target.value === '' ? (setSearchCompanyName(e.target.value) || setSearchCompanyCode(0))
                        : (setSearchCompanyCode(e.target.value) || setSearchCompanyName(""))
                }} />
            사용여부 <select onChange={e => setSearchUseYN(e.target.value)}>
                <option value="" selected>선택</option>
                <option value="Y">사용</option>
                <option value="N">미사용</option>
            </select>
            <button onClick={()=> {FindCompany();}}>찾기</button>
        </div>
    )
}

export default DepartmentSearch;