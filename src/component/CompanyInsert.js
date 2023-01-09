import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { BsFillOctagonFill } from "react-icons/bs";
import { TfiClose } from 'react-icons/tfi'
import lodash from "lodash";
// import { IoMdArrowDropdown } from "react-icons/io";
import "../css/CompanyInsert.css";

import ZippopupDom from "./zipcode/ZippopupDom"; 
import ZippopupPostCode from './zipcode/ZippopupZipCode';
const CompanyInsert = ((props) => {

    let [companyCode, setCompanyCode] = useState("");
    let [companyName, setCompanyName] = useState("");
    let [companyBusiness, setCompanyBusiness] = useState("");
    let [companyItem, setCompanyItem] = useState("");
    let [companyCall, setCompanyCall] = useState("");
    let [companyRegist, setCompanyRegist] = useState("");
    let [companyCorporate, setCompanyCorporate] = useState("");
    let [companyPresident, setCompanyPresident] = useState("");
    let [companyHomepage, setCompanyHomepage] = useState("");
    let [companyAddr, setCompanyAddr] = useState("");
    let [companyEstablish, setCompanyEstablish] = useState("");
    let [companyClosingday, setCompanyClosingday] = useState("");
    let [flag, setFlag] = useState(0);
    let [areaCode, setAreaCode] = useState("");
    let [companyFax, setCompanyFax] = useState("");
    let [companyZipCode, setCompanyZipCode] = useState("");
    let [companyForeigner, setCompanyForeigner] = useState("");
    let [address, setAddress] = useState("");
    let [zipcodeIsOpen, setZipcodeIsOpen] = useState(false);

    const data = {  // 서버로 보낼 데이터
        "companyCode": companyCode,
        "companyName": companyName,
        "companyBusiness": companyBusiness,
        "companyItem": companyItem,
        "companyCall": companyCall,
        "companyRegist": companyRegist,
        "companyCorporate": companyCorporate,
        "companyPresident": companyPresident,
        "companyHomepage": companyHomepage,
        "companyAddr": companyAddr,
        "companyEstablish": companyEstablish,
        "companyClosingday": companyClosingday,
        "flag": flag,
        "companyFax": companyFax,
        "companyZipCode": companyZipCode,
        "companyForeigner": companyForeigner
    }
    const baseUrl = "http://localhost:8080";

    async function insertCompany() {  //회사 추가
        await axios.post(
            `${baseUrl}/company/insert`
            , JSON.stringify(data)
            ,
            {
                headers: {
                    "Content-Type": 'application/json'
                },
            })
            .then(res => console.log(res.data))
            .catch(error => console.log(error));
    }

    let [callStyle, setCallStyle] = useState(false);
    useEffect(() => {
        
        if(companyCall.length > 0) {
            PhoneNumberCheck(companyCall) ? setCallStyle(true) : setCallStyle(false);
        }
        console.log(callStyle)
    },[companyCall])

    return (
        <div>
            <div className="infoheader">
                <b className="littletitle"> <BsFillOctagonFill /> 기본정보</b>
                <div>
                    <button type="button" onClick={() => {insertCompany();}}>추가</button>
                    <button className="infoclosebutton" onClick={() => props.setAddflag(false)}> <TfiClose /></button>
                </div>
            </div>
            <div id="companyinfo">
                <div className="info-row">
                    <div className="infoform">
                        <div className="info-title">회사코드</div>
                        <input
                            type="text" className="inputtag"
                            onChange={e => setCompanyCode(e.target.value)}
                        />
                    </div>
                    <div className="infoform">
                        <div className="info-title-radio">사용 여부</div>
                        <div className="radio-box">
                            &nbsp;&nbsp;&nbsp;
                            <input type="radio" name="flagcheck" onClick={() => setFlag(0)} checked />
                            <b className="radio-font">사용</b> &nbsp;&nbsp;&nbsp;
                            <input type="radio" name="flagcheck" onClick={() => setFlag(1)} />
                            <b className="radio-font">미사용</b>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="oneinfoform">
                        <div className="info-title-one">회사 이름</div>
                        <input
                            type="text" className="inputtag requireinput"
                            onChange={e => setCompanyName(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <div className="info-title">업태</div>
                        <input className="inputtag" type="text" onChange={e => setCompanyBusiness(e.target.value)} /> <br />
                    </div>
                    <div className="infoform">
                        <div className="info-title">종목</div>
                        <input className="inputtag" type="text" onChange={e => setCompanyItem(e.target.value)} />
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <div className="info-title">대표 전화</div>
                        <div className="area-code-box">
                            <select name="area-code" className="area-code" onChange={(e) => setAreaCode(e.target.value)}>
                                <option value="" selected>직접 입력</option>
                                <option value="010-">010</option>
                                <option value="02-">02</option>
                                <option value="031-">031</option>
                                <option value="032-">032</option>
                                <option value="033-">033</option>
                                <option value="041-">041</option>
                                <option value="042-">042</option>
                                <option value="043-">043</option>
                                <option value="044-">044</option>
                                <option value="051-">051</option>
                                <option value="052-">052</option>
                                <option value="053-">053</option>
                                <option value="054-">054</option>
                                <option value="055-">055</option>
                                <option value="061-">061</option>
                                <option value="062-">062</option>
                                <option value="063-">063</option>
                                <option value="064-">064</option>
                            </select>
                        </div>
                        <input 
                        className={`inputtag companynum ${companyCall.length === 0 ? '' : callStyle ? 'successcall' : 'failcall'}`}
                        type="text"  id = "companycall"
                        onChange={e => {setCompanyCall(PhoneNumber(areaCode + e.target.value))}}
                        value = {companyCall.substring(areaCode.length)}
                        placeholder="대표전화를 입력해 주십시오."
                        />
                    </div>
                    <div className="infoform">
                        <div className="info-title">대표 팩스</div>
                        <input className="inputtag" type="text" onChange={e => setCompanyFax(e.target.value)}
                            placeholder="대표팩스를 입력해 주십시오."
                        />
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <div className="info-title">사업자등록번호</div>
                        <input className="inputtag" type="text" onChange={e => setCompanyRegist(e.target.value)} />
                    </div>
                    <div className="infoform">
                        <div className="info-title">법인 번호</div>
                        <input className="inputtag" type="text" onChange={e => setCompanyCorporate(e.target.value)} />
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <div className="info-title">대표자명</div>
                        <input className="inputtag" type="text" onChange={e => setCompanyPresident(e.target.value)} />
                    </div>
                    <div className="infoform">
                        <div className="info-title">외국인 여부</div>
                        <input className="inputtag" type="text" onChange={e => setCompanyForeigner(e.target.value)} />
                    </div>
                </div>
                <div></div>
                <div className="info-row">
                    <div className="oneinfoform addressform">
                        <div className="info-title-one addresstitle">회사 주소</div>
                        <div className="addressinfo">
                            <div className="address">
                                <input className="messagenum" value = {companyZipCode} onFocus = {() => setZipcodeIsOpen(true)}/> 
                                <button className="addressnumbtn" type = "button" onClick = {() => setZipcodeIsOpen(true)}>우편번호 검색</button>
                            </div>
                            <div id ="zippopupdom">
                            {
                                zipcodeIsOpen && (
                                <ZippopupDom>
                                    <ZippopupPostCode 
                                    onClose = {setZipcodeIsOpen}
                                    setCompanyZipCode = {setCompanyZipCode}
                                    setAddress = {setAddress}
                                    />
                                </ZippopupDom>
                                )
                            }
                            </div>
                            <div className="address">
                                <input className="inputtag addressinput" value = {address} 
                                onFocus = {() => setZipcodeIsOpen(true)}
                                readOnly />
                                <input className="inputtag addressinput" 
                                onChange={e => { setCompanyAddr(address + " " + e.target.value) }} 
                                placeholder = "상세 주소를 입력해 주십시오."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "info-row">
                    <div className = "oneinfoform">
                        <div className = "info-title-one">홈페이지 주소</div>
                        <input className ="inputtag" onChange = {e => setCompanyHomepage(e.target.value)}/>
                    </div>
                </div>
                <div className = "info-row">
                    <div className = "infoform">
                        <div className = "info-title">설립일</div>
                        <input type = "date" onChange = {e => setCompanyEstablish(e.target.value)}/>
                    </div>
                    <div className = "infoform">
                        <div className = "info-title">폐업일</div>
                        <input type = "date" onChange = {e => setCompanyClosingday(e.target.value)} />
                    </div>
                </div>
                

            </div>
        </div>
    )
    
})

function PhoneNumber(value) {
    if(!value) {
        return "";
    }

    value = value.replace(/[^0-9]/g,"");

    let result = [];
    let restNumber = "";

    //지역 번호가 없는 경우
    if(value.startsWith("02")) {
        //서울 지역번호
        result.push(value.substr(0,2));
        restNumber = value.substring(2);
    }
    else if (value.startsWith("1")) {
        // 지역 번호가 없는 경우
        // 1xxx-yyyy
        restNumber = value;
      } else {
        // 나머지 3자리 지역번호
        // 0xx-yyyy-zzzz
        result.push(value.substr(0, 3));
        restNumber = value.substring(3);
      }
    
      if (restNumber.length === 7) {
        // 7자리만 남았을 때는 xxx-yyyy
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
      } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
      }
      return result.filter((val) => val).join("-");
}

function PhoneNumberCheck(value) {
    const check = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    return check.test(value);
}



export default CompanyInsert;