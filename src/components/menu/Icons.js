import React, { useEffect, useState } from "react";
import { RiBankFill } from "react-icons/ri";

function Icons() {
    const icon1 = "M7 4V2h10v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7zm0 2H5v14h14V6h-2v2H7V6zm2-2v2h6V4H9z";

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d= {icon1}/>
                </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M20 22H6.5A3.5 3.5 0 0 1 3 18.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2v-3H6.5a1.5 1.5 0 0 0 0 3H19z" />
                </g>
            </svg>
        </div>
    );
}

export default Icons;