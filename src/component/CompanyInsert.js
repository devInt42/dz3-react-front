import axios from 'axios';
import { useState } from 'react';
import { BsFillOctagonFill } from "react-icons/bs";
import { TfiClose } from 'react-icons/tfi'
// import { IoMdArrowDropdown } from "react-icons/io";
import "../css/CompanyInsert.css";
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
    let [zipCode, setZipCode] = useState("");
    let [address, setAddress] = useState("");
    const data = {
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
        "companyFax": companyFax
    }

    const baseUrl = "http://localhost:8080";

    async function insertCompany() {
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
    return (
        <div>
            <div class="infoheader">
                <b class="littletitle"> <BsFillOctagonFill /> 기본정보</b>
                <div>
                    <button type="button" onClick={() => insertCompany()}>추가</button>
                    <button class="infoclosebutton" onClick={() => props.setAddflag(false)}> <TfiClose /></button>
                </div>
            </div>
            <div id="companyinfo">
                <div class="info-row">
                    <div class="infoform">
                        <div class="info-title">회사코드</div>
                        <input
                            type="text" class="inputtag"
                            onChange={e => setCompanyCode(e.target.value)}
                        />
                    </div>
                    <div class="infoform">
                        <div class="info-title-radio">사용 여부</div>
                        <div class="radio-box">
                            &nbsp;&nbsp;&nbsp;
                            <input type="radio" name="flagcheck" onClick={() => setFlag(0)} checked />
                            <b class="radio-font">사용</b> &nbsp;&nbsp;&nbsp;
                            <input type="radio" name="flagcheck" onClick={() => setFlag(1)} />
                            <b class="radio-font">미사용</b>
                        </div>
                    </div>
                </div>
                <div class="info-row">
                    <div class="oneinfoform">
                        <div class="info-title-one">회사 이름</div>
                        <input
                            type="text" class="inputtag requireinput"
                            onChange={e => setCompanyName(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div class="info-row">
                    <div class="infoform">
                        <div class="info-title">업태</div>
                        <input class="inputtag" type="text" onChange={e => setCompanyBusiness(e.target.value)} /> <br />
                    </div>
                    <div class="infoform">
                        <div class="info-title">종목</div>
                        <input class="inputtag" type="text" onChange={e => setCompanyItem(e.target.value)} />
                    </div>
                </div>
                <div class="info-row">
                    <div class="infoform">
                        <div class="info-title">대표 전화</div>
                        <div class="area-code-box">
                            <select name="area-code" class="area-code" onChange={(e) => setAreaCode(e.target.value)}>
                                <option value="" selected>직접 입력</option>
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
                        <input class="inputtag companynum" type="text" onChange={e => setCompanyCall(areaCode + e.target.value)}
                            placeholder="대표전화를 입력해 주십시오."
                        />
                    </div>
                    <div class="infoform">
                        <div class="info-title">대표 팩스</div>
                        <input class="inputtag" type="text" onChange={e => setCompanyFax(e.target.value)}
                            placeholder="대표팩스를 입력해 주십시오."
                        />
                    </div>
                </div>
                <div class="info-row">
                    <div class="infoform">
                        <div class="info-title">사업자등록번호</div>
                        <input class="inputtag" type="text" onChange={e => setCompanyRegist(e.target.value)} />
                    </div>
                    <div class="infoform">
                        <div class="info-title">법인 번호</div>
                        <input class="inputtag" type="text" onChange={e => setCompanyCorporate(e.target.value)} />
                    </div>
                </div>
                <div class="info-row">
                    <div class="infoform">
                        <div class="info-title">대표자명</div>
                        <input class="inputtag" type="text" onChange={e => setCompanyPresident(e.target.value)} />
                    </div>
                    <div class="infoform">
                        <div class="info-title">외국인 여부</div>
                        <input class="inputtag" type="text" onChange={e => setCompanyPresident(e.target.value)} />
                    </div>
                </div>
                <div></div>
                <div class="info-row">
                    <div class="oneinfoform addressform">
                        <div class="info-title-one addresstitle">회사 주소</div>
                        <div class="addressinfo">
                            <div class="address">
                                <input class="messagenum" /> <button class="addressnumbtn">우편번호</button>
                            </div>
                            <div class="address">
                                <input class="inputtag addressinput" onChange={e => { setAddress(e.target.value) }} readOnly />
                                <input class="inputtag addressinput" onChange={e => { setCompanyAddr(address + e.target.value) }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "info-row">
                    <div class = "oneinfoform">
                        <div class = "info-title-one">홈페이지 주소</div>
                        <input class ="inputtag" onChange = {e => setCompanyHomepage(e.target.value)}/>
                    </div>
                </div>
                <div class = "info-row">
                    <div class = "infoform">
                        <div class = "info-title">설립일</div>
                        <input type = "date" onChange = {e => setCompanyEstablish(e.target.value)}/>
                    </div>
                    <div class = "infoform">
                        <div class = "info-title">폐업일</div>
                        <input type = "date" onChange = {e => setCompanyClosingday(e.target.value)} />
                    </div>
                </div>
                

            </div>
        </div>
    )

})
export default CompanyInsert;