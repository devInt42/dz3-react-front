import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useEffect, useState } from "react";

function DeleteMenuAlert(props) {
  const menuSequence = props.menuSeq;
  const [deleteMenu, setDeleteMenu] = useState([]);
  
  useEffect(()=> {
    axios.get("http://localhost:8080/menu/menulist/selectmenu/" + menuSequence)
    .then((response) => setDeleteMenu(response.data[0]))
    .catch((error) => console.log(error))
  }, [props.menuSeq]);

  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: "삭제하시겠습니까?",
    text: "삭제할 메뉴 : " + deleteMenu.menuName,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
    width: "600px",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .get("http://localhost:8080/menu/menulist/" + menuSequence)
        .then((response) => {
          if (response.data == 0) {
            props.deleteMenu(menuSequence);
            Swal.fire("삭제가 완료되었습니다.", "", "success", "#3085d6");
          } else {
            Swal.fire(
              "삭제실패.",
              "하위 메뉴가 존재합니다. 하위메뉴부터 삭제해주세요.",
              "error",
              "#3085d6"
            );
          }
        })
        .catch((error) => console.log(error));
      props.setDeleteCheck(false);
    }

    if (!result.isConfirmed) {
      props.setDeleteCheck(false);
    }
  });
}

export default DeleteMenuAlert;
