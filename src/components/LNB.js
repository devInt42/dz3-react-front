import React, { useEffect, useState } from "react";
import axios from "axios";


import SystemSet from "../pages/SystemSet";
import style from "../css/LNB.module.css"

function LNB(props) {

    return (

        <div className={style.lnb}>
            {props.gnbNum == 0 && <div><h4>{props.menuName}</h4>{props.menuId}<SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 1 && <div><h4>{props.menuName}</h4>{props.menuId}<SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 2 && <div><h4>{props.menuName}</h4>{props.menuId}<SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 3 && <div><h4>{props.menuName}</h4>{props.menuId}<SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 4 && <div><h4>{props.menuName}</h4>{props.menuId}<SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 5 && <div><h4>{props.menuName}</h4>{props.menuId}<SystemSet menuId={props.menuId} /></div>}
        </div>

    );
}

export default LNB;