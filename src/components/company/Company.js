import { useEffect, useState } from "react";
import axios from 'axios';
import CompanyList from './CompanyList';
import "./css/Company.css";
import { GrAddCircle } from "react-icons/gr";
import { GiCancel } from "react-icons/gi"
import CompanyNotSelect from "./CompanyNotSelect";
import CompanyInsert from "./CompanyInsert";
import CompanyDetail from "./CompanyDetail";


const Company = () => {
    let [companydata, setCompanydata] = useState([]);
    const baseUrl = "http://localhost:8080";
    let [addflag, setAddflag] = useState(false);
    let [detailFlag, setDetailFlag] = useState(false);

    let [companySeq, setCompanySeq] = useState(0);
    useEffect(() => {
        axios.get(`${baseUrl}/company/info`)
            .then(res => setCompanydata(res.data))
            .catch(error => console.log(error))
    }, [])
    
    return (
        companydata &&
        <div>
            <h2>회사 정보</h2>
            <hr className="line"></hr>
            <div id="companyform">
                <div>
                    <CompanyList setDetailFlag={setDetailFlag} setCompanySeq= {setCompanySeq} />
                    <div id="idaddbox">
                        <button id="idaddbutton" onClick={() => setAddflag(!addflag)}>
                            {addorcancel(addflag)}
                        </button>
                    </div>
                </div>
                {(addflag === false && detailFlag === false) &&
                    <div id="companynotselectform">
                        <div>
                            <CompanyNotSelect />
                        </div>
                    </div>
                }

                {
                    addflag &&
                    <div className="company-info">
                        <CompanyInsert setAddflag={setAddflag} />
                    </div>
                }

                {
                    detailFlag &&
                    <div className = "company-info">
                        <CompanyDetail setDetailFlag = {setDetailFlag} companySeq = {companySeq}/>
                    </div>
                }

            </div>
        </div>
    )
}
const addorcancel = (addflag) => {
    if (!addflag) {
        return (
            <span id="addfont"><GrAddCircle/>추가</span>
        )
    }
    if (addflag) {
        return (
            <span id="addfont"><GiCancel/>취소</span>
        )
    }
}
export default Company;