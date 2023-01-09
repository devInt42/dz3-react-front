import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";

const AuthList = () => {
  const baseUrl = "http://localhost:8080";
  const [authSeq, setAuthSeq] = useState(2);
  const [menuSeq, setMenuSeq] = useState(0);
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
  return <div>리스트창</div>;
};

export default AuthList;
