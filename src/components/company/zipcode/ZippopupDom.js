import ReactDom from 'react-dom';

const ZippopupDom = ({children}) =>{
    const zipcode = document.getElementById("zippopupdom");
    
    return ReactDom.createPortal(children, zipcode);
};

export default ZippopupDom;