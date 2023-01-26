import React, { useEffect, useState } from "react";
import axios from "axios";

import { RiPagesLine, RiPagesFill } from "react-icons/ri";

function MenuItems(props) {

    const menuSequence = props.menuSeq

    const baseUrl = "http://localhost:8080";
    const [subMenu, setSubMenu] = useState([]);
    
    const [childMenu, setChildMenu] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + menuSequence)
        .then(response => {setSubMenu(response.data)})
        .catch(error => console.log(error))
    }, [menuSequence]);

    const send = (resultMenu) => {
        props.searchInfo(resultMenu)
    }

    const [count, setCount] = useState(0);
    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/getcount/' + menuSequence)
        .then(response => {setCount(response.data)})
        .catch(error => console.log(error))
    }, [menuSequence]);

    console.log("count : " + count)

    return (
        <div>
            {subMenu.map((menu) => {
                return (
                    <div key={menu.menuSeq}>
                        <div style={{ paddingLeft: (menu.menuDepth - 1) * 22, paddingRight: '20px' }}>
                            <div onClick={()=>{childMenu.includes(menu.menuSeq) ? setChildMenu(childMenu.filter(data => data != menu.menuSeq)) :
                                            setChildMenu([...childMenu, menu.menuSeq]); send(menu)}}>
                                {count == 0 ? <RiPagesLine/> : <RiPagesFill/>}
                                {menu.menuName}
                            </div>
                        </div>
                        {
                            childMenu.includes(menu.menuSeq) && <MenuItems menuSeq={menu.menuSeq} searchInfo={props.searchInfo}/>
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default MenuItems;