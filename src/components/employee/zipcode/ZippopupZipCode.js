import DaumPostCode from 'react-daum-postcode';
import Modal from "react-modal";
import { TfiClose } from 'react-icons/tfi'
import './ZippopupZipCode.css'

const ZippopupZipCode = (props) => {
    const handleZipCode = (data) => {
        let address = `${data.address}`

        data.buildingName === "" ? address = address : address = address + ` (${data.buildingName})`;

        props.setFirstAddr(address);
        props.setAddrCode(data.zonecode);
        props.onClose(false);
    }
    return (
        <Modal isOpen={true} id="modal">
            <DaumPostCode onComplete={(data) => handleZipCode(data)} className="post-code" />
            <button className="infoclosebutton" onClick={() => props.onClose(false)}><TfiClose /></button>
        </Modal>
    )
}

export default ZippopupZipCode;