import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillOctagonFill } from "react-icons/bs";
import { TfiClose } from 'react-icons/tfi'
import "./css/CompanyInsert.css";

import ZippopupDom from "./zipcode/ZippopupDom";
import ZippopupPostCode from './zipcode/ZippopupZipCode';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css?a';
import SaveCompanyAlert from '../alert/SaveCompanyAlert';
import SaveFailCompanyAlert from '../alert/SaveFailCompanyAlert';
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
    let [companyClosingDay, setCompanyClosingday] = useState("");
    let [useYN, setUseYN] = useState("N");
    let [areaCode, setAreaCode] = useState("");
    let [companyFax, setCompanyFax] = useState("");
    let [companyZipCode, setCompanyZipCode] = useState("");
    let [companyForeigner, setCompanyForeigner] = useState("내국인");
    let [address, setAddress] = useState("");
    let [zipcodeIsOpen, setZipcodeIsOpen] = useState();
    let [pcBuisness, setPcBuisness] = useState("법인");
    let [codeDupliCheck, setCodeDupliCheck] = useState(1);
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
        "companyClosingDay": companyClosingDay,
        "useYN": useYN,
        "companyFax": companyFax,
        "companyZipCode": companyZipCode,
        "companyForeigner": companyForeigner,
        "pcBuisness": pcBuisness
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
            .catch(error => console.log(error));
    }

    //클래스 이름을 바꾸기 위함(css 동적으로 변경)
    let [callStyle, setCallStyle] = useState(false);
    let [faxStyle, setFaxStyle] = useState(false);
    let [registStyle, setRegistStyle] = useState(false);
    let [corporateStyle, setCorporateStyle] = useState(false);

    let [allCheck, setAllCheck] = useState(false);
    let [notRequire, setNotRequire] = useState();
    let [checked, setChecked] = useState(0);
    useEffect(() => {
        setCompanyAddr(address);
    }, [address])
    //값이 바뀔때마다 유효성 검사를 하기 위함
    useEffect(() => {

        companyCall < 0 ? companyCall = '' : PhoneNumberCheck(companyCall) ? setCallStyle(true) : setCallStyle(false);

    }, [companyCall])

    useEffect(() => {

        companyFax < 0 ? companyFax = '' : FaxNumberCheck(companyFax) ? setFaxStyle(true) : setFaxStyle(false);

    }, [companyFax])

    useEffect(() => {

        companyRegist < 0 ? companyRegist = '' : registNumberCheck(companyRegist) ? setRegistStyle(true) : setRegistStyle(false);

    }, [companyRegist])

    useEffect(() => {

        companyCorporate < 0 ? companyCorporate = '' : corporateNumberCheck(companyCorporate) ?
            setCorporateStyle(true) : setCorporateStyle(false);

    }, [companyCorporate])

    //중복체크
    useEffect(() => {
        if (companyCode.length == 4) {
            axios.get(`${baseUrl}/company/info/check/${companyCode}`)
                .then(res => setCodeDupliCheck(res.data))
                .catch(error => console.log(error))
        }
    }, [companyCode])

    //모든 필수 사항이 제대로 입력되었을 때 저장
    function AllCheck() {
        setChecked(checked + 1);
        if (codeDupliCheck === 1 || companyCode.length !== 4) {
            setNotRequire(<SaveFailCompanyAlert />)
            return false;
        }
        if (companyName.length === 0) {
            setNotRequire(<SaveFailCompanyAlert />)
            return false;
        }
        if (companyBusiness.length === 0) {
            setNotRequire(<SaveFailCompanyAlert />)
            return false;
        }
        if (companyItem.length === 0) {
            setNotRequire(<SaveFailCompanyAlert />)
            return false;
        }
        if (registNumberCheck(companyRegist) === false) {
            setNotRequire(<SaveFailCompanyAlert />)
            return false;
        }
        if (corporateNumberCheck(companyCorporate) === false) {
            setNotRequire(<SaveFailCompanyAlert />)
            return false;
        }
        if (companyPresident.length === 0) {
            setNotRequire(<SaveFailCompanyAlert/>);
            return false;
        }
        if (companyAddr.length === 0) {
            setNotRequire(<SaveFailCompanyAlert />)
            return false;
        }
        setAllCheck(true);
        return true;
    }
    return (
        <div>
            <div className="infoheader">
                <b className="littletitle"> <BsFillOctagonFill /> 회사추가</b>
                <div>
                    <button className="insertbutton"
                        type="button" onClick={() => AllCheck()}
                    >추가</button>
                    <button className="infoclosebutton" onClick={() => props.setAddflag(false)}> <TfiClose /></button>
                    {
                        allCheck && <SaveCompanyAlert setAllCheck={setAllCheck}
                            insertCompany={insertCompany}
                            setAddflag={props.setAddflag} />
                    }
                    {notRequire}
                </div>
            </div>

            {/* <div id="companyinfo"></div> */}
            <table className="company-table">
                <thead></thead>
                <tbody>
                    <tr>
                        <td className="company-table-title">회사 코드</td>
                        <td className="company-table-content"><Form.Control
                            placeholder="회사 코드를 입력해 주십시오."
                            onChange={e => {
                                setCompanyCode(codeNumber(e.target.value));
                            }}
                            isValid={companyCode.length < 4 ? false : codeDupliCheck === 1 ? false : true}
                            isInvalid={companyCode.length < 4 ? checked > 0 ? true : false : codeDupliCheck === 1 ? true : false}
                            value={companyCode}
                            Style="z-index: 0; background-color:#ffe9e9"
                        /></td>
                        <td className="company-table-title">사용 여부</td>
                        <td>
                            <div className="company-table-td-twocontent">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    onChange={() => { useYN === "N" ? setUseYN("Y") : setUseYN("N"); }}
                                />
                                {useYN === "Y" ? (<b>사    용</b>) : (<b>미사용</b>)}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="company-table-title">회사 이름</td>
                        <td colSpan={3} className="company-table-content"><Form.Control
                            placeholder="회사 이름을 입력해 주십시오."
                            onChange={e => setCompanyName(e.target.value)}
                            Style="z-index: 0; background-color:#ffe9e9"
                            isValid={checked > 0 ? true : false}
                            isInvalid={checked < 1 ? false : companyName.length > 0 ? false : true}
                        /></td>
                    </tr>
                    <tr>
                        <td className="company-table-title">업태</td>
                        <td className="company-table-content"><Form.Control
                            placeholder="회사 업태를 입력해 주십시오."
                            onChange={e => setCompanyBusiness(e.target.value)}
                            isValid={checked > 0 ? true : false}
                            isInvalid={checked < 1 ? false : companyBusiness.length > 0 ? false : true}
                            Style="z-index:0; background-color:#ffe9e9"
                        />
                        </td>

                        <td className="company-table-title">종목</td>
                        <td className="company-table-content"><Form.Control
                            placeholder="회사 종목을 입력해 주십시오."
                            onChange={e => setCompanyItem(e.target.value)}
                            isValid={checked > 0 ? true : false}
                            isInvalid={checked < 1 ? false : companyItem.length > 0 ? false : true}
                            Style="z-index:0; background-color:#ffe9e9"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="company-table-title">대표 전화</td>
                        <td className="company-table-content">
                            <div className="company-table-td-twocontent">
                                <select name="area-code" className="company-select-option"
                                    onChange={(e) => setAreaCode(e.target.value)}>
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
                                <Form.Control
                                    placeholder="대표 전화를 입력해 주십시오."
                                    onChange={e => { setCompanyCall(PhoneNumber(areaCode + e.target.value)) }}
                                    value={companyCall.substring(areaCode.length)}
                                    isValid={callStyle}
                                    isInvalid={companyCall.length < 1 ? '' : callStyle ? false : true}
                                    Style="z-index:0;"
                                />
                            </div>
                        </td>
                        <td className="company-table-title">대표 팩스</td>
                        <td className="company-table-content"><Form.Control
                            placeholder="대표 팩스를 입력해 주십시오."
                            onChange={e => { setCompanyFax(FaxNumber(e.target.value)); }}
                            value={companyFax}
                            isValid={faxStyle}
                            isInvalid={companyFax.length < 1 ? '' : faxStyle ? false : true}
                            Style="z-index:0"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="company-table-title">사업자 등록번호</td>
                        <td className="company-table-content">
                            <Form.Control
                                placeholder="사업자 등록번호를 입력해 주십시오."
                                onChange={e => setCompanyRegist(registNumber(e.target.value))}
                                value={companyRegist}
                                isValid={registStyle}
                                isInvalid={companyRegist.length < 1 ? checked > 0 ? true : false : registStyle ? false : true}
                                Style="z-index:0;  background-color:#ffe9e9"
                            /></td>
                        <td className="company-table-title">법인 번호</td>
                        <td className="company-table-content">
                            <div className="company-table-td-twocontent">
                                <select className="company-select-option" onChange={e => setPcBuisness(e.target.value)}>
                                    <option value="법인" selected>법인</option>
                                    <option value="개인">개인</option>
                                </select>
                                <Form.Control
                                    placeholder="법인 번호를 입력해 주십시오."
                                    aria-describedby="basic-addon1"
                                    onChange={e => setCompanyCorporate(corporateNumber(e.target.value))}
                                    value={companyCorporate}
                                    isValid={corporateStyle}
                                    isInvalid={companyCorporate.length < 1 ? checked > 0 ? true : false : corporateStyle ? false : true}
                                    Style="z-index:0;  background-color:#ffe9e9"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="company-table-title">대표자명</td>
                        <td className="company-table-content"><Form.Control
                            placeholder="대표자명을 입력해 주십시오."
                            onChange={e => setCompanyPresident(e.target.value)}
                            isValid={checked > 0 ? true : false}
                            isInvalid={checked < 1 ? false : companyPresident.length > 0 ? false : true}
                            Style=" z-index:0; background-color:#ffe9e9"
                        /></td>
                        <td className="company-table-title">외국인 여부</td>
                        <td className="company-table-content">
                            <div className="company-table-td-twocontent">
                                <select name="area-code" className="company-select-option"
                                    onChange={(e) => setCompanyForeigner(e.target.value)}>
                                    <option value="내국인" selected>내국인</option>
                                    <option value="외국인" >외국인</option>
                                </select>
                                <Form.Control
                                    aria-describedby="basic-addon1"
                                    value={companyForeigner}
                                    readOnly
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="company-table-title">회사 주소</td>
                        <td colSpan={3} className="company-table-content">
                            <div className="company-table-td-twocontent">
                                <Form.Control
                                    value={companyZipCode}
                                    onFocus={() => {
                                        companyZipCode.length > 0 ? setZipcodeIsOpen(false) : setZipcodeIsOpen(true);
                                    }}
                                    isValid={checked > 0 ? true : false}
                                    isInvalid={checked < 1 ? false : companyZipCode.length > 0 ? false : true}
                                    Style="background-color:#ffe9e9; z-index:0; #ffe9e9; width: 200px"
                                />
                                <button className="addressnumbtn" type="button" onClick={() => setZipcodeIsOpen(true)}>우편번호 검색
                                </button>
                            </div>

                            <div id="zippopupdom">
                                {
                                    zipcodeIsOpen && (
                                        <ZippopupDom>
                                            <ZippopupPostCode
                                                onClose={setZipcodeIsOpen}
                                                setCompanyZipCode={setCompanyZipCode}
                                                setAddress={setAddress}
                                            />
                                        </ZippopupDom>
                                    )
                                }
                            </div>
                            <div className="company-table-td-address">
                                <div className="company-table-td-address-input">

                                    <Form.Control
                                        onFocus={() =>
                                            address.length === 0 && setZipcodeIsOpen(true)
                                        }
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value); }}
                                        Style=" z-index:0; background-color:#ffe9e9"
                                        isValid={checked > 0 ? true : false}
                                        isInvalid={checked < 1 ? false : address.length > 0 ? false : true}
                                        readOnly
                                    />
                                </div>
                                <div className="company-table-td-address-input">
                                    <Form.Control
                                        placeholder="상세 주소를 입력해 주십시오."
                                        onChange={e => { setCompanyAddr(address + " " + e.target.value) }}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="company-table-title">홈페이지 주소</td>
                        <td className="company-table-content">
                            <Form.Control
                                placeholder="홈페이지 주소를 입력해 주십시오."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyHomepage(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="company-table-title">설립일</td>
                        <td className="company-table-content">
                            <input type="date" onChange={e => setCompanyEstablish(e.target.value)} />
                        </td>
                        <td className="company-table-title">폐업일</td>
                        <td className="company-table-content">
                            <input type="date" onChange={e => setCompanyClosingday(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

})

//자동으로 하이픈 삽입
function PhoneNumber(value) {
    if (!value) {
        return "";
    }

    value = value.replace(/[^0-9]/g, "");

    let result = [];
    let restNumber = "";

    if (value.startsWith("02")) {
        //서울 지역번호
        result.push(value.substr(0, 2));
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

function FaxNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = [];
    let restNumber = "";

    if (value.startsWith("02")) {
        result.push(value.substring(0, 2));
        restNumber = value.substring(2);
    } else if (value.startsWith("0505") || value.startsWith("0504")) {
        result.push(value.substring(0, 4));
        restNumber = value.substring(4);
    }
    else {
        result.push(value.substring(0, 3));
        restNumber = value.substring(3);
    }

    if (restNumber.length === 7) {
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
    } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
    }
    return result.filter((val) => val).join("-");
}

function registNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = [];
    let restNumber = "";

    result.push(value.substring(0, 3));
    restNumber = value.substring(3);

    result.push(restNumber.substring(0, 2));
    restNumber = restNumber.substring(2);

    result.push(restNumber.substring(0, 5));
    restNumber = restNumber.substring(5);

    return result.filter((val) => val).join("-");
}
function corporateNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = [];
    let restNumber = "";

    result.push(value.substring(0, 6));
    restNumber = value.substring(6);

    result.push(restNumber.substring(0, 7));
    restNumber = value.substring(7);

    return result.filter(val => val).join("-");
}

function codeNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = "";
    result = value.substring(0, 4);
    return result;
}

//유효성 검사를 하기 위한 함수
function PhoneNumberCheck(value) { //대표번호 유효성 검사
    const check = /^0[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/;
    return check.test(value);
}

function FaxNumberCheck(value) {
    const check = /(^02[0-9]{0}|^01[0-9]{1}|050[0-9]{1}|[0-9]{3})-[0-9]{3,4}-[0-9]{4}$/;
    return check.test(value);
}

function registNumberCheck(value) {
    const check = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
    return check.test(value);
}

function corporateNumberCheck(value) {
    const check = /^[0-9]{6}-[0-9]{7}$/;
    return check.test(value);
}

export default CompanyInsert;