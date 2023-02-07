import { display } from "@mui/system";
import React, { useEffect, useState, useCallback } from "react";

function NoMenu() {
  return (
    <div
      style={{
        border: "1px solid",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <p>페이지 구성이 필요합니다.</p>
    </div>
  );
}

export default NoMenu;
