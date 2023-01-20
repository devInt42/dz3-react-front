import { useEffect, useState } from "react";
import React from "react";
import {
  Row,
  Form,
  OverlayTrigger,
  Popover,
  Container,
  Button,
} from "react-bootstrap";
import { ReactComponent as Plus } from "./plus.svg";
import "./AuthGroup.css";
import axios from "axios";

const AddGroup = () => {
  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [inputCode, setInputCode] = useState(null);
  const [inputName, setInputName] = useState(null);
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
      if (resCompany.data.length == 1) {
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
    setInputCode(e.target.value);
  };
  const changeAuthName = (e) => {
    setInputName(e.target.value);
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">그룹 추가하기 </Popover.Header>
      <Popover.Body>
        <Container>
          <Row>
            <Form.Select
              size="sm"
              onChange={changeSelectVal}
              style={{ width: "200px" }}
            >
              {companyList &&
                companyList.map((companyMap, i) => (
                  <option key={i} value={companyMap.companySeq}>
                    {companyMap.companyName}
                  </option>
                ))}
            </Form.Select>
          </Row>
          <Form>
            <Form.Group className="mb-3" controlId="inputAuthCode">
              <Form.Label>권한 코드</Form.Label>
              <Form.Control type="text" onChange={changeAuthCode} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputAuthName">
              <Form.Label>권한명</Form.Label>
              <Form.Control type="text" onChange={changeAuthName} />
            </Form.Group>
          </Form>
          <Button>추가하기</Button>
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
