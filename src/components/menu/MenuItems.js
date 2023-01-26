import React, { useEffect, useState } from "react";
import axios from "axios";

import { RiPagesLine, RiPagesFill } from "react-icons/ri";

function MenuItems(props) {

    const menuSequence = props.menuSeq

    const baseUrl = "http://localhost:8080";
    const [subMenu, setSubMenu] = useState([]);

    const [childMenu, setChildMenu] = useState("");

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + menuSequence)
        .then(response => {setSubMenu(response.data)})
        .catch(error => console.log(error))
    }, [menuSequence]);

    const send = (resultMenu) => {
        props.searchInfo(resultMenu)
    }

    return (
        <div>
            {subMenu.map((menu) => {
                return (
                    <div key={menu.menuSeq}>
                        <div style={{ paddingLeft: (menu.menuDepth - 1) * 22, paddingRight: '20px' }}>
                            <div onClick={()=>{setChildMenu(menu.menuSeq); send(menu)}}>
                                <RiPagesLine/>{menu.menuName}
                            </div>
                        </div>
                        {
                            childMenu == menu.menuSeq && <MenuItems menuSeq={menu.menuSeq} searchInfo={props.searchInfo}/>
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default MenuItems;