import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function SaveFailEmployeeAlert(props) {
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: props.title,
    text: props.text,
    icon: 'error',
    width: '600px',
  })
}


export default SaveFailEmployeeAlert;