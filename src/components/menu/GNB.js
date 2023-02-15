import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { CgMenuBoxed } from "react-icons/cg";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";

import style from "./css/GNB.module.css";

import { ImTree } from "react-icons/im";
import { Row, Col } from "react-bootstrap";
import LoginInfo from "../login/LoginInfo";
import Main from "../../pages/Main";
import OrganizationChart from "../modals/OrganizationChart";
function GNB(props) {
  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [gnbNum, setGnbNum] = useState(0);
  const [menuId, setMenuId] = useState("");
  const [menuName, setMenuName] = useState("");
  const baseUrl = "http://localhost:8080";
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + "/menu/menulist")
      .then((response) => setMenu(response.data))
      .catch((error) => console.log(error));
  }, []);

  const [retain, setRetain] = useState("");
  useEffect(() => {
    if (props.menuName == "") {
      return;
    } else {
      window.sessionStorage.setItem("menuName", JSON.stringify(props.menuName));
      setRetain(window.sessionStorage.getItem("menuName"));
    }
  }, [props.menuName]);

  const goMain = () => {
    props.setMenuName("");
    window.sessionStorage.removeItem("menuName");
    navigate(`/dz3`);
  };
  return (
    <div>
      <Row className={style.gnb_header}>
        <Col md="auto" className={style.gnb_title} onClick={goMain}>
          LastDanth
          <span
            style={{
              color: "rgba(64, 192, 228, 0.929)",
              fontWeight: "bolder"
            }}
          >
            10
          </span>
        </Col>
        <Col className={style.userInfoStyle}>
          <LoginInfo />
        </Col>
        <Col md="auto" xs={2} className={style.gnb_Imtree}>
          <div
            className={style.gnb_Imtree_btn}
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <ImTree size="30" onClick={openModal}></ImTree>
            <OrganizationChart
              open={modalOpen}
              close={closeModal}
              header="조직도"
            ></OrganizationChart>
          </div>
        </Col>
      </Row>
      {/* {props.menuName == "" ? <Main/> : */}
      {props.menuName == "" &&
      window.sessionStorage.getItem("menuName") == null ? (
        <Main />
      ) : (
        <div className={style.gnb_bar}>
          <MdOutlineMenu
            style={{ width: "50px", height: "52px", marginRight: "10px", backgroundColor: "rgba(34, 96, 221, 0.81)", padding: "10px"}}
          />
          {props.menuName == ""
            ? JSON.parse(window.sessionStorage.getItem("menuName"))
            : props.menuName}
        </div>
      )}
    </div>
  );
}

export default GNB;
