import DaumPostCode from 'react-daum-postcode';
import Modal from "react-modal";
import './ZippopupZipCode.css'
const ZippopupZipCode = (props) => {
    console.log("ZippopupZipCode")
    const handleZipCode = (data) => {
            console.log(data);
            let address = `${data.address}`

            data.buildingName === "" ? address = address : address = address + ` (${data.buildingName})`;

            props.setAddress(address);
            props.setCompanyZipCode(data.zonecode);
            props.onClose(false);
    }
    return (
        <Modal isOpen = {true} id = "modal">
            <DaumPostCode onComplete={(data) => handleZipCode(data)} className="post-code"/>
        </Modal>
    )
}

export default ZippopupZipCode;