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
  const [originList, setOriginList] = useState([]);
  const [insertList, setInsertList] = useState(null);
  const [deleteList, setDeleteList] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectFlag, setSelectFlag] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [insertFlag, setInsertFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);

  useEffect(() => {}, [selectCompanySeq]);
  useEffect(() => {}, [pointCompanySeq]);
  useEffect(() => {}, [authSeq]);
  useEffect(() => {}, [checkedRes]);
  useEffect(() => {}, [originList]);
  useEffect(() => {}, [refresh]);
  // insert 성공시 렌더링
  useEffect(() => {
    setInsertFlag(false);
  }, [insertFlag]);

  // delete 성공시 렌더링
  useEffect(() => {
    setDeleteFlag(false);
  }, [deleteFlag]);

  //전체선택시 렌더링
  useEffect(() => {
    setSelectFlag(false);
  }, [selectFlag]);

  const selectAll = () => {
    setSelectFlag(true);
  };

  //전체선택 해제시 렌더링
  useEffect(() => {
    setCancelFlag(false);
  }, [cancelFlag]);

  const cancelAll = () => {
    setCancelFlag(true);
  };

  // 자식에게 권한seq전송
  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };

  // select list에서 선택된 회사seq
  const sendSelectCompanySeq = (selectCompanySeq) => {
    setSelectCompanySeq(selectCompanySeq);
  };

  // 전체보기시 선택한 권한의 회사 seq
  const sendPointCompanySeq = (pointCompanySeq) => {
    setPointCompanySeq(pointCompanySeq);
  };

  // 체크리스트 받아오기
  const sendCheckedList = (checkedRes) => {
    setCheckedRes(checkedRes);
  };

  // 원본 리스트 받아오기
  const sendOriginList = (originList) => {
    setOriginList(originList);
  };

  // 비교를 통해 insert, delete 구분
  const compareList = useCallback(async () => {
    let tmpI = [];
    let tmpD = [];
    // 권한-메뉴가 0개인 경우
    if (originList.length === 0) {
      checkedRes.forEach((list) => tmpI.push(list));
      setInsertList(tmpI);
    } else {
      if (checkedRes.length === 0) {
        // 모든 메뉴 권한을 없앨경우
        originList.forEach((list) => tmpD.push(list));
        setDeleteList(tmpD);
      } else {
        // 그외 권한 메뉴 추가 및 삭제
        tmpI = checkedRes.filter((x) => !originList.includes(x));
        tmpD = originList.filter((y) => !checkedRes.includes(y));

        console.log("교집합");
        console.log(originList.filter((y) => checkedRes.includes(y)));
        console.log("추가");
        console.log(tmpI);
        console.log("삭제");
        console.log(tmpD);

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

        if (sendRes.status === 200) {
          alert("변경되었습니다.");
          setInsertFlag(true);
        }
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
        if (sendRes.status === 200) {
          alert("변경되었습니다.");
          setDeleteFlag(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [deleteList]);

  useEffect(() => {
    sendInsertRes();
  }, [insertList]);

  useEffect(() => {
    sendDeleteRes();
  }, [deleteList]);
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
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "30%" }}>
              <Button
                variant="outline-primary"
                style={{ width: "30%" }}
                onClick={() => selectAll()}
              >
                전체 선택
              </Button>
              <Button
                variant="outline-danger"
                style={{ width: "30%", marginLeft: "20px" }}
                onClick={() => cancelAll()}
              >
                선택 해제
              </Button>
            </div>
            <Button
              variant="outline-secondary"
              style={{ width: "5%" }}
              onClick={() => compareList()}
            >
              저장
            </Button>
          </Row>
          <Col xs={3}>
            <div className="menuArea">
              <AuthMenu
                selectFlag={selectFlag}
                cancelFlag={cancelFlag}
                authSeq={authSeq}
                selectCompanySeq={selectCompanySeq}
                pointCompanySeq={pointCompanySeq}
                sendCheckedList={sendCheckedList}
                sendOriginList={sendOriginList}
                insertFlag={insertFlag}
                deleteFlag={deleteFlag}
              />
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthGroup;
