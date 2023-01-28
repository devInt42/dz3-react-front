import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthLnb from "../components/auth/AuthLnb";
import { useNavigate } from "react-router-dom";
import AuthEmployeeList from "../components/auth/AuthEmployeeList";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import CommonModal from "../components/commonModal/CommonModal";
import axios from "axios";
const Auth = () => {
  const baseUrl = "http://localhost:8080";
  const [authSeq, setAuthSeq] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [pointCompanySeq, setPointCompanySeq] = useState();
  const [modalRes, setModalRes] = useState([]);
  const [sendData, setSendData] = useState([]);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  const sendSelectCompanySeq = (selectCompanySeq) => {
    setSelectCompanySeq(selectCompanySeq);
  };
  const sendPointCompanySeq = (pointCompanySeq) => {
    setPointCompanySeq(pointCompanySeq);
  };

  const sendModalRes = async () => {
    let list = JSON.parse(modalRes);
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    };
    let body = JSON.stringify({
      authSeq: authSeq,
      companySeq: pointCompanySeq,
    });
    try {
      let sendRes = await axios.post(`${baseUrl}/auth-employee`, body, {
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const settingModalRes = useCallback(async () => {
    if (modalRes != "") {
      let list = JSON.parse(modalRes);
      const temp = [];
      list.forEach((elem) => {
        temp.push({
          authSeq: authSeq,
          employeeSeq: elem.employeeSeq,
          companySeq: pointCompanySeq,
          workplaceSeq: elem.workplaceSeq,
          departmentSeq: elem.departmentSeq,
        });
      });
      setSendData(temp);
    }
  }, [modalRes]);

  useEffect(() => {}, [selectCompanySeq]);
  useEffect(() => {}, [pointCompanySeq]);
  useEffect(() => {}, [sendData]);
  useEffect(() => {
    settingModalRes();
  }, [modalRes]);

  // 모달창 기능
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

  function getInfo(obj) {
    setModalRes(obj);
    SaveCompanyAlert();
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
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="outline-secondary"
              style={{ width: "5%" }}
              onClick={openModal}
            >
              편집
            </Button>

            <CommonModal
              open={modalOpen}
              close={closeModal}
              getInfoCaLLback={getInfo}
              header="사용자 권한 설정"
              authSeq={authSeq}
              pointCompanySeq={pointCompanySeq}
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
