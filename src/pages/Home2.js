import { BsPersonCircle } from "react-icons/bs";
import React, { useState } from "react";
import CommonModal from "../components/CommonModal/CommonModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Home2 = () => {
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
    console.log(obj);
    SaveCompanyAlert();
  }

  return (
    <React.Fragment>
      <BsPersonCircle size="30" onClick={openModal}></BsPersonCircle>

      <CommonModal
        open={modalOpen}
        close={closeModal}
        getInfoCaLLback={getInfo}
        header="회사부서 사용자 선택"></CommonModal>
    </React.Fragment>
  );
};

export default Home2;
