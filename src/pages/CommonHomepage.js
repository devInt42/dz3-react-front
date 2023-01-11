import { BsPersonCircle } from "react-icons/bs";
import { AiOutlinePushpin } from "react-icons/ai";
import React, { useState } from "react";
import CommonModal from "./CommonModal";

const CommonHomepage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <BsPersonCircle size="30" onClick={openModal}></BsPersonCircle>

      <CommonModal
        open={modalOpen}
        close={closeModal}
        header="회사부서 사용자 선택">
        {/* children */}
      </CommonModal>
    </React.Fragment>
  );
};

export default CommonHomepage;
