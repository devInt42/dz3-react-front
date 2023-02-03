import { useEffect, useState } from "react";
import React from "react";
import { Form, OverlayTrigger, Popover, Container } from "react-bootstrap";
import { ReactComponent as Plus } from "./plus.svg";
import "./AuthGroup.css";
import axios from "axios";
import { set } from "lodash";

const AddGroup = () => {
  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [inputCode, setInputCode] = useState("");
  const [inputName, setInputName] = useState("");
  const [returnCode, setReturnCode] = useState(null);
  const [returnName, setReturnName] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // 회사 리스트 불러오기
  useEffect(() => {}, [selectCompanySeq]);
  const selectCompanyArea = async () => {
    try {
      const resCompany = await axios.get(`${baseUrl}/company-employee/select`, {
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });
      setCompanyList(resCompany.data);
      if (resCompany.data.length >= 1) {
        setSelectCompanySeq(resCompany.data[0].companySeq);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // admin계정이 회사 변경시 변경된 회사 seq
  const changeSelectVal = (e) => {
    setSelectCompanySeq(e.target.value);
  };
  useEffect(() => {
    selectCompanyArea();
  }, []);

  // 상태 변환 및 중복 체크
  const changeAuthCode = (e) => {
    setInputCode(e.target.value.toUpperCase());
  };
  const changeAuthName = (e2) => {
    setInputName(e2.target.value);
  };

  useEffect(() => {
    if (inputCode != "") codeCheck();
  }, [inputCode]);

  useEffect(() => {
    if (inputName != "") nameCheck();
  }, [inputName]);

  const codeCheck = async () => {
    let data = {
      companySeq: selectCompanySeq,
      authCode: inputCode,
    };
    try {
      let codeRes = await axios.get(`${baseUrl}/auth/check`, {
        params: data,
      });
      setReturnCode(codeRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  const nameCheck = async () => {
    let data = {
      companySeq: selectCompanySeq,
      authName: inputName,
    };
    try {
      let nameRes = await axios.get(`${baseUrl}/auth/check`, {
        params: data,
      });
      setReturnName(nameRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    if (
      (inputCode.length > 0 ? (returnCode > 0 ? false : true) : false) &&
      (inputName.length > 0 ? (returnName > 0 ? false : true) : false)
    ) {
      let body = JSON.stringify({
        companySeq: selectCompanySeq,
        authCode: inputCode,
        authName: inputName,
      });

      const headers = {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
      };

      axios
        .post(`${baseUrl}/auth/add`, body, { headers })
        .then((res) => {
          alert("추가 되었습니다.");
        })
        .catch((e) => {
          if (e.response && e.response.status === 500) {
            return alert("실패했습니다.");
          }
        });

      setDisabled(false);
    } else {
      alert("중복값으로 인해 그룹을 추가할 수 없습니다.");
      setDisabled(false);
    }
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">그룹 추가하기 </Popover.Header>
      <Popover.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              size="sm"
              onChange={changeSelectVal}
              style={{ width: "100%" }}
            >
              {companyList &&
                companyList.map((companyMap, i) => (
                  <option key={i} value={companyMap.companySeq}>
                    {companyMap.companyName}
                  </option>
                ))}
            </Form.Select>
            <Form.Group className="mb-3" controlId="inputAuthCode">
              <Form.Label>권한 코드</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                onChange={changeAuthCode}
                isValid={
                  inputCode.length > 0 ? (returnCode > 0 ? false : true) : false
                }
                isInvalid={
                  inputCode.length > 0 ? (returnCode > 0 ? true : false) : true
                }
              />
              <Form.Control.Feedback type="valid">
                사용 가능합니다
              </Form.Control.Feedback>
              {inputCode.length === 0 ? (
                <Form.Control.Feedback type="invalid">
                  공백은 사용 불가능합니다.
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback type="invalid">
                  중복된 권한코드 입니다.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputAuthName">
              <Form.Label>권한명</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                onChange={changeAuthName}
                isValid={
                  inputName.length > 0 ? (returnName > 0 ? false : true) : false
                }
                isInvalid={
                  inputName.length > 0 ? (returnName > 0 ? true : false) : true
                }
              />

              <Form.Control.Feedback type="valid">
                사용 가능합니다
              </Form.Control.Feedback>
              {inputName.length === 0 ? (
                <Form.Control.Feedback type="invalid">
                  공백은 사용 불가능합니다.
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback type="invalid">
                  중복된 권한명 입니다.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <button type="submit" id="sendGroupBtn" disabled={disabled}>
              추가하기
            </button>
          </Form>
        </Container>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="top"
        rootClose="true"
        overlay={popover}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Plus style={{ width: "16px", padding: "0" }} />
          &nbsp;추가
        </div>
      </OverlayTrigger>
    </>
  );
};

export default AddGroup;
