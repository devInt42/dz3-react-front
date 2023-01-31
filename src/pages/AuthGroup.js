import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthGroupLnb from "../components/authGroup/AuthGroupLnb";
import { useNavigate } from "react-router-dom";
import AuthMenu from "../components/authGroup/AuthMenu";
import "../components/authGroup/AuthGroup.css";
import axios from "axios";
const AuthGroup = () => {
  const baseUrl = "http://localhost:8080";
  const [authSeq, setAuthSeq] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [pointCompanySeq, setPointCompanySeq] = useState();
  const [checkedRes, setCheckedRes] = useState([]);
  const [sendList, setSendList] = useState([]);
  const [originList, setOriginList] = useState([]);
  const [insertList, setInsertList] = useState(null);
  const [deleteList, setDeleteList] = useState(null);
  useEffect(() => {}, [selectCompanySeq]);
  useEffect(() => {}, [pointCompanySeq]);
  useEffect(() => {}, [authSeq]);
  useEffect(() => {}, [checkedRes]);
  useEffect(() => {}, [originList]);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  const sendSelectCompanySeq = (selectCompanySeq) => {
    setSelectCompanySeq(selectCompanySeq);
  };
  const sendPointCompanySeq = (pointCompanySeq) => {
    setPointCompanySeq(pointCompanySeq);
  };
  const sendCheckedList = (checkedRes) => {
    setCheckedRes(checkedRes);
  };
  const sendOriginList = (originList) => {
    setOriginList(originList);
  };

  const compareList = useCallback(async () => {
    let tmpI = [];
    let intersect = [];
    let tmpD = [];

    // 권한-메뉴가 0개인 경우
    if (originList.length === 0) {
      checkedRes.forEach((list) => tmpI.push(list));
      setInsertList(tmpI);
    } else {
      if (checkedRes.length === 0) {
        // 모든 직원의 권한을 없앨경우
        originList.forEach((list) => tmpD.push(list));
        setDeleteList(tmpD);
      } else {
        // 그외 권한 직원 추가 및 삭제
        intersect = checkedRes.filter(
          (cItem) =>
            originList.filter((oList) => cItem.menuSeq === oList.menuSeq)
              .length > 0
        );
        tmpI = checkedRes.filter((x) => !intersect.includes(x));
        tmpD = originList.filter((y) => !intersect.includes(y));
        setInsertList(tmpI);
        setDeleteList(tmpD);
      }
    }
  }, [checkedRes]);

  // 추가
  const sendInsertRes = useCallback(async () => {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    };
    if (insertList != null) {
      try {
        let sendRes = await axios.post(
          `${baseUrl}/auth-menu/insert`,
          insertList,
          {
            headers,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [insertList]);

  //삭제
  const sendDeleteRes = useCallback(async () => {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    };
    if (deleteList != null) {
      try {
        let sendRes = await axios.post(
          `${baseUrl}/auth-menu/delete`,
          deleteList,
          {
            headers,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [deleteList]);
  useEffect(() => {
    sendInsertRes();
    sendDeleteRes();
  }, [insertList, deleteList]);
  return (
    <Container fluid="true" className="Auth" id="AuthPage">
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <AuthGroupLnb
            sendAuthSeq={sendAuthSeq}
            sendSelectCompanySeq={sendSelectCompanySeq}
            sendPointCompanySeq={sendPointCompanySeq}
          />
        </Col>
        <Col xs={10}>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="outline-secondary"
              style={{ width: "5%" }}
              onClick={compareList}
            >
              저장
            </Button>
          </Row>
          <Col xs={3}>
            <div className="menuArea">
              <AuthMenu
                authSeq={authSeq}
                selectCompanySeq={selectCompanySeq}
                pointCompanySeq={pointCompanySeq}
                sendCheckedList={sendCheckedList}
                sendOriginList={sendOriginList}
              />
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthGroup;
