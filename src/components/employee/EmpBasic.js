import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ZippopupPostCode from "./zipcode/ZippopupZipCode";
import ZippopupDom from "./zipcode/ZippopupDom";
import style from "./css/EmpBasic.module.css";
import { FcPlus } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import "./css/EmpLnb.css";
import Switch from "@mui/material/Switch";

function EmpBasic(props) {
  const baseUrl = "http://localhost:8080";

  const [lang, setLang] = useState([]);
  const [firstAddr, setFirstAddr] = useState("");
  const [addrCode, setAddrCode] = useState("");
  const [detailedAddr, setDetailedAddr] = useState("");
  const [pmailId, setPmailId] = useState("");
  const [pmailDomain, setPmailDomain] = useState("");
  const [zipcodeIsOpen, setZipcodeIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(baseUrl + "/employee/emplang")
      .then((response) => setLang(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setAddrCode("");
    setFirstAddr("");
    setPmailId("");
    setDetailedAddr("");
  }, [props.employeeSeq]);
  useEffect(() => {
      setAddrCode("");
      setFirstAddr("");
      setPmailId("");
      setDetailedAddr("");
  }, [props.insertFlag])
  useEffect(() => {
    updateObject({ employeeAddr: `${addrCode}/` });
  }, [addrCode]);

  useEffect(() => {
    updateObject({ employeeAddr: `${addrCode}/${firstAddr}/` });
  }, [firstAddr]);

  useEffect(() => {
    updateObject({ employeeAddr: `${addr(0)}/${addr(1)}/${detailedAddr}` });
  }, [detailedAddr]);

  useEffect(() => {
    updateObject({ employeePmail: `${pmailId}@${mailId(1)}` });
  }, [pmailId]);
  useEffect(() => {
    updateObject({ employeePmail: `${mailId(0)}@${pmailDomain}` });
  }, [pmailDomain]);

  useEffect(() => {
    console.log(props.data);
  }, [props.data])
  // 객체 업데이트
  const updateObject = (obj) => {
    props.setData({
      ...props.data,
      ...obj,
    });
  };
  const label = { inputProps: { "aria-label": "Size switch demo" } };

  const idCheck = async (id) => {
    try {
      let idRes = await axios.get(`${baseUrl}/employee/emplist/checkid`, {
        params: { employeeId: id },
      });
      props.setReturnId(idRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cmailCheck = async (mail) => {
    try {
      let cmailRes = await axios.get(`${baseUrl}/employee/emplist/checkcmail`, {
        params: { employeeCmail: mail },
      });
      props.setReturnCmail(cmailRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addr = (idx) => {
    if (props.data.employeeAddr != "" && props.data.employeeAddr != undefined) {
      let temp = props.data.employeeAddr.split("/");
      if (temp[idx] == undefined) return "";
      return temp[idx];
    }
  };
  const mailId = (idx) => {
    if (
      props.data.employeePmail != "" &&
      props.data.employeePmail != undefined &&
      props.data.employeePmail != "undefined@"
    ) {
      let temp = props.data.employeePmail.split("@");
      if (temp[idx] == undefined) return "";
      return temp[idx];
    }
  };
  useEffect(() => {
    console.log(props.data)
  }, [props.data])
  return props.data ? (
    <div>
      <h5 style={{ display: "inline" }}>사원 상세</h5>
      <span
        style={{ float: "right" }}
        onClick={() => {
          props.setEmpSeq(0);
        }}
      ></span>
      <table className={style.basic_tbl}>
        <thead></thead>
        <tbody>
          <tr>
            <th rowSpan={2}>사진</th>
            <td rowSpan={2}>
              {/* <BsFilePerson style={{ width: "40px", height: "40px" }} /> */}
              <img
                src={process.env.PUBLIC_URL + "/empimg.png"}
                style={{ width: "60px", height: "60px" }}
              />
            </td>
            <th>* 이름</th>
            <td>
              <input
                type="text"
                className={style.emp_input}
                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                value={props.data.employeeName || ""}
                onChange={(e) => {
                  updateObject({ employeeName: e.target.value });
                }}
              />
            </td>
          </tr>
          <tr>
            <th>* 생년월일</th>
            <td>
              <input
                type="date"
                value={props.data.employeeBirth || ""}
                onChange={(e) => {
                  updateObject({ employeeBirth: e.target.value });
                }}
                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
              />
            </td>
          </tr>
          <tr>
            <th>로그인 ID</th>
            <td>
              <Form.Group>
                <Form.Control
                  type="text"
                  className={style.emp_input}
                  value={props.data.employeeId || ""}
                  style={
                    props.data.insertData == "Y"
                      ? { backgroundColor: "rgba(241, 199, 199, 0.328)" }
                      : { backgroundColor: "rgba(175, 174, 174, 0.328)" }
                  }
                  onChange={(e) => {
                    updateObject({ employeeId: e.target.value });
                    idCheck(e.target.value);
                  }}
                  autoComplete="off"
                  isValid={
                    props.data.employeeId != ""
                      ? props.firstData.employeeId == props.data.employeeId
                        ? true
                        : props.returnId.length > 0
                        ? false
                        : true
                      : false
                  }
                  isInvalid={
                    props.data.employeeId != ""
                      ? props.firstData.employeeId == props.data.employeeId
                        ? false
                        : props.returnId.length > 0
                        ? true
                        : false
                      : true
                  }
                  disabled={props.data.insertData != "Y"}
                />
                {props.firstData.employeeId == props.data.employeeId ? (
                  <Form.Control.Feedback type="valid">
                    현재 로그인 ID 입니다.
                  </Form.Control.Feedback>
                ) : (
                  !props.data.employeeId || (
                    <>
                      <Form.Control.Feedback type="valid">
                        사용 가능한 ID 입니다.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        중복된 아이디가 존재합니다.
                      </Form.Control.Feedback>{" "}
                    </>
                  )
                )}
              </Form.Group>
            </td>
            <th>메일 ID</th>
            <td>
              <Form.Group>
                <Form.Control
                  type="text"
                  className={style.emp_input}
                  value={props.data.employeeCmail || ""}
                  style={
                    props.data.insertData == "Y"
                      ? { backgroundColor: "rgba(241, 199, 199, 0.328)" }
                      : { backgroundColor: "rgba(175, 174, 174, 0.328)" }
                  }
                  onChange={(e) => {
                    updateObject({ employeeCmail: e.target.value });
                    cmailCheck(e.target.value);
                  }}
                  autoComplete="off"
                  isValid={
                    props.data.employeeCmail != ""
                      ? props.firstData.employeeCmail ==
                        props.data.employeeCmail
                        ? true
                        : props.returnCmail.length > 0
                        ? false
                        : true
                      : false
                  }
                  isInvalid={
                    props.data.employeeCmail != ""
                      ? props.firstData.employeeCmail ==
                        props.data.employeeCmail
                        ? false
                        : props.returnCmail.length > 0
                        ? true
                        : false
                      : true
                  }
                  disabled={props.data.insertData != "Y"}
                />
                {props.firstData.employeeCmail == props.data.employeeCmail ? (
                  <Form.Control.Feedback type="valid">
                    현재 메일 ID 입니다.
                  </Form.Control.Feedback>
                ) : (
                  !props.data.employeeCmail || (
                    <>
                      <Form.Control.Feedback type="valid">
                        사용 가능한 메일입니다.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        중복된 메일이 존재합니다.
                      </Form.Control.Feedback>
                    </>
                  )
                )}
              </Form.Group>
            </td>
          </tr>
          <tr>
            <th>* 로그인 비밀번호</th>
            <td>
              <input
                type="password"
                className={style.emp_pwd}
                value={props.data.employeePwd || ""}
                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                onChange={(e) => {
                  updateObject({ employeePwd: e.target.value });
                }}
                autoComplete="off"
              />
            </td>
            <th>* 결재 비밀번호</th>
            <td>
              <input
                type="password"
                className={style.emp_pwd}
                value={props.data.approvalPwd || ""}
                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                onChange={(e) => {
                  updateObject({ approvalPwd: e.target.value });
                }}
                autoComplete="off"
              />
            </td>
          </tr>
          <tr>
            <th>성별</th>
            <td>
              <div className={style.emp_input_gender}>
                <input
                  type="radio"
                  name="gender"
                  value="남"
                  onChange={(e) => {
                    updateObject({ employeeGender: e.target.value });
                  }}
                  checked={props.data.employeeGender == "남" || ""}
                />
                <label>남</label>
                <input
                  type="radio"
                  name="gender"
                  value="여"
                  onChange={(e) => {
                    updateObject({ employeeGender: e.target.value });
                  }}
                  checked={props.data.employeeGender == "여" || ""}
                />
                <label>여</label>
              </div>
            </td>
            <th>사용언어</th>
            <td>
              <select
                onChange={(e) => {
                  updateObject({ employeeLanguage: e.target.value });
                }}
                value={props.data.employeeLanguage || ""}
              >
                {lang &&
                  lang.map((lang, i) => (
                    <option value={lang} key={i}>
                      {lang}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
          <tr>
            <th>개인메일</th>
            <td colSpan={3}>
              <input
                type="text"
                className={style.emp_input}
                style={{ width: "45%" }}
                // value={employeePmail || ""}
                value={pmailId || mailId(0) ||  ""}
                onChange={(e) => {
                  setPmailId(e.target.value);
                }}
              />
              &nbsp;&nbsp;
              <MdAlternateEmail style={{ width: "20px", height: "20px" }} />
              &nbsp;&nbsp;
              <Form.Select
                size="sm"
                style={{ width: "45%", display: "inline" }}
                value={mailId(1) || ""}
                onChange={(e) => setPmailDomain(e.target.value)}
              >
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="kokao.com">kokao.com</option>
                <option value="korea.kr">korea.kr</option>
                <option value="msn.com">msn.com</option>
                <option value="nate.com">nate.com</option>
                <option value="narasarang.or.kr">narasarang.or.kr</option>
                <option value="tistory.com">tistory.com</option>
              </Form.Select>
            </td>
          </tr>

          <tr>
            <th>휴대전화</th>
            <td>
              <input
                type="text"
                className={style.emp_input}
                value={props.data.employeePh || ""}
                onChange={(e) => {
                  updateObject({ employeePh: PhoneNumber(e.target.value) });
                }}
                maxLength={13}
              />
            </td>
            <th>전화번호(집)</th>
            <td>
              <input
                type="text"
                className={style.emp_input}
                value={props.data.employeeHCall || ""}
                onChange={(e) => {
                  updateObject({ employeeHCall: PhoneNumber(e.target.value) });
                }}
                maxLength={13}
              />
            </td>
          </tr>
          <tr>
            <th>주소</th>
            <td colSpan={3}>
              <input
                type="text"
                className={style.emp_input}
                style={{ width: "20%" }}
                value={addrCode || addr(0) || ""}
                onChange={(e) => {
                  setAddrCode(e.target.value);
                }}
              />
              <input
                type="text"
                className={style.emp_input}
                style={{ width: "50%" }}
                value={firstAddr || addr(1) || ""}
                onChange={(e) => {
                  setFirstAddr(e.target.value);
                }}
              />
              <button
                className={style.emp_addr_input}
                onClick={() => setZipcodeIsOpen(true)}
              >
                우편번호 검색
              </button>
              <div id="zippopupdom">
                {zipcodeIsOpen && (
                  <ZippopupDom>
                    <ZippopupPostCode
                      onClose={setZipcodeIsOpen}
                      setFirstAddr={setFirstAddr}
                      setAddrCode={setAddrCode}
                    />
                  </ZippopupDom>
                )}
              </div>
              <input
                type="text"
                className={style.emp_input}
                value={detailedAddr || addr(2) || ""}
                onChange={(e) => {
                  setDetailedAddr(e.target.value);
                }}
                placeholder="상세 주소를 입력해 주세요."
              />
            </td>
          </tr>
          <tr>
            <th>* 최초 입사일</th>
            <td>
              <input
                type="date"
                value={props.data.employeeJoin || ""}
                onChange={(e) => {
                  updateObject({ employeeJoin: e.target.value });
                }}
                style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
              />
            </td>
            <th>최종 퇴사일</th>
            <td>
              {props.selectAct == true ? (
                <></>
              ) : (
                <input
                  type="date"
                  value={props.data.employeeLeave || ""}
                  onChange={(e) => {
                    updateObject({ employeeLeave: e.target.value });
                  }}
                />
              )}
            </td>
          </tr>
          <tr>
            <th>계정사용</th>
            <td colSpan={3}>
              <Switch
                {...label}
                size="small"
                checked={props.data.useYN == "Y"}
                onChange={() => {
                  updateObject({ useYN: props.data.useYN == "Y" ? "N" : "Y" });
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
              &nbsp;
              {props.data.useYN == "Y" ? (
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                  사용
                </span>
              ) : (
                <span>미사용</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div>사원을 선택해 주십시오.</div>
  );

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
    } else if (value.startsWith("1")) {
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
}

export default EmpBasic;
