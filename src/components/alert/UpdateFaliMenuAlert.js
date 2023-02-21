import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { useEffect, useRef, useState } from "react";

function UpdateFailMenuAlert(props) {
  const MySwal = withReactContent(Swal)

useEffect(()=>{
  MySwal.fire({
    title:'필수 정보를 입력하지 않았습니다.',
    text: '필수 정보를 입력해 주십시오.',
    icon: 'error',
    width: '600px',
  })
  props.setUpdateCheck(false);
},[props])

}


export default UpdateFailMenuAlert;