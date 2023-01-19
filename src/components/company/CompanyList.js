import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
function CompanyList(props) {
    const baseUrl = "http://localhost:8080";
    const [company, setCompany] = useState();
    const [searchcompanyCode, setSearchCompanyCode] = useState(0);
    const [searchcompanyName, setSearchCompanyName] = useState("");
    const [searchuseYN, setSearchUseYN] = useState("Y");
    const [searchRefresh, setSearchRefresh] = useState(0);
    useEffect(() => {
        axios.get(`${baseUrl}/company/info`)
            .then(res => setCompany(res.data))
            .catch(error => console.log(error));
    }, [props.refresh])

    function FindCompany() {
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
        .then(res => setCompany(res.data))

        setSearchRefresh(searchRefresh + 1);

    }
    useEffect(() => {
        setCompany(company);
    }, [searchRefresh])
    
    return (
        company&&
        <>
            <div>
                회사 <input type="text" placeholder='회사코드/회사명을 입력하세요.' 
                onChange={e => {
                    isNaN(e.target.value) ? (setSearchCompanyName(e.target.value) || setSearchCompanyCode(0))
                     : (setSearchCompanyCode(e.target.value) || setSearchCompanyName(""))
                }}/>
                사용여부 <select onChange={e => setSearchUseYN(e.target.value)}>
                            <option value = "Y" selected>사용</option>
                            <option value = "N">미사용</option>
                        </select>
                <button onClick = {FindCompany}>찾기</button>
            </div>
            <div className="companylistbox">
                <div className="companylistboxheader">
                    <b>회사</b> <b className="emphasisfont">{company.length}</b> <b>건</b>
                </div>
                <ul>
                    {<Listcompany company={company} setDetailFlag={props.setDetailFlag} setCompanySeq={props.setCompanySeq}
                    />}
                </ul>
            </div>
        </>
    )
}

function Listcompany(props) {
    const [companyIndex, setCompanyIndex] = useState();

    return (
       props.company && <>
            {
                props.company.map((company, idx) => {
                    return (
                        <div className={`${companyIndex}` === `${idx}` ? 'box active' : 'box companylistmenu'}
                            onClick={() => {
                                props.setCompanySeq(company.companySeq);
                                props.setDetailFlag(true);
                            }}>
                            <li>{company.companyCode}{company.companyName}
                                {company.companyPresident}{company.pcBuisness}</li>
                        </div>
                    )
                })
            }
        </>
    )
}

export default CompanyList;