import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Company() {
    const [companyCode,setCompanyCode] = useState('');
    const [companyName,setCompanyName] = useState('');
    const [res, setRes] = useState('');
    const baseUrl = "http://localhost:8080";
 
    function CompanyList() {
        const url= baseUrl+"/api/company/companyList";
        axios({
            method:"get", url:url,
        }).then((res) => {
            console.log(res.data)
            setRes(res.data);
        })
    }

    function searchOne(){
        const url = baseUrl+"/api/company/"+ companyCode;
        axios({
            method:"get", url:url,
        }).then((res)=> {
            console.log(res.data);
            setRes(res.data);
        }).catch((error)=> {
            console.log(error);
        })
    }

    function remove(){
        const url = baseUrl+"/api/company/users/"+ companyCode;
        axios({
            method:"delete", url:url,
        }).then((res)=>{
             setRes(res.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    function update(){
        const url = baseUrl + "/api/company/users/"+ companyCode;
        const data = {
            companyCode : companyCode,
            companyName : companyName,
        };
        axios({
            method: "patch",
            url:url,
            headers: { "Content-Type": "application/json" },
            data : JSON.stringify(data),
        }).then((res)=>{
            setRes(res.data);
        }).catch((error)=>{
            console.log(error);
        });
    }

    function add(){
        const url = baseUrl + "/api/company";
        const data= {
            companyName : companyName,
        };
        axios({
            method:"post",
            url:url,
            data:JSON.stringify(data),
            headers:{ "Content-Type": "application/json" },
        }).then((res)=> {
            setRes(res.data);
        }).catch((error)=> {
            console.log(error);
        });
    }

    const changeCode = (e) => {
        setCompanyCode(e.target.value);
    };
    const changeName = (e) => {
        setCompanyName(e.target.value);
    };


    return (
        <>
         백엔드에서 가져온 데이터입니다 : {JSON.stringify(res)} <hr />
         코드 : <input type="text" onChange={changeCode} id="companyCode" />
         이름 : <input type="text" onChange={changeName} id="companyName" />
         <hr />
         <button onClick={CompanyList}>CompanyList</button>
         <button onClick={remove}>remove</button>
         <button onClick={searchOne}>searchOne</button>
         <button onClick={update}>update</button>
         <button onClick={add}>add</button>
        </>
        
    );
}

export default Company;