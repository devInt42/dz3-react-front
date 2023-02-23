import { Outlet, useLocation } from "react-router-dom";
import LNB from "../components/menu/LNB";
import GNB from "../components/menu/GNB";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import style from "./Layout.module.css";
import React, { useState, useCallback, useEffect } from "react";
import CallMenu from "./CallMenu";
import { useNavigate } from "react-router-dom";
function Layout() {
  const baseUrl = "http://localhost:8080";
  const [menuSeq, setMenuSeq] = useState(0);
  const [menuName, setMenuName] = useState("");
  const location = useLocation();
  const getMenuInfo = useCallback(
    (menuName, menuSeq) => {
      setMenuSeq(menuSeq);
      setMenuName(menuName);
    },
    [menuSeq, menuName]
  );
  const navigate = useNavigate();
  const [lastSeq, setLastSeq] = useState(0);
  const getLastMenuSeq = (lastSeq) => {
    setLastSeq(lastSeq);
  };
  useEffect(() => {
    if (!window.sessionStorage.getItem("empInfo")) {
      alert("로그인 후에 이용해주세요");
      navigate("/login");
    }
    authCheck(location.pathname);
  }, []);

  const authCheck = async (pathUrl) => {
    if (pathUrl != "/dz3") {
      let data = { menuUrl: pathUrl };
      try {
        let initAuth = await axios.get(
          `${baseUrl}/auth-employee/availability`,
          {
            params: data,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        if (initAuth.data === 0) {
          alert("접근권한이 없습니다.");
          sessionStorage.removeItem("menuName");
          navigate("/dz3");
        } else {
          sessionStorage.setItem("menuName", JSON.stringify("시스템설정"));
        }
      } catch {}
    }
  };

  return (
    <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col md="auto" className={style.layout_lnb}>
          <LNB getMenuInfo={getMenuInfo} />
        </Col>
        <Col className={style.layout_gnb}>
          <Row>
            <GNB menuName={menuName} setMenuName={setMenuName} />
          </Row>
          <Row>
            {menuName == "" ? (
              <></>
            ) : (
              <Col md="auto" className={style.layout_callmenu}>
                <CallMenu menuSeq={menuSeq} />
              </Col>
            )}
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(Layout);
