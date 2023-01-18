import { BsPersonCircle } from "react-icons/bs";
import React, { useState } from "react";
import CommonModal from "../components/CommonModal/CommonModal";

const Home2 = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  function getInfo(obj) {
     console.log(obj);
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
