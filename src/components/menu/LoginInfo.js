import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import PopInfo from "./PopInfo";
import style from "./css/GNB.module.css";
import { ReactComponent as Down } from "./css/Down.svg";
import { ReactComponent as Logout } from "./css/Logout.svg";

const LoginInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();
  const initCheck = async () => {
    try {
      let userInfoRes = await axios.get(`${baseUrl}/department-employee/info`, {
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });

      setUserInfo(userInfoRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initCheck();
  }, []);

  const navLogoutPage = () => {
    navigate("/login");
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" style={popHeadStyle}>
        로그인 정보{" "}
        <Logout onClick={() => navLogoutPage()} style={{ cursor: "pointer" }} />
      </Popover.Header>
      <Popover.Body>
        <PopInfo userInfo={userInfo} />
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose="true"
        overlay={popover}
      >
        <Row style={{ float: "left", width: "250px" }}>
          <div id={style.userInfo}>
            <Col xs={2} className={style.userInfoDisplay}>
              <img
                src={process.env.PUBLIC_URL + "/empimg.png"}
                style={{ width: "30px", height: "30px" }}
              />
            </Col>
            <Col xs={7}>
              <p className={style.pStyle}>{userInfo?.employeeName}</p>
              <p className={style.pStyle}>
                {userInfo?.companyName}&nbsp;
                {userInfo?.departmentName}
              </p>
            </Col>
            <Col
              xs={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Down />
            </Col>
          </div>
        </Row>
      </OverlayTrigger>
    </>
  );
};

export default LoginInfo;
const popHeadStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
