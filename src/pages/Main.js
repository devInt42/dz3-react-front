import React, { useEffect, useState, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import calendar from "../components/images/calendar.png"
import email from "../components/images/email.png"
import phone from "../components/images/phone.png"
import script from "../components/images/script.png"
import calculator from "../components/images/calculator.png"

import style from "../components/images/images.module.css"

function Main() {
    return (
        <div className={style.backImg}>
            <div className={style.main_title}>LastDanth <span style={{color: "rgba(0, 170, 255)"}}>10</span></div>
            {/* <img src={backImg} className={style.backImg}/> */}
            <div className={style.itemWrapper}>
                <figure style={{ width: '100%' }}>
                    <Row style={{ display: 'flex' }}>
                        <Col><img src={calendar} className={style.itemLi} /><figcaption className={style.itemNm}>일정</figcaption></Col>
                        <Col><img src={email} className={style.itemLi} /><figcaption className={style.itemNm}>메일</figcaption></Col>
                        <Col><img src={phone} className={style.itemLi} /><figcaption className={style.itemNm}>주소록</figcaption></Col>
                        <Col><img src={script} className={style.itemLi} /><figcaption className={style.itemNm}>지출관리</figcaption></Col>
                        <Col><img src={calculator} className={style.itemLi} /><figcaption className={style.itemNm}>회계관리</figcaption></Col>
                    </Row>
                </figure>
            </div>

        </div>
    );
}

export default Main;