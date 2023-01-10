import React, { useEffect, useState } from "react";
import axios from "axios";


import SystemSet from "../pages/SystemSet";
import style from "../css/LNB.module.css"

function LNB(props) {

    const baseUrl = "http://localhost:8080";
    const [Lmenu, setLenu] = useState([]);


    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + props.menuId).then(response => setLenu(response.data)).catch(error => console.log(error));
    }, []);

    return (

        <div className={style.lnb}>
            {props.gnbNum == 0 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 1 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 2 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 3 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 4 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
            {props.gnbNum == 5 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
        </div>


    );
}

export default LNB;