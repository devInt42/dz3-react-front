import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { ReactComponent as Checked } from "./css/Checked.svg";

const PopInfo = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [sessionRes, setSessionRes] = useState(null);
  const [mainInfo, setMainInfo] = useState(null);
  const [checkedUserInfo, setCheckedUserInfo] = useState(null);
  // 세션 스토리지 값
  useEffect(() => {
    setSessionRes(props.sessionRes);
  }, [props]);

  // 현재 로그인한 유저 값
  useEffect(() => {
    setUserInfo(props.userInfo);
  }, [sessionRes]);

  useEffect(() => {
    settingMain();
  }, [userInfo]);
  useEffect(() => {}, [mainInfo]);
  const settingMain = useCallback(() => {
    let session = [];
    session.push(JSON.parse(sessionRes));
    if (userInfo != null) {
      userInfo.filter((el) => {
        if (session[0].companySeq == el.companySeq) {
          setMainInfo(el);
        }
      });
    }
  }, [sessionRes, userInfo]);

  // 라디오버튼 체크시 값변경
  const radioValue = (e) => {
    let temp = [];

    userInfo.forEach((list) => {
      if (e.target.id == list.companySeq) {
        temp = list;
      }
    });
  };
  const sendMainRes = (e) => {};

  useEffect(() => {
    sendMainRes(mainInfo);
  }, [mainInfo]);

  // 버튼 클릭시 사용자 정보 변경
  const changeLoginStatus = async () => {
    try {
    } catch {
    } finally {
      window.location.reload();
    }
  };

  return (
    <Container>
      {mainInfo && (
        <Row>
          <Col xs={2}>
            <img src={process.env.PUBLIC_URL + "/empimg.png"} />
          </Col>
          <Col xs={10}>
            <Row>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  padding: "0",
                  margin: "0",
                }}
              >
                {mainInfo?.employeeName}&nbsp;{mainInfo?.position}
              </p>
            </Row>
            <Row>
              {mainInfo?.companyName}&gt;{mainInfo?.workplaceName}
              &gt;{mainInfo?.departmentName}
            </Row>
          </Col>
        </Row>
      )}
      <hr />
      <Row>
        <Col style={{ margin: "0", padding: "0" }}>
          <p
            style={{
              margin: "0",
              padding: "0",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            &#183;&nbsp;회사정보
          </p>
        </Col>
        <Col>
          <p
            style={{
              margin: "0",
              padding: "0",
              color: "#00aaff",
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            * 회사를 선택해주세요
          </p>
        </Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>회사명</th>
              <th>부서명 (관리부서)</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {userInfo &&
              userInfo.map((item) => (
                <tr id={item.companySeq}>
                  {item.companySeq == mainInfo?.companySeq ? (
                    <td id="tableChecked">
                      <input
                        type="radio"
                        name="company"
                        id={item.companySeq}
                        value={item.companySeq}
                        onClick={radioValue}
                        checked
                      />
                      &nbsp;
                      {item.companyName}
                    </td>
                  ) : (
                    <td id="noneChecked">
                      <input
                        type="radio"
                        name="company"
                        id={item.companySeq}
                        value={item.companySeq}
                        onClick={radioValue}
                      />
                      &nbsp;
                      {item.companyName}
                    </td>
                  )}
                  <td>{item.departmentName}</td>
                  {mainInfo?.companySeq == item.companySeq ? (
                    <td id="tableCheked" style={{ color: "#0ac38b" }}>
                      <Checked />
                      &nbsp;접속중
                    </td>
                  ) : (
                    <td id="noChecked"></td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
      <Row
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="outline-primary"
          style={{ width: "20%" }}
          onClick={changeLoginStatus}
        >
          변경
        </Button>
      </Row>
    </Container>
  );
};
export default PopInfo;
