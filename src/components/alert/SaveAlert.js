import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SaveAlert = (props) => {
    const MySwal = withReactContent(Swal);

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
        if(result.isConfirmed && props.functionText == "수정") {
            Swal.fire('수정이 완료되었습니다.', '', 'success','#3085d6');
            props.Update();
            props.setAllCheck(false);
            props.setRefresh(props.refresh + 1);
            props.setInsertForm(false);
        }
        if(!result.isConfirmed) {
            props.setAllCheck(false);
        }
    })
}

export default SaveAlert;