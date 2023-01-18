import { useState } from "react";
import CompanyList from './CompanyList';
import "./css/Company.css";
import { GrAddCircle } from "react-icons/gr";
import { GiCancel } from "react-icons/gi"
import CompanyNotSelect from "./CompanyNotSelect";
import CompanyDetail from "./CompanyDetail";


const Company = () => {
    const [addflag, setAddflag] = useState(false);
    const [detailFlag, setDetailFlag] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [companySeq, setCompanySeq] = useState();
   
    
    return (
        <div>
            <h2>회사 정보</h2>
            <hr className="line"></hr>
            <div id="companyform">
                <div>
                    <CompanyList setDetailFlag={setDetailFlag} setCompanySeq={setCompanySeq} />
                    <div id="idaddbox">
                        <button id="idaddbutton" onClick={() => {setDetailFlag(!detailFlag);
                              companySeq && setDetailFlag(true);
                              setCompanySeq();}}>
                            {addorcancel(detailFlag, companySeq)}
                        </button>
                    </div>
                </div>
                {(detailFlag === false) &&
                    <div id="companynotselectform">
                        <div>
                            <CompanyNotSelect />
                        </div>
                    </div>
                }

                {
                    detailFlag &&
                    <div className = "company-info">
                        <CompanyDetail setDetailFlag = {setDetailFlag} companySeq = {companySeq} setRefresh = {setRefresh}/>
                    </div>
                }

            </div>
        </div>
    )
}
const addorcancel = (addflag, companySeq) => {
    if (!addflag || companySeq) {
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