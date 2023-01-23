import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import SubMenuGroup from "./SubMenuGroup";
import "./AuthGroup.css";

const AuthMenu = () => {
  const baseUrl = "http://localhost:8080";
  const [menuList, setMenuList] = useState([]);

  // 전체 메뉴리스트 호출
  const getAllMenuList = async () => {
    let sendData = {
      menuParent: "0",
      menuDepth: "0",
    };
    try {
      let menuRes = await axios.get(`${baseUrl}/menu/tree`, {
        params: sendData,
      });
      setMenuList(menuRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMenuList();
  }, []);

  return (
    <div style={{ border: "1px solid #f3f3f3" }}>
      <Accordion alwaysOpen>
        {menuList &&
          menuList.map((menuItem) => (
            <Accordion.Item key={menuItem.menuSeq} eventKey={menuItem.menuSeq}>
              <Accordion.Header>{menuItem.menuName}</Accordion.Header>
              <Accordion.Body>
                <SubMenuGroup
                  parentSeq={menuItem.menuSeq}
                  depth={menuItem.menuDepth}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </div>
  );
};
export default AuthMenu;
