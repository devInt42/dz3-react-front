import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function UpdateFailMenuAlert(props) {
  const MySwal = withReactContent(Swal)
MySwal.fire({
  title:'필수 정보를 입력하지 않았습니다.',
  text: '필수 정보를 입력해 주십시오.',
  icon: 'error',
  width: '600px',
})
props.setUpdateCheck(false);
}


export default UpdateFailMenuAlert;