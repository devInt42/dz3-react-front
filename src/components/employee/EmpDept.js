import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/EmpDept.module.css"

function EmpDept() {
    return (
        <div>
            <table className={style.dept_tbl}>
                <thead></thead>
                <tbody>
                    <tr>
                        <th>회사/부서</th>
                        <td colSpan={3}>content</td>
                    </tr>
                    <tr>
                        <th>사번</th>
                        <td colSpan={3}>content</td>
                    </tr>
                    <tr>
                        <th>회사구분</th>
                        <td>주회사</td>
                        <th>부서구분</th>
                        <td>부부서</td>
                    </tr>
                    
                    <tr>
                        <th>직급</th>
                        <td>사원</td>
                        <th>직책</th>
                        <td>개발</td>
                    </tr>
                    <tr>
                        <th>재직구분</th>
                        <td colSpan={3}>재직</td>
                        
                    </tr>
                    
                    <tr>
                        <th>입사일</th>
                        <td>2022</td>
                        <th>퇴사일</th>
                        <td>2023</td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>01012345678</td>
                        <th>팩스번호</th>
                        <td>01012345678</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colSpan={3}>addr</td>
                    </tr>
                    <tr>
                        <th>조직도</th>
                        <td colSpan={3}>사용</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmpDept;