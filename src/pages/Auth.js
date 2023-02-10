import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import AuthLnb from "../components/auth/AuthLnb";
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
  const [sendList, setSendList] = useState([]);
  const [originList, setOriginList] = useState([]);
  const [insertList, setInsertList] = useState(null);
  const [deleteList, setDeleteList] = useState(null);
  const [insertComplete, setInsertComplete] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  const sendSelectCompanySeq = (selectCompanySeq) => {
    setSelectCompanySeq(selectCompanySeq);
  };
  const sendPointCompanySeq = (pointCompanySeq) => {
    setPointCompanySeq(pointCompanySeq);
  };

  // 추가
  const sendInsertRes = useCallback(async () => {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    };
    if (insertList != null) {
      try {
        let sendRes = await axios.post(
          `${baseUrl}/auth-employee/insert`,
          insertList,
          {
            headers,
          }
        );
        setInsertComplete(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [insertList]);

  //삭제
  const sendDeleteRes = useCallback(async () => {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    };
    if (deleteList != null) {
      try {
        let sendRes = await axios.post(
          `${baseUrl}/auth-employee/delete`,
          deleteList,
          {
            headers,
          }
        );
        setDeleteComplete(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [deleteList]);

  //비교
  const compareList = useCallback(async () => {
    const origin = [];
    originList.forEach((elem) => {
      origin.push({
        authSeq: authSeq,
        employeeSeq: elem.employeeSeq,
        companySeq: pointCompanySeq,
        workplaceSeq: elem.workplaceSeq,
        departmentSeq: elem.departmentSeq,
      });
    });
    let tmpI = [];
    let intersect = [];
    let intersect2 = [];
    let tmpD = [];

    if (originList.length === 0) {
      // 권한 직원이 0명인경우
      sendList.forEach((list) => tmpI.push(list));
      setInsertList(tmpI);
    } else {
      if (sendList.length === 0) {
        // 모든 직원의 권한을 없앨경우
        origin.forEach((list) => tmpD.push(list));
        setDeleteList(tmpD);
      } else {
        // 그외 권한 직원 추가 및 삭제
        intersect = sendList.filter(
          (sItem) =>
            originList.filter(
              (oList) => sItem.employeeSeq === oList.employeeSeq
            ).length > 0
        );
        intersect2 = origin.filter(
          (oList) =>
            sendList.filter((sList) => oList.employeeSeq === sList.employeeSeq)
              .length > 0
        );
        tmpI = sendList.filter((x) => !intersect.includes(x));
        tmpD = origin.filter((y) => !intersect2.includes(y));
        setInsertList(tmpI);
        setDeleteList(tmpD);
      }
    }
  }, [sendList]);

  // 모달창에서 받은 list 정제
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
      setSendList(temp);
    }
  }, [modalRes]);

  useEffect(() => {}, [selectCompanySeq]);
  useEffect(() => {}, [pointCompanySeq]);
  useEffect(() => {
    compareList();
  }, [sendList]);
  useEffect(() => {
    settingModalRes();
  }, [modalRes]);
  useEffect(() => {
    sendInsertRes();
  }, [insertList]);
  useEffect(() => {
    sendDeleteRes();
  }, [deleteList]);
  //현재 권한-사원 리스트 불러오기
  const loadOrigin = useCallback(async () => {
    let send = {
      authSeq: authSeq,
      companySeq: pointCompanySeq,
    };

    try {
      let originRes = await axios.get(`${baseUrl}/auth-employee/origin`, {
        params: send,
      });
      setOriginList(originRes.data);
    } catch (error) {}
  }, [authSeq]);

  // 모달창 기능
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    loadOrigin();
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

  useEffect(() => {
    setInsertComplete(false);
  }, [insertComplete]);
  useEffect(() => {
    setDeleteComplete(false);
  }, [deleteComplete]);
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
              selectCompanySeq={selectCompanySeq}
            ></CommonModal>
          </Row>
          <AuthEmployeeList
            authSeq={authSeq}
            pointCompanySeq={pointCompanySeq}
            insertComplete={insertComplete}
            deleteComplete={deleteComplete}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
