import DaumPostCode from 'react-daum-postcode';
import Modal from "react-modal";
import { Row } from "react-bootstrap";
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
        <Modal isOpen={true} ariaHideApp={false} id="postModal">
            <Row
                style={{
                    width: "100%",
                    height: "50px",
                }}
            >
                <button
                    className="infoclosebutton"
                    onClick={() => props.onClose(false)}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                    }}
                >
                    <TfiClose />
                </button>
            </Row>
            <Row style={{ width: "100%" }}>
                <DaumPostCode
                    style={{ height: "50vh" }}
                    onComplete={(data) => handleZipCode(data)}
                    className="post-code"
                />
            </Row>
        </Modal>
    )
}

export default ZippopupZipCode;