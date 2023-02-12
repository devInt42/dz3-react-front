import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useEffect } from "react";

function EmpBasicDeleteAlert(props) {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: props.employeeName + "님의 정보를 삭제하시겠습니까?",
    text: "삭제 시 되돌릴 수 없습니다.",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
    width: "600px",
  }).then((result) => {
    if (result.isConfirmed) {
      props.deleteEmp();
      Swal.fire("삭제가 완료되었습니다.", "", "success", "#3085d6");
      props.setDeleteCheck(false);
    }

    if (!result.isConfirmed) {
      props.setDeleteCheck(false);
    }
  });
}

export default EmpBasicDeleteAlert;
