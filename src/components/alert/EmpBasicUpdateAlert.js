import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useEffect } from 'react';

function EmpBasicUpdateAlert(props) {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: '수정하시겠습니까?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '수정',
    cancelButtonText: '취소',
    width: '600px'

  }).then(result => {
    if(result.isConfirmed) {
        Swal.fire('수정이 완료되었습니다.', '', 'success','#3085d6');
        props.updateEmp();
        props.setUpdateCheck(false);
    }
    if(!result.isConfirmed) {
        props.setUpdateCheck(false);
    }
  })
}


export default EmpBasicUpdateAlert;