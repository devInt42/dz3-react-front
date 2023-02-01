import { Outlet } from "react-router-dom";
import LNB from "../components/menu/LNB";
import GNB from "../components/menu/GNB";
import { Container, Row, Col } from "react-bootstrap";

import style from "./Layout.module.css";

import React, { useState, useCallback, useEffect } from "react";
import SubMenu from "../components/menu/SubMenu";
import CallMenu from "./CallMenu";
import Main from "./Main";
import { PropaneSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function Layout() {
  const [menuSeq, setMenuSeq] = useState(0);
  const [menuName, setMenuName] = useState("");
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
  }, []);
  return (
    <Container fluid>
      <Row>
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
