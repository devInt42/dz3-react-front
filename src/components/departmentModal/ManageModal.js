import { useState, useEffect } from "react";
import DepartmentModal from "./DepartmentModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "react-bootstrap";
import axios from "axios";
const ManageModal = (props) => {
  const [companySeq, setCompanySeq] = useState(null);
  const baseUrl = "http://localhost:8080";
  useEffect(() => {
    setCompanySeq(props.companySeq);
  }, [props]);
  useEffect(() => {}, [companySeq]);
  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  function getInfo(obj) {
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
        console.log(obj);
        
        props.updateIndexObject(props.idx, {
          companySeq: obj.companySeq,
          workplaceSeq: obj.workplaceSeq,
          departmentSeq: obj.departmentSeq,
          departmentName: obj.departmentName,
          departmentLoc: obj.departmentLoc,
          departmentCall: obj.departmentCall,
          departmentFax: obj.departmentFax,
          workplaceName: obj.workplaceName,
          companyName: obj.companyName,
        });
      }
    });
  }

  return (
    <div>
      <Button
        variant="outline-secondary"
        style={{ width: "70px", marginLeft: "10px" }}
        onClick={openModal}>
        편집
      </Button>{" "}
      <DepartmentModal
        companySeq={companySeq}
        open={modalOpen}
        close={closeModal}
        getInfoCaLLback={getInfo}
        header="부서 사용자 선택"
      />
    </div>
  );
};
export default ManageModal;
