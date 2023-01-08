import DaumPostCode from 'react-daum-postcode';

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
        <div>
            <DaumPostCode onComplete={(data) => handleZipCode(data)} className="post-code"/>
            <button onClick={() => props.onClose()}>닫기</button>
        </div>
    )
}

export default ZippopupZipCode;