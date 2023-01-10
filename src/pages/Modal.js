import React, { useEffect } from "react";
import { useState } from "react";
import "../components/Modals/Modal.css";
import { Container, Row, Col } from "react-bootstrap";
import AllGroup from "../components/Modals/AllGroup";
import MyGroup from "../components/Modals/MyGroup";

const Modal = (props) => {
  const { open, close, header } = props;
  const { viewAllGroup, setViewAllGroup } = useState(true);

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
            <div className="br">
              <span className="hover">
                <button
                  className="groupChoice"
                  onClick={() => setViewAllGroup(true)}>
                  전체그룹
                </button>{" "}
              </span>{" "}
              |{" "}
              <span className="hover">
                <button
                  className="groupChoice"
                  onClick={() => setViewAllGroup(false)}>
                  {" "}
                  마이그룹
                </button>
              </span>
            </div>
            <hr />
            <div>{setViewAllGroup ? <AllGroup /> : <MyGroup />}</div>
            {/* <MyGroup /> */}
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
