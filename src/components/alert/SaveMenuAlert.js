import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";

function SaveMenuAlert(props) {
  const MySwal = withReactContent(Swal);

  const menuCode = props.menuCode;
  const menuName = props.menuName;

  MySwal.fire({
    title: '저장하시겠습니까?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '저장',
    cancelButtonText: '취소',
    width: '600px'

  }).then(result => {
    if (result.isConfirmed) {
      axios.get('http://localhost:8080/menu/menulist/checkcode/' + menuCode).then(response => {
        if (response.data == 0) {
          axios.get('http://localhost:8080/menu/menulist/checkname/' + menuName).then(response => {
            if (response.data == 0){
              props.insertMenu();
              Swal.fire('저장이 완료되었습니다.', '', 'success', '#3085d6');
            }else{Swal.fire('저장실패.', '중복되는 메뉴 이름이 존재합니다.', 'error', '#3085d6');}
          }).catch(error => console.log(error))
        } else { Swal.fire('저장실패.', '중복되는 메뉴 아이디가 존재합니다.', 'error', '#3085d6'); }
      }).catch(error => console.log(error))
      props.setInputCheck(false);
    }

    if (!result.isConfirmed) {
      props.setInputCheck(false);
    }
  })
}


export default SaveMenuAlert;