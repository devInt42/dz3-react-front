import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
      props.insertCompany();
      props.setDetailFlag(false);
      props.setRefresh(props.refresh + 1);
    }

    if (!result.isConfirmed) {
      props.setAllCheck(false);
    }
  });
}

export default SaveCompanyAlert;
