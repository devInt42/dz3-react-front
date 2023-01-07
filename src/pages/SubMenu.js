import React, { useEffect, useState } from "react";
import axios from "axios";

function SubMenu(menuId) {
    console.log("서브메뉴옴")
    console.log(menuId)

    //console.log(childrens)
    // const baseUrl = "http://localhost:8080";
    // const [subMenu, setSubMenu] = useState([]);

    // console.log(props.menu.menu_name)

    // useEffect(() => {
    //     axios.get(baseUrl + '/menu/sublist').then(response => setSubMenu(response.data)).catch(error => console.log(error))
    // }, []);

    // return (
    //     <div>
    //         <div>{props.menu.menu_name}</div>
    //         <div>
    //             {props.menu.childrens.map((child) => (<SubMenu menu={child} />))}
    //         </div>
    //     </div>
    // );

    // return (
    //     <div>
    //         <div depth={depth}>[{depth}]{item.menu_Name}</div>
    //         <div>
    //             {item.childrens.map((child) => (
    //                 <SubMenu item={child} depth={depth + 1} />
    //             ))}
    //         </div>
    //     </div>
    // );
}

export default SubMenu;