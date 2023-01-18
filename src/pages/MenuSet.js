import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { VscExpandAll } from "react-icons/vsc";
import { GrCircleAlert } from "react-icons/gr";

import style from "../css/MenuSet.module.css"

import MenuSearch from "../components/menu/MenuSearch";
import SaveMenuAlert from "../components/alert/SaveMenuAlert"
import SaveFailMenuAlert from "../components/alert/SaveFailMenuAlert"

function MenuSet() {

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);

    const [menuCode, setMenuCode] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuParent, setMenuParent] = useState(0);
    const [menuDepth, setMenuDepth] = useState(0);

    const insertMenuCode = (e) => {
        setMenuCode(e.target.value);
    }
    const insertMenuName = (e) => {
        setMenuName(e.target.value);
    }
    const insertMenuParent = (e) => {
        setMenuParent(e.target.value);
        //axios.get(baseUrl + '/menu/menulist/' + menuParent).then(response => setMenuDepth(response.data)).catch(error => console.log(error))
    }
    const insertMenuDepth = (e) => {
        setMenuDepth(e.target.value);
    }

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/getdepth/' + menuParent).then(response => { console.log(response.data); setMenuDepth(response.data) }).catch(error => console.log(error));
    }, [menuParent]);

    const [inputCheck, setInputCheck] = useState(false);
    const [saveFail, setSaveFail] = useState();
    function validCheck() {
        if (menuCode.length == 0) {
            setSaveFail(<SaveFailMenuAlert />);
        }
        if (menuName.length == 0) {
            setSaveFail(<SaveFailMenuAlert />);
        }
        setInputCheck(true);
    }

    return (
        <div>
            <div className={style.wrap}>
                <span style={{ fontSize: "25px" }}><VscExpandAll />&nbsp;&nbsp;메뉴사용설정</span><hr />
                <div className={style.menu_notice}><GrCircleAlert /> LastDanth10의 사용자/담당자 메뉴를 관리할 수 있습니다.</div>
                <Row>
                <Col md="auto" style={{ border: "1px solid black", width: "22%", height: "100vh", marginTop: "10px", marginLeft: "10px", overflow:"scroll" }}>
                    <MenuSearch />
                </Col>
                <Col md="auto" style={{ border: "1px solid black", padding: "0px", width: "74%", height: "100vh", marginTop: "10px", marginLeft: "10px" }}>
                <div className={style.tableWrap}>
                    <h6>메뉴 상세</h6>
                    <table className={style.setTable}>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th>메뉴 아이디</th>
                                <td><input type="text" className={style.menu_btn_input} onChange={insertMenuCode} /></td>
                            </tr>

                            <tr>
                                <th>메뉴 이름</th>
                                <td><input type="text" className={style.menu_btn_input} onChange={insertMenuName} /></td>
                            </tr>
                            <tr>
                                <th>상위 메뉴</th>
                                <td><select className={style.menu_select} onChange={insertMenuParent} value={menuParent}>
                                    {menu.map((menu, i) => (
                                        <option value={menu.menuSeq} key={i}>
                                            {menu.menuName}
                                        </option>
                                    ))}
                                </select></td>
                            </tr>
                            <tr>
                                <th>메뉴 레벨</th>
                                <td><input className={style.menu_btn_input} style={{ backgroundColor: "rgba(250, 5, 5, 0.137)" }} type="text" value={menuDepth + 1} readOnly /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={style.menu_btn}>
                        <button className={style.menu_save} onClick={() => { validCheck(); }}>저장</button>
                        {
                            inputCheck && <SaveMenuAlert setInputCheck={setInputCheck} insertMenu={insertMenu} />
                        }
                        {saveFail}
                        <button className={style.menu_delete}>삭제</button>
                        <button className={style.menu_update}>수정</button>
                    </div>
                </div></Col></Row>
            </div>
        </div>
    );

    async function insertMenu() {
        const url = baseUrl + "/menu";
        const data = {
            menuCode: menuCode,
            menuName: menuName,
            menuParent: menuParent,
            menuDepth: menuDepth + 1
        }
        console.log(data)
        axios({
            method: "post",
            url: url,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then((res) => { console.log("저장성공!!"); }).catch((error) => { console.log(error); });
    }

}

export default MenuSet;
