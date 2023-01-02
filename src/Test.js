import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Test() {
    const [hello,setHello] = useState('')
    const baseUrl = "http://localhost:8080";
    useEffect( () => {

        axios.get('/api/company/companyList')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    function searchOne(){
        const url = baseUrl+"/api/company/3";
        axios({
            method:"get", url:url,
        }).then((res)=> {
            console.log(res.data)
        }).catch((error)=> {
            console.log(error);
        })
    }

    function remove(){
        const url = baseUrl+"/api/company/users/3";
        axios({
            method:"delete", url:url,
        }).then((res)=>{
            console.log("success");
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <>
         백엔드에서 가져온 데이터입니다 : {JSON.stringify(hello)}
         <div>
            <button onClick={remove}>delete</button>
            <button onClick={searchOne}>searchOne</button>
        </div>
        </>
        
    );
}

export default Test;