import React from 'react';
import '../Modals/Modal.css';

const Modal = (props) => {
    const {open, close, header} = props;

    return(
        //open 누르면 openModal 클래스 생성
        <div className={open ? 'openModal modal' : 'modal' }>
            {open ? (
                <section>
                    <header>
                        {header}   
                    </header>
                    <main>{props.children}</main>
                <footer>
                    <button className='close' onClick={close}>close</button>
                </footer>
                </section>
            ) : null}
        </div>
    )
}

export default Modal;