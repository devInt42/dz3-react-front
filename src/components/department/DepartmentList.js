import { useEffect, useState } from "react";
import axios from 'axios';
import CompanyData from "./CompanyData";
const DepartmentList = () => {
    return (
        <>
            <CompanyData/>
        </>
    )
    
}

const ListDepartment = () => {
    const baseUrl = "http://localhost:8080";
    return (
        <>
            <div>
                
            </div>
        </>
    )
}

export default DepartmentList;