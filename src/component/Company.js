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
            <h1>hello</h1>
            <h2>123123{JSON.stringify(companydata)}</h2>
        </div>
    )
}

export default Company;