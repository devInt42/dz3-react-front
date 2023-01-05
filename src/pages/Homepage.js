import { BsPersonCircle } from "react-icons/bs";
import React, { useState } from 'react';
import Modal from '../components/Modals/Modal.js'
import axios from 'axios';

const Home = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <React.Fragment>
    <BsPersonCircle onClick={openModal}></BsPersonCircle>
    <Modal open={modalOpen} close={closeModal} header="조직도">
     {/* children */}
    </Modal>
  </React.Fragment>

  )
};

export default Home;