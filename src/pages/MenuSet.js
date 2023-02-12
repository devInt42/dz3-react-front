import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { VscExpandAll } from "react-icons/vsc";
import { GrCircleAlert } from "react-icons/gr";
import { FcPlus } from "react-icons/fc";

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
    setSelectActive(false);
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
    } else setUpdateCheck(true);
  }

  const exceptMenu = menu.filter((item) => item.menuSeq != menuSeq);

  const [selectActive, setSelectActive] = useState(false);
  const newInsert = () => {
    setMenuCode("");
    setMenuName("");
    setMenuParent(0);
    setSelectActive(true);
  };

  // 메뉴 아이디 중복체크
  useEffect(() => {
    codeCheck();
  }, [menuCode]);

  const [returnCode, setReturnCode] = useState([]);
  const codeCheck = async () => {
    try {
      let codeRes = await axios.get(`${baseUrl}/menu/menulist/checkcode`, {
        params: { menuCode: menuCode },
      });
      setReturnCode(codeRes.data)
    } catch (error) {
      console.log(error);
    }
  };

  // 메뉴 이름 중복체크
  useEffect(() => {
    nameCheck();
  }, [menuName]);

  const [returnName, setReturnName] = useState([]);
  const nameCheck = async () => {
    try {
      let nameRes = await axios.get(`${baseUrl}/menu/menulist/checkname`, {
        params: { menuName: menuName },
      });
      setReturnName(nameRes.data)
    } catch (error) {
      console.log(error);
    }
  };

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
              <h5 style={{ display: "inline" }}>메뉴 상세</h5>
              <span style={{ float: "right" }} onClick={newInsert}>
                <FcPlus />&nbsp;
                새 메뉴 생성
              </span>
              <table className={style.setTable}>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>* 메뉴 아이디</th>
                    <td>
                      <input
                        type="text"
                        value={menuCode || ""}
                        className={style.menu_btn_input}
                        onChange={insertMenuCode}
                      />
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className={style.menu_btn_input}
                          value={menuCode || ""}
                          onChange={insertMenuCode}
                          autoComplete="off"
                          isValid={
                            menuCode != "" ? (returnCode.length > 0 ? false : true) : false
                          }
                          isInvalid={
                            menuCode != "" ? (returnCode.length > 0 ? true : false) : true
                          }
                        />
                        <Form.Control.Feedback type="valid">
                          사용 가능한 ID 입니다.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          중복된 아이디가 존재합니다.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </td>
                  </tr>

                  <tr>
                    <th>* 메뉴 이름</th>
                    <td>
                      <input
                        type="text"
                        value={menuName || ""}
                        className={style.menu_btn_input}
                        onChange={insertMenuName}
                      />
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className={style.menu_btn_input}
                          value={menuName || ""}
                          onChange={insertMenuName}
                          autoComplete="off"
                          isValid={
                            menuName != "" ? (returnName.length > 0 ? false : true) : false
                          }
                          isInvalid={
                            menuName != "" ? (returnName.length > 0 ? true : false) : true
                          }
                        />
                        <Form.Control.Feedback type="valid">
                          사용 가능한 메뉴이름 입니다.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          중복된 메뉴이름이 존재합니다.
                        </Form.Control.Feedback>
                      </Form.Group>
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
                        {/* {menu.map((menu, i) => ( */}
                        {selectActive == true
                          ? menu.map((menu, i) => (
                            <option value={menu.menuSeq} key={i}>
                              {menu.menuName}
                            </option>
                          ))
                          : exceptMenu.map((menu, i) => (
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
                        style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                        type="text"
                        value={menuDepth + 1}
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={style.menu_btn}>
                {selectActive == true ? (
                  <>
                    <button
                      className={style.menu_save}
                      onClick={() => {
                        validCheck();
                      }}
                    >
                      저장
                    </button>
                    <div>수정/삭제는 왼쪽 메뉴를 선택해주세요.</div>
                  </>
                ) : (
                  <>
                    <button
                      className={style.menu_delete}
                      onClick={() => deleteValid()}
                    >
                      삭제
                    </button>
                    <button
                      className={style.menu_update}
                      onClick={() => {
                        updateValid();
                      }}
                    >
                      수정
                    </button>
                  </>
                )}
                {inputCheck && (
                  <SaveMenuAlert
                    setInputCheck={setInputCheck}
                    insertMenu={insertMenu}
                    menuCode={menuCode}
                    menuName={menuName}
                  />
                )}
                {saveFail}

                {deleteCheck && (
                  <DeleteMenuAlert
                    deleteMenu={deleteMenu}
                    menuSeq={menuSeq}
                    menuName={menuName}
                    setDeleteCheck={setDeleteCheck}
                  />
                )}

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
    axios({
      method: "post",
      url: url,
      data: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => { })
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
      .then((res) => { })
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
      .then((res) => { })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default MenuSet;
