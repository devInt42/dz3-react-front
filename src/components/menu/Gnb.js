import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { CgMenuBoxed } from "react-icons/cg";
import style from "./css/GNB.module.css";
import { BsPersonCircle } from "react-icons/bs";
import OrganizationChart from "../modals/OrganizationChart";
import LNB from "./LNB";
import { ImTree } from "react-icons/im";

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

  return (
    <div>
      <div className={style.gnb_header}>
        <span className={style.gnb_title}>
          LastDanth
          <span
            style={{
              color: "rgba(64, 192, 228, 0.929)",
              fontWeight: "bolder",
            }}>
            10
          </span>
        </span>
        <span className={style.gnb_Imtree}>
          <button className={style.gnb_Imtree_btn}>
            <BsPersonCircle size="30" onClick={openModal}></BsPersonCircle>

            <OrganizationChart
              open={modalOpen}
              close={closeModal}
              header="조직도"></OrganizationChart>
          </button>
        </span>
      </div>
      <div className={style.gnb_bar}>
        <CgMenuBoxed
          style={{ width: "50px", height: "50px", margin: "10px" }}
        />
        {props.menuName} {props.menuSeq}
      </div>
    </div>
  );
}

export default GNB;
