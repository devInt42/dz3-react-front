import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

function NotSelectedMenu(){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(`/dz3/notselected`);
    }, [])
}

export default NotSelectedMenu;