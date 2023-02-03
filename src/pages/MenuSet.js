import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { VscExpandAll } from "react-icons/vsc";
import { GrCircleAlert } from "react-icons/gr";

import style from "../components/menu/css/MenuSet.module.css";

import MenuSearch from "../components/menu/MenuSearch";
import SaveMenuAlert from "../components/alert/SaveMenuAlert";
import SaveFailMenuAlert from "../components/alert/SaveFailMenuAlert";
import DeleteMenuAlert from "../components/alert/DeleteMenuAlert";
import UpdateMenuAlert from "../components/alert/UpdateMenuAlert";
import UpdateFailMenuAlert from "../components/alert/UpdateFaliMenuAlert";

function MenuSet() {
  const baseUrl = "http://localhost:8080";
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + "/menu/menulist")
      .then((response) => setMenu(response.data))
      .catch((error) => console.log(error));
  }, []);

  const [menuSeq, setMenuSeq] = useState(0);
  const [menuCode, setMenuCode] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuParent, setMenuParent] = useState(0);
  const [menuDepth, setMenuDepth] = useState(0);

  const insertMenuCode = (e) => {
    setMenuCode(e.target.value);
  };
  const insertMenuName = (e) => {
    setMenuName(e.target.value);
  };
  const insertMenuParent = (e) => {
    setMenuParent(e.target.value);
    //axios.get(baseUrl + '/menu/menulist/' + menuParent).then(response => setMenuDepth(response.data)).catch(error => console.log(error))
  };
  const insertMenuDepth = (e) => {
    setMenuDepth(e.target.value);
  };

  useEffect(() => {
    axios
      .get(baseUrl + "/menu/menulist/getdepth/" + menuParent)
      .then((response) => {
        setMenuDepth(response.data);
      })
      .catch((error) => console.log(error));
  }, [menuParent]);

  const [inputCheck, setInputCheck] = useState(false);
  const [saveFail, setSaveFail] = useState();
  function validCheck() {
    if (menuCode.length == 0) {
      setSaveFail(<SaveFailMenuAlert setInputCheck={setInputCheck} />);
    }
    if (menuName.length == 0) {
      setSaveFail(<SaveFailMenuAlert setInputCheck={setInputCheck} />);
    }
    setInputCheck(true);
  }

  const getSearchInfo = (resultMenu) => {
    setMenuSeq(resultMenu.menuSeq);
    setMenuCode(resultMenu.menuCode);
    setMenuName(resultMenu.menuName);
    setMenuParent(resultMenu.menuParent);
  };

  const [deleteCheck, setDeleteCheck] = useState(false);
  function deleteValid() {
    if (menuCode.length == 0 || menuName.length == 0) {
      alert("삭제할 메뉴를 선택해 주세요.");
    } else setDeleteCheck(true);
  }

  const [updateCheck, setUpdateCheck] = useState(false);
  const [updateFail, setUpdateFail] = useState();
  function updateValid() {
    if (menuCode.length == 0 || menuName.length == 0) {
      setUpdateFail(<UpdateFailMenuAlert setUpdateCheck={setUpdateCheck} />);
    }else setUpdateCheck(true);
  }

  return (
    <div>
      <div className={style.wrap}>
        <span style={{ fontSize: "25px" }}>
          <VscExpandAll />
          &nbsp;&nbsp;메뉴사용설정
        </span>
        <hr />
        <div className={style.menu_notice}>
          <GrCircleAlert /> LastDanth10의 사용자/담당자 메뉴를 관리할 수
          있습니다.
        </div>
        <Row>
          <Col
            md="auto"
            style={{
              border: "1px solid black",
              width: "22%",
              height: "100vh",
              marginTop: "10px",
              marginLeft: "10px",
              overflow: "scroll",
            }}
          >
            <MenuSearch getSearchInfo={getSearchInfo} />
          </Col>
          <Col
            md="auto"
            style={{
              padding: "0px",
              width: "74%",
              height: "100vh",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <div className={style.tableWrap}>
              <h6>메뉴 상세</h6>
              <table className={style.setTable}>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>메뉴 아이디</th>
                    <td>
                      <input
                        type="text"
                        value={menuCode || ""}
                        className={style.menu_btn_input}
                        onChange={insertMenuCode}
                        />
                    </td>
                  </tr>

                  <tr>
                    <th>메뉴 이름</th>
                    <td>
                      <input
                        type="text"
                        value={menuName || ""}
                        className={style.menu_btn_input}
                        onChange={insertMenuName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>상위 메뉴</th>
                    <td>
                      <select
                        className={style.menu_select}
                        onChange={insertMenuParent}
                        value={menuParent}
                      >
                        {menu.map((menu, i) => (
                          <option value={menu.menuSeq} key={i}>
                            {menu.menuName}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>메뉴 레벨</th>
                    <td>
                      <input
                        className={style.menu_btn_input}
                        style={{ backgroundColor: "rgba(250, 5, 5, 0.137)" }}
                        type="text"
                        value={menuDepth + 1}
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={style.menu_btn}>
                <button
                  className={style.menu_save}
                  onClick={() => {
                    validCheck();
                  }}
                >
                  저장
                </button>
                {inputCheck && (
                  <SaveMenuAlert
                    setInputCheck={setInputCheck}
                    insertMenu={insertMenu}
                    menuCode={menuCode}
                    menuName={menuName}
                  />
                )}
                {saveFail}
                <button
                  className={style.menu_delete}
                  onClick={() => deleteValid()}
                >
                  삭제
                </button>
                {deleteCheck && (
                  <DeleteMenuAlert
                    deleteMenu={deleteMenu}
                    menuSeq={menuSeq}
                    menuName={menuName}
                    setDeleteCheck={setDeleteCheck}
                  />
                )}
                <button
                  className={style.menu_update}
                  onClick={() => {
                    updateValid();
                  }}
                >
                  수정
                </button>
                {updateCheck && (
                  <UpdateMenuAlert
                    updateMenu={updateMenu}
                    menuSeq={menuSeq}
                    menuCode={menuCode}
                    menuName={menuName}
                    setUpdateCheck={setUpdateCheck}
                  />
                )}
                {updateFail}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );

  async function insertMenu() {
    const url = baseUrl + "/menu";
    const data = {
      menuCode: menuCode,
      menuName: menuName,
      menuParent: menuParent,
      menuDepth: menuDepth + 1,
    };
    console.log(data);
    axios({
      method: "post",
      url: url,
      data: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("저장성공!!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteMenu(menuSeq) {
    const url = baseUrl + "/menu/menulist/delete/" + menuSeq;
    axios({
      method: "delete",
      url: url,
    })
      .then((res) => {
        console.log("삭제성공!!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateMenu(menuSeq) {
    const url = baseUrl + "/menu/menulist/update/" + menuSeq;
    const data = {
      menuCode: menuCode,
      menuName: menuName,
      menuParent: menuParent,
      menuDepth: menuDepth + 1,
    };
    axios({
      method: "patch",
      url: url,
      data: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("수정성공!!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default MenuSet;
