import React from 'react';
import '../Modals/Modal.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Modal = (props) => {
    const { open, close, header } = props;

    return (
        //open 누르면 openModal 클래스 생성
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}                   
                        <button className='close' onClick={close}>X</button>
                    </header> 
                    <main>
                        전체그룹 | 마이그룹
                        <hr />

                        <Container>
                            <Row>
                                <Col sm={3} className='test1'>{props.children}값1
                                </Col>

                                <Col sm={5} className='test2'>값2
                                </Col>

                                <Col sm={4} className='test3'>값3
                                </Col>
                            </Row>
                        </Container></main>
                </section>
            ) : null}
        </div>
    )
}

export default Modal;