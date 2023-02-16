import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";

function UpdateMenuAlert(props) {
    const MySwal = withReactContent(Swal);

    const menuCode = props.menuCode;
    const menuName = props.menuName;
    const menuSeq = props.menuSeq;
    const [deleteMenu, setDeleteMenu] = useState([]);
  
  useEffect(()=> {
    axios.get("http://localhost:8080/menu/menulist/selectmenu/" + props.menuSeq)
    .then((response) => setDeleteMenu(response.data[0]))
    .catch((error) => console.log(error))
  }, [props.menuSeq]);

    MySwal.fire({
        title: '메뉴를 수정하시겠습니까?',
        text: '수정할 메뉴 : ' + deleteMenu.menuName,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '수정',
        cancelButtonText: '취소',
        width: '600px'

    }).then(result => {
        if (result.isConfirmed) {
            // props.updateMenu(menuSeq);
            // Swal.fire('수정이 완료되었습니다.', '', 'success', '#3085d6');
            // props.setUpdateCheck(false);

            // axios.get('http://localhost:8080/menu/menulist/checkcode/' + menuCode).then(response => {
            //     if (response.data == 0) {
            //         axios.get('http://localhost:8080/menu/menulist/checkname/' + menuName).then(response => {
            //             if (response.data == 0) {
            //                 props.updateMenu(menuSeq);
            //                 Swal.fire('수정이 완료되었습니다.', '', 'success', '#3085d6');
            //             } else { Swal.fire('수정실패.', '중복되는 메뉴 이름이 존재합니다.', 'error', '#3085d6'); }
            //         }).catch(error => console.log(error))
            //     } else { Swal.fire('수정실패.', '중복되는 메뉴 아이디가 존재합니다.', 'error', '#3085d6'); }
            // }).catch(error => console.log(error))

            if(props.menuCode != "" ? props.firstCode == props.menuCode ? true : (props.returnCode.length > 0 ? false : true) : false){
                if(props.menuName != "" ? props.firstName == props.menuName ? true : (props.returnName.length > 0 ? false : true) : false){
                  // axios.get("http://localhost:8080/menu/menulist/"+ props.menuSeq)
                  // .then((response) => {console.log(response.data); if(response.data != 0){Swal.fire('수정실패.', '부모메뉴가 자식메뉴로 들어갈 수 없습니다.', 'error', '#3085d6');}})
                  // .catch((error) => console.log(error))
                  
                    props.updateMenu(menuSeq);
                  Swal.fire('메뉴 수정이 완료되었습니다.', '', 'success', '#3085d6');
                }else Swal.fire('수정실패.', '중복되는 메뉴 이름이 존재합니다.', 'error', '#3085d6');
              }else Swal.fire('수정실패.', '중복되는 메뉴 아이디가 존재합니다.', 'error', '#3085d6');

            props.setUpdateCheck(false);
        }
        if (!result.isConfirmed) {
            props.setUpdateCheck(false);
        }
    })
}


export default UpdateMenuAlert;