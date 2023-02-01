import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
const PopInfo = (props) => {
  const baseUrl = "http://localhost:8080";
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(props.userInfo);
  }, [props.userInfo]);

  return (
    <Container>
      <Row>
        <Col>
          <img src={process.env.PUBLIC_URL + "/empimg.png"} />
        </Col>
        <Col>
          <Row>
            {userInfo?.employeeName}&nbsp;{userInfo?.title}
          </Row>
          <Row>
            {userInfo?.companyName}&gt;{userInfo?.workplaceName}
            &gt;{userInfo?.departmentName}
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <div>회사정보</div>
        {userInfo?.companyName}
      </Row>
    </Container>
  );
};
export default PopInfo;
