import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EmpAlert = (props) => {
    const MySwal = withReactContent(Swal);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        setStatus(false);
    },[status])
    MySwal.fire({
        title: props.title,
        icon: props.icon,
        text: props.text,
        showCancelButton: props.cancleButton,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: props.successButton,
        cancelButtonText: '취소',
        width: '600px'
    }).then(result => {
        console.log("gdgd");
        if (result.isConfirmed && props.functionText == "수정") {
            props.Update();
            Swal.fire('수정이 완료되었습니다.', '', 'success', '#3085d6');
            props.setStatus(true);
        }
        if (result.isConfirmed && props.functionText == "저장") {
            props.Insert();
            Swal.fire('입사처리가 완료되었습니다.', '', 'success', '#3085d6');
            props.setStatus(true);
        }
        if (result.isConfirmed && props.functionText == "취소") {
            props.Cancle(props.idx);
        }
        if (result.isConfirmed && props.functionText == "삭제") {
            props.Delete(props.data);
            Swal.fire('삭제가 완료되었습니다.', '', 'success', '#3085d6');
            props.setDeleteFlag(true);
        }
        if (result.isConfirmed && props.functionText == "회원삭제") {
            props.Delete();
            Swal.fire('삭제가 완료되었습니다.', '', 'success', '#3085d6');
            props.setDeleteFlag(true);
        }
    })
}

export default EmpAlert;