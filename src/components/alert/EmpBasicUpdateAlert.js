import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useEffect, useState } from 'react';

function EmpBasicUpdateAlert(props) {
  const MySwal = withReactContent(Swal);

  const baseUrl = "http://localhost:8080";
  const [empSelected, setEmpSelected] = useState([]);
  useEffect(() => {
      axios
          .get(baseUrl + "/employee/emplist/" + props.employeeSeq)
          .then((response) => setEmpSelected(response.data[0]))
          .catch((error) => console.log(error));
  }, [props.employeeSeq]);

  MySwal.fire({
    title: empSelected.employeeName + '님의 정보를 수정하시겠습니까?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '수정',
    cancelButtonText: '취소',
    width: '600px'

  }).then(result => {
    if (result.isConfirmed) {
      // Swal.fire('수정이 완료되었습니다.', '', 'success','#3085d6');
      // props.updateEmp();

      // if(props.employeeId == "" || props.employeeCmail == ""){
      //   Swal.fire('why!!!!!!!!!!!', '', 'success','#3085d6');
      // }else 

      if (props.employeeId == "" || props.employeeCmail == "" || props.employeeId != "" || props.employeeCmail != "") {
        if ( props.firstId == props.employeeId ? true : (props.returnId.length > 0 ? false : true)) {
          if ( props.FirstMail == props.employeeCmail ? true : (props.returnCmail.length > 0 ? false : true)) {
            props.updateEmp();
            Swal.fire(empSelected.employeeName + '님의 정보가 수정되었습니다.', '', 'success', '#3085d6');
          } else { Swal.fire('중복된 메일 ID가 존재합니다.', '메일 ID를 확인해 주세요.', 'error', '#3085d6'); }
        } else { Swal.fire('중복된 로그인 ID가 존재합니다.', '로그인 ID를 확인해 주세요', 'error', '#3085d6'); }
      }

      props.setUpdateCheck(false);
    }
    if (!result.isConfirmed) {
      props.setUpdateCheck(false);
    }
  })
}


export default EmpBasicUpdateAlert;