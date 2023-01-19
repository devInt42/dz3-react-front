import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { AiFillFolderOpen } from "react-icons/ai";
import { HiOutlineSearchCircle } from "react-icons/hi";

import MenuItems from "./MenuItems";

function MenuSearch(props) {

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);
    const [subMenu, setSubmenu] = useState([]);
    const [searchMenu, setSearchMenu] = useState([]);

    const [selected, setSelected] = useState(0);
    const [search, setSearch] = useState("");

    const selectedMenu = (e) => {
        setSelected(e.target.value);
    }
    const getSearch = (e) => {
        setSearch(e.target.value);
    }
    const searched = searchMenu.filter((item) => {
        return item.menuName.replace(" ", "").toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setSearchMenu(response.data)).catch(error => console.log(error))
    }, []);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + selected).then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + selected).then(response => setSubmenu(response.data)).catch(error => console.log(error))
    }, [selected]);

    const searchInfo = (resultMenu) =>{
        props.getSearchInfo(resultMenu);
    }

    return (
        <div>
            <Row>
                <select onChange={selectedMenu} onClick={() => { setSearch("") }}>
                    <option value={0}>
                        전체
                    </option>
                    {menu.map((menu, i) => (
                        <option value={menu.menuSeq} key={i}>
                            {menu.menuName}
                        </option>
                    ))}
                </select>

                <div style={{ position: "relative" }}>
                    <input type="text" onChange={getSearch} placeholder="메뉴 검색"
                        style={{ width: "100%", padding: "5px 7px", fontSize: "14px" }} />
                    <HiOutlineSearchCircle style={{ position: "absolute", width: "30px", height: "30px", top: "4px", right: "12px", margin: "0" }} />
                </div>
            </Row>
            <Row>
                {search != "" ?
                    searched.map((menu) => {
                        return (
                            <div key={menu.menuSeq} onClick={()=>searchInfo(menu)}>{menu.menuName}</div>
                        )
                    }) :
                    subMenu.map((menu, i) => {
                        return (
                            <div key={i}>
                                <div onClick={()=>searchInfo(menu)}><AiFillFolderOpen />{menu.menuName}</div>
                                <div style={{ paddingLeft: "15px" }}>{<MenuItems menuSeq={menu.menuSeq} searchInfo={searchInfo}/>}</div>
                            </div>
                        );
                    })
                }
            </Row>
        </div>
    );

}



export default MenuSearch;