import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { VscExpandAll } from "react-icons/vsc";
import { GrCircleAlert } from "react-icons/gr";
import { FcPlus } from "react-icons/fc";
import Icons from "../components/menu/Icons";

import style from "../components/menu/css/MenuSet.module.css";
import Switch from "@mui/material/Switch";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import MenuSearch from "../components/menu/MenuSearch";
import SaveMenuAlert from "../components/alert/SaveMenuAlert";
import SaveFailMenuAlert from "../components/alert/SaveFailMenuAlert";
import DeleteMenuAlert from "../components/alert/DeleteMenuAlert";
import UpdateMenuAlert from "../components/alert/UpdateMenuAlert";
import UpdateFailMenuAlert from "../components/alert/UpdateFaliMenuAlert";

function MenuSet() {
  const baseUrl = "http://localhost:8080";
  const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(baseUrl + "/menu/menulist")
  //     .then((response) => setMenu(response.data))
  //     .catch((error) => console.log(error));
  // }, []);
  const listMenu = async () => {
    try {
      let list = await axios.get(baseUrl + "/menu/menulist");
      setMenu(list.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listMenu();
  }, []);

  const [menuSeq, setMenuSeq] = useState(0);
  const [menuCode, setMenuCode] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuParent, setMenuParent] = useState(0);
  const [menuDepth, setMenuDepth] = useState(0);
  const [firstCode, setFirstCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [useYN, setUseYN] = useState(true);
  const [insertFlag, setInsertFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  // ????????? ??? ?????????
  useEffect(() => {
    setInsertFlag(false);
  }, [insertFlag]);
  // ????????? ?????????
  useEffect(() => {
    setDeleteFlag(false);
  }, [deleteFlag]);
  // ??????????????? ?????????
  useEffect(() => {
    setUpdateFlag(false);
  }, [updateFlag]);
  // ????????? API CORS ???????????? ??????
  // const [icons, setIcons] = useState([]);
  // const apiKey = {
  //   'Accept' : 'application/json',
  //   'Authorization' : 'zUEoAw8UfXGYbYU8NP0qBrDo3ovOlsxm0871jZVJ2LcYgDcQ'
  // };
  // useEffect(()=> {
  //   axios({
  //     method: 'get',
  //     url: 'https://api.flaticon.com/v3/item/icon/13719',
  //     headers: apiKey
  //   }).then((res) => setIcons(res.data)).catch((error)=> console.log(error))
  // }, [])
  // console.log(icons)

  // ????????????
  const space = /\s/;

  const insertMenuCode = (e) => {
    setMenuCode(e.target.value);
    if (menuCode.match(space)) {
      setMenuCode(menuCode.replace(" ", ""));
    }
  };
  const insertMenuName = (e) => {
    setMenuName(e.target.value);
    if (menuName.match(space)) {
      setMenuName(menuName.replace(" ", ""));
    }
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

  // insert ????????? ??????
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

    if (resultMenu.useYN == "Y") {
      setUseYN(true);
    } else {
      setUseYN(false);
    }
    setSelectActive(false);

    setFirstCode(resultMenu.menuCode);
    setFirstName(resultMenu.menuName);
    setImgFile(resultMenu.menuIcons);
  };

  const [deleteCheck, setDeleteCheck] = useState(false);
  function deleteValid() {
    setDeleteCheck(true);
  }

  // update ????????? ??????
  const [updateCheck, setUpdateCheck] = useState(false);
  const [updateFail, setUpdateFail] = useState();
  function updateValid() {
    if (menuCode.length == 0 || menuName.length == 0) {
      setUpdateFail(<UpdateFailMenuAlert setUpdateCheck={setUpdateCheck} />);
    } else setUpdateCheck(true);
  }

  const [allChildMenu, setAllChildMenu] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/menu/tree/" + menuSeq)
      .then((response) => {
        setAllChildMenu(response.data);
      })
      .catch((error) => console.log(error));
  }, [menuSeq]);

  // ?????? ?????? ?????? ??? ?????? ??????
  const exceptMenu = menu.filter((item) => item.menuSeq != menuSeq);
  // ????????? ????????? ???????????? ????????? ??? ???????????? ???????????? ???????????? ????????? ?????? ????????? ??????
  const exceptChildMenu = exceptMenu.filter((item) => {
    return !allChildMenu.some((other) => other.menuParent === item.menuParent);
  });

  //?????? ?????? ??????
  const [selectActive, setSelectActive] = useState(true);
  const newInsert = () => {
    setMenuCode("");
    setMenuName("");
    setMenuParent(0);
    setUseYN(true);
    setSelectActive(true);
    setFirstCode("");
    setFirstName("");
    setImgFile("");
  };

  // ?????? ????????? ????????????
  useEffect(() => {
    codeCheck();
  }, [menuCode]);

  const [returnCode, setReturnCode] = useState([]);
  const codeCheck = async () => {
    try {
      let codeRes = await axios.get(`${baseUrl}/menu/menulist/checkcode`, {
        params: { menuCode: menuCode },
      });
      setReturnCode(codeRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const label = { inputProps: { "aria-label": "Size switch demo" } };
  const [useMenu, setUseMenu] = useState("");
  useEffect(() => {
    if (useYN) {
      setUseMenu("Y");
    } else {
      setUseMenu("N");
    }
  }, [useYN]);

  // ?????? ?????? ????????????
  useEffect(() => {
    nameCheck();
  }, [menuName]);

  const [returnName, setReturnName] = useState([]);
  const nameCheck = async () => {
    try {
      let nameRes = await axios.get(`${baseUrl}/menu/menulist/checkname`, {
        params: { menuName: menuName },
      });
      setReturnName(nameRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ?????? ????????? ????????? ??????
  const [imgFile, setImgFile] = useState("");

  // const imgRef = useRef();
  // const saveImg = (e) => {
  //   setImgFile(URL.createObjectURL(e.target.files[0]));
  // }
  // const deleteImg = () => {
  //   URL.revokeObjectURL(imgFile);
  //   setImgFile("");
  // }

  return (
    <div>
      <div className={style.wrap}>
        <span style={{ fontSize: "25px" }}>
          <VscExpandAll />
          &nbsp;&nbsp;??????????????????
        </span>
        <hr />
        <div className={style.menu_notice}>
          <GrCircleAlert /> LastDanth10??? ?????????/????????? ????????? ????????? ???
          ????????????.
        </div>
        <Row>
          <Col md="auto" className={style.searchVar}>
            <MenuSearch
              getSearchInfo={getSearchInfo}
              insertFlag={insertFlag}
              deleteFlag={deleteFlag}
              updateFlag={updateFlag}
            />
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
              <h5 style={{ display: "inline" }}>?????? ??????</h5>
              <span style={{ float: "right" }} onClick={newInsert}>
                <FcPlus />
                &nbsp; ??? ?????? ??????
              </span>
              <table className={style.setTable}>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>* ?????? ?????????</th>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className={style.menu_btn_input}
                          value={menuCode || ""}
                          onChange={insertMenuCode}
                          autoComplete="off"
                          isValid={
                            menuCode != ""
                              ? firstCode == menuCode
                                ? true
                                : returnCode.length > 0
                                ? false
                                : true
                              : false
                          }
                          isInvalid={
                            menuCode != ""
                              ? firstCode == menuCode
                                ? false
                                : returnCode.length > 0
                                ? true
                                : false
                              : true
                          }
                        />
                        {menuCode == "" ? (
                          <Form.Control.Feedback type="invalid">
                            ???????????? ????????? ?????????.
                          </Form.Control.Feedback>
                        ) : firstCode == menuCode ? (
                          <Form.Control.Feedback type="valid">
                            ?????? ?????? ????????? ?????????.
                          </Form.Control.Feedback>
                        ) : (
                          <>
                            <Form.Control.Feedback type="valid">
                              ?????? ????????? ????????? ?????????.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              ????????? ???????????? ???????????????.
                            </Form.Control.Feedback>
                          </>
                        )}
                      </Form.Group>
                    </td>
                  </tr>

                  <tr>
                    <th>* ?????? ??????</th>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className={style.menu_btn_input}
                          value={menuName || ""}
                          onChange={insertMenuName}
                          autoComplete="off"
                          isValid={
                            menuName != ""
                              ? firstName == menuName
                                ? true
                                : returnName.length > 0
                                ? false
                                : true
                              : false
                          }
                          isInvalid={
                            menuName != ""
                              ? firstName == menuName
                                ? false
                                : returnName.length > 0
                                ? true
                                : false
                              : true
                          }
                        />
                        {menuName == "" ? (
                          <Form.Control.Feedback type="invalid">
                            ???????????? ????????? ?????????.
                          </Form.Control.Feedback>
                        ) : firstName == menuName ? (
                          <Form.Control.Feedback type="valid">
                            ?????? ?????? ?????? ?????????.
                          </Form.Control.Feedback>
                        ) : (
                          <>
                            <Form.Control.Feedback type="valid">
                              ?????? ????????? ???????????? ?????????.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              ????????? ??????????????? ???????????????.
                            </Form.Control.Feedback>
                          </>
                        )}
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>?????? ??????</th>
                    <td>
                      {["left"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              ?????? ???????????? <strong>??????</strong>??? ?????????{" "}
                              <strong>?????? ??????</strong>?????? ???????????? ????????????.
                              {/* <strong>{placement}</strong>. */}
                            </Tooltip>
                          }
                        >
                          <select
                            className={style.menu_select}
                            onChange={insertMenuParent}
                            value={menuParent}
                          >
                            <option value={0}>Root??????</option>
                            {/* {menu.map((menu, i) => ( */}
                            {selectActive == true
                              ? menu.map((menu, i) => (
                                  <option value={menu.menuSeq} key={i}>
                                    {menu.menuName}
                                  </option>
                                ))
                              : exceptChildMenu.map((menu, i) => (
                                  <option value={menu.menuSeq} key={i}>
                                    {menu.menuName}
                                  </option>
                                ))}
                          </select>
                        </OverlayTrigger>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>?????? ??????</th>
                    <td>
                      <input
                        className={style.menu_btn_input}
                        style={{
                          backgroundColor: "rgba(241, 199, 199, 0.328)",
                        }}
                        type="text"
                        value={menuDepth + 1}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>????????????</th>
                    <td>
                      <Switch
                        {...label}
                        size="small"
                        checked={useYN || false}
                        onChange={() => {
                          setUseYN(!useYN);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      &nbsp;
                      {useYN ? (
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                          ??????
                        </span>
                      ) : (
                        <span style={{ fontSize: "14px" }}>?????????</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>?????? ????????? ??????</th>
                    <td>
                      {/* <img src={imgFile ? imgFile : ""} style={{width: "30px", height: "30px"}}/>
                      <button onClick={()=> deleteImg()}>delete</button> */}
                      {imgFile && (
                        <img
                          src={process.env.PUBLIC_URL + imgFile}
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}
                      <Icons setImgFile={setImgFile} />
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
                      ??????
                    </button>
                    <div>??????/????????? ?????? ????????? ??????????????????.</div>
                  </>
                ) : (
                  <>
                    <button
                      className={style.menu_update}
                      onClick={() => {
                        updateValid();
                      }}
                    >
                      ??????
                    </button>
                    <button
                      className={style.menu_delete}
                      onClick={() => deleteValid()}
                    >
                      ??????
                    </button>
                  </>
                )}
                {inputCheck && (
                  <SaveMenuAlert
                    setInputCheck={setInputCheck}
                    insertMenu={insertMenu}
                    menuCode={menuCode}
                    menuName={menuName}
                    firstCode={firstCode}
                    returnCode={returnCode}
                    firstName={firstName}
                    returnName={returnName}
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
                    menuParent={menuParent}
                    setUpdateCheck={setUpdateCheck}
                    firstCode={firstCode}
                    returnCode={returnCode}
                    firstName={firstName}
                    returnName={returnName}
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
      useYN: useMenu,
      menuIcons: imgFile,
    };
    axios({
      method: "post",
      url: url,
      data: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setInsertFlag(true);
        newInsert();
        listMenu();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ??????
  async function deleteMenu(menuSeq) {
    const url = baseUrl + "/menu/menulist/delete/" + menuSeq;
    axios({
      method: "delete",
      url: url,
    })
      .then((res) => {
        setDeleteFlag(true);
        newInsert();
        listMenu();
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
      useYN: useMenu,
      menuIcons: imgFile,
    };
    axios({
      method: "patch",
      url: url,
      data: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setUpdateFlag(true);
        listMenu();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default MenuSet;
