import React, { useEffect } from "react";
import { useState } from "react";
import "../components/CommonModal/CommonModal.css";
import { Container, Row, Col } from "react-bootstrap";
import AllCommon from "../components/CommonModal/AllCommon";

const CommonModal = (props) => {
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
              <AllCommon />
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default CommonModal;
