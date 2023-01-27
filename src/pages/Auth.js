import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthLnb from "../components/auth/AuthLnb";
import { useNavigate } from "react-router-dom";
import AuthEmployeeList from "../components/auth/AuthEmployeeList";
import CommonModal from "../components/commonModal/CommonModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsPersonCircle } from "react-icons/bs";

const Auth = () => {
  const [authSeq, setAuthSeq] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [pointCompanySeq, setPointCompanySeq] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  function SaveCompanyAlert(props) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "저장하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "저장",
      cancelButtonText: "취소",
      width: "600px",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("저장이 완료되었습니다.", "", "success", "#3085d6");
        setModalOpen(false);
      }
    });
  }
  const navigate = useNavigate();
  const InitCheck = useCallback(async () => {
    if (!window.sessionStorage.getItem("empInfo")) {
      alert("로그인 후에 이용해주세요");
      navigate("/login");
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    InitCheck();
  }, []);

  useEffect(() => {}, [selectCompanySeq]);
  useEffect(() => {}, [pointCompanySeq]);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  const sendSelectCompanySeq = (selectCompanySeq) => {
    setSelectCompanySeq(selectCompanySeq);
  };
  const sendPointCompanySeq = (pointCompanySeq) => {
    setPointCompanySeq(pointCompanySeq);
  };
  function getInfo(obj) {
    console.log(obj);
  }

  return (
    <Container fluid="true" className="Auth" id="AuthPage">
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <AuthLnb
            sendAuthSeq={sendAuthSeq}
            sendSelectCompanySeq={sendSelectCompanySeq}
            sendPointCompanySeq={sendPointCompanySeq}
          />
        </Col>
        <Col xs={10}>
          <Row>
            <BsPersonCircle size="30" onClick={openModal}></BsPersonCircle>

            <CommonModal
              open={modalOpen}
              close={closeModal}
              getInfoCaLLback={getInfo}
              header="회사부서 사용자 선택"
            ></CommonModal>
          </Row>
          <AuthEmployeeList
            authSeq={authSeq}
            pointCompanySeq={pointCompanySeq}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
