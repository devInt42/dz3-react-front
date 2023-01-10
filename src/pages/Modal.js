import React, { useEffect } from "react";
import { useState } from "react";
import "../components/Modals/Modal.css";
import { Container, Row, Col } from "react-bootstrap";
import AllGroup from "../components/Modals/AllGroup";
import MyGroup from "../components/Modals/MyGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Modal = (props) => {
  const { open, close, header } = props;

  return (
    //open 누르면 openModal 클래스 생성
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              X
            </button>
          </header>
          <main>
            <div>
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3">
                <Tab eventKey="home" title="전체그룹">
                  <AllGroup />
                </Tab>
                <Tab eventKey="profile" title="마이그룹">
                  <MyGroup />
                </Tab>
              </Tabs>
            </div>

            {/* <MyGroup /> */}
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
