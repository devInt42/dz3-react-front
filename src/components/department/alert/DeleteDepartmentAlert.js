import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const DeleteDepartmentAlert = (props) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: '삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        width: '600px'

    }).then(result => {
        if(result.isConfirmed) {
            Swal.fire('삭제가 완료되었습니다.', '', 'success','#3085d6');
            props.Delete(props.seq);
            props.setRefresh(props.refresh + 1);
            props.setCheckDelete(false);
            props.InitSeq();
        }
        if(!result.isConfirmed) {
            props.setCheckDelete(false);
        }
    })

}

export default DeleteDepartmentAlert;