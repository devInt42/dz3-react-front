import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UpdateCompanyAlert = (props) => {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: "수정 하시겠습니까?",
    icon: "warning",

    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "수정",
    cancelButtonText: "취소",
    width: "600px",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("수정이 완료되었습니다.", "", "success", "#3085d6");
      props.Update(props.seq);
      props.setAllCheck(false);
      props.setRefresh(props.refresh + 1);
    }
    if (!result.isConfirmed) {
      props.setAllCheck(false);
    }
  });
};

export default UpdateCompanyAlert;
