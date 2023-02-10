import DaumPostCode from "react-daum-postcode";
// /import Modal from "react-modal";
import { Modal } from "react-bootstrap";
import { TfiClose } from "react-icons/tfi";
import "./ZippopupZipCode.css";
import style from "../zipcode/ZippopupZipCode.css";
import { useState } from "react";
const ZippopupZipCode = (props) => {
  const [show, setShow] = useState(true);

  const handleZipCode = (data) => {
    let address = `${data.address}`;

    data.buildingName === ""
      ? (address = address)
      : (address = address + ` (${data.buildingName})`);

    props.setAddress(address);
    props.setCompanyZipCode(data.zonecode);
    props.onClose(false);
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <DaumPostCode
          onComplete={(data) => handleZipCode(data)}
          className="post-code"
        />
      </Modal.Body>
    </Modal>
  );
};

export default ZippopupZipCode;
