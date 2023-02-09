import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useEffect, useState } from 'react';

function EmpBasicSaveAlert(props) {
  const MySwal = withReactContent(Swal);
  const baseUrl = "http://localhost:8080";

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
    if(result.isConfirmed) {
      props.insertEmp();
      Swal.fire('저장이 완료되었습니다.', '', 'success','#3085d6');
      props.setInsertCheck(false);
    }
    if(!result.isConfirmed) {
      props.setInsertCheck(false);
    }
  })
}


export default EmpBasicSaveAlert;