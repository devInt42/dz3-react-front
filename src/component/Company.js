import { useEffect, useState } from "react";
import axios from 'axios';
import CompanyList from './CompanyList';
import "../css/Company.css";
import { GrAddCircle } from "react-icons/gr";
import { GiCancel } from "react-icons/gi"
import CompanyNotSelect from "./CompanyNotSelect";
import CompanyInsert from "./CompanyInsert";



const Company = () => {
    let [companydata, setCompanydata] = useState([]);
    const baseUrl = "http://localhost:8080";
    let [addflag, setAddflag] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}/company/info`)
            .then(res => setCompanydata(res.data))
            .catch(error => console.log(error))
    }, [companydata])


    
    const addorcancel = () => {
        if (!addflag) {
            return (
                <span id="addfont"><GrAddCircle />추가</span>
            )
        }
        if (addflag) {
            return (
                <span id="addfont"><GiCancel />취소</span>
            )
        }
    }
    return (

        companydata &&
        <div>
            <h2>회사 정보</h2>
            <hr class="line"></hr>
            <div id="companyform">
                <div>
                    <CompanyList />
                    <div id="idaddbox">
                        <button id="idaddbutton" onClick={() => setAddflag(!addflag)}>
                            {addorcancel()}
                        </button>
                    </div>
                </div>
                {
                addflag === false ? 
                <div id="companynotselectform">
                    <div>
                        <CompanyNotSelect />
                    </div>
                </div> 
                :
                <div class = "companyinfo">
                    <CompanyInsert setAddflag = {setAddflag}/>
                </div>
                 }
            </div>
        </div>
    )
}

export default Company;