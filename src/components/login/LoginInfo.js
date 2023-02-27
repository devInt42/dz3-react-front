import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import PopInfo from "./PopInfo";
import style from "../menu/css/GNB.module.css";
import { ReactComponent as Down } from "./css/Down.svg";
import { ReactComponent as Logout } from "./css/Logout.svg";

const LoginInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [sessionRes, setSessionRes] = useState(null);
  const [mainInfo, setMainInfo] = useState(null);
  const [complete, setComplete] = useState(false);
  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();

  const initCheck = async () => {
    setSessionRes(window.sessionStorage.getItem("empInfo"));
  };

  useEffect(() => {
    initCheck();
  }, []);
  useEffect(() => {
    initCheck();
  }, [complete]);
  useEffect(() => {
    setComplete(false);
  }, [complete]);
  // 유저인포 부르기
  const callUserInfo = async () => {
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
    callUserInfo();
  }, [sessionRes]);

  // 유저인포 변경시 메인 선택
  const sendMainRes = useCallback(
    (e) => {
      let session = [];
      session.push(JSON.parse(sessionRes));
      if (e != null) {
        e.filter((el) => {
          if (session[0].companySeq == el.companySeq) {
            setMainInfo(el);
          }
        });
      }
    },
    [sessionRes]
  );

  useEffect(() => {
    sendMainRes(userInfo);
  }, [userInfo]);

  // 로그아웃
  const navLogoutPage = () => {
    navigate("/login");
  };

  // 새로 고침
  const sendComplete = (e) => {
    setComplete(e);
  };
  // 팝오버
  const popover = (
    <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
      <Popover.Header as="h3" style={popHeadStyle}>
        로그인 정보
        <Logout onClick={() => navLogoutPage()} style={{ cursor: "pointer" }} />
      </Popover.Header>
      <Popover.Body>
        <PopInfo
          userInfo={userInfo}
          sessionRes={sessionRes}
          sendComplete={sendComplete}
        />
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
              <p className={style.pStyle}>{mainInfo?.employeeName}</p>
              <p className={style.pStyle}>
                {mainInfo?.companyName}&nbsp;
                {mainInfo?.departmentName}
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
