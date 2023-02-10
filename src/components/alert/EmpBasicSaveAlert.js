import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useEffect, useState } from 'react';

function EmpBasicSaveAlert(props) {
  const MySwal = withReactContent(Swal);
  const baseUrl = "http://localhost:8080";

  MySwal.fire({
    title: props.employeeName + '님을 신규 등록하시겠습니까?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '저장',
    cancelButtonText: '취소',
    width: '600px'

  }).then(result => {
    if(result.isConfirmed) {
      // props.insertEmp();
      // Swal.fire('저장이 완료되었습니다.', '', 'success','#3085d6');

      // if(props.employeeId == "" || props.employeeCmail == ""){
      //   Swal.fire('공백.', '', 'success','#3085d6');
      // }
      if(props.employeeId == "" || props.employeeCmail == "" || props.employeeId != "" ? props.firstId == props.employeeId ? true : (props.returnId.length > 0 ? false : true) : false){
        if(props.employeeId == "" || props.employeeCmail == "" || props.employeeCmail != "" ? props.FirstMail == props.employeeCmail ? true :(props.returnCmail.length > 0 ? false : true) : false){
          props.insertEmp();
          Swal.fire('입사자 등록이 완료되었습니다.', '', 'success','#3085d6');
        }else{Swal.fire('중복된 메일 ID가 존재합니다.', '메일 ID를 확인해 주세요.', 'error','#3085d6');}
      }else{Swal.fire('중복된 로그인 ID가 존재합니다.', '로그인 ID를 확인해 주세요', 'error','#3085d6');}

      // if(props.employeeId != "" ? props.firstId == props.employeeId ? false : (props.returnId.length > 0 ? true : false) : true){
      //   Swal.fire('아이디 중복.', '', 'success','#3085d6');
      //   if(props.employeeCmail != "" ? props.FirstMail == props.employeeCmail ? false :(props.returnCmail.length > 0 ? true : false) : true){
      //     Swal.fire('메일 중복.', '', 'success','#3085d6');
      //   }
      // }
      
      props.setInsertCheck(false);
    }
    if(!result.isConfirmed) {
      props.setInsertCheck(false);
    }
  })
}


export default EmpBasicSaveAlert;