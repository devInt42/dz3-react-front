import { Outlet, useNavigate } from "react-router-dom";
import LNB from "../components/LNB";
import GNB from "../components/GNB";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SystemSet from "../pages/SystemSet";
import { Container, Row, Col } from "react-bootstrap";

import style from "../css/LNB.module.css";

import { VscGithubInverted } from "react-icons/vsc";
import { BsMenuButtonWideFill } from "react-icons/bs";
import Auth from "./Auth";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col
          md="auto"
          style={{ border: "1px solid black", padding: "0px", height: "100vh" }}
        >
          <LNB />
        </Col>

        <Col style={{ border: "1px solid black", padding: "0px" }}>
          <Row>
            <GNB />
          </Row>
          <Row>
            <Col
              className="subMenu"
              md="auto"
              style={{
                border: "1px solid black",
                padding: "0px",
                width: "20%",
                height: "100vh",
                margin: "20px",
              }}
            >
              <Outlet />
            </Col>
            <Col className="contents">
              <Auth />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
