import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import AuthLnb from "../components/menu/AuthLnb";
import Gnb from "../components/menu/Gnb";

const Auth = () => {
  const baseUrl = "http://localhost:8080";
  const authSeq = "2";
  const menuSeq = "0";
  async function getAuthMenuList() {
    const url = baseUrl + "/auth-menu/list/" + authSeq + "/" + menuSeq;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Gnb />
      <AuthLnb />
      <Container>
        <Row>
          <Button onClick={getAuthMenuList}>리스트 조회</Button>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
