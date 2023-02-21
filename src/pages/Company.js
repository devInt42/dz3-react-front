import { useCallback, useEffect, useState } from "react";
import CompanyList from "../components/company/CompanyList";
import "../components/company/css/Company.css";
import { GrAddCircle } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import CompanyNotSelect from "../components/company/CompanyNotSelect";
import CompanyDetail from "../components/company/CompanyDetail";
import CompanySearch from "../components/company/CompanySearch";

const Company = () => {
  const [detailFlag, setDetailFlag] = useState(false);
  const [companySeq, setCompanySeq] = useState();
  const [refresh, setRefresh] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [searchRefresh, setSearchRefresh] = useState(0);

  return (
    <div>
      <h2>회사 관리</h2>
      <hr className="line"></hr>
      <CompanySearch
        setSearchData={setSearchData}
        setSearchRefresh={setSearchRefresh}
        searchRefresh={searchRefresh}
      />
      <div id="companyform">
        <div>
          <CompanyList
            setDetailFlag={setDetailFlag}
            setCompanySeq={setCompanySeq}
            refresh={refresh}
            searchRefresh={searchRefresh}
            searchData={searchData}
          />
          <div id="idaddbox">
            <button
              id="idaddbutton"
              onClick={() => {
                setDetailFlag(!detailFlag);
                companySeq && setDetailFlag(true);
                setCompanySeq();
              }}
            >
              {addorcancel(detailFlag, companySeq)}
            </button>
          </div>
        </div>
        {detailFlag === false && (
          <div id="companynotselectform">
            <div>
              <CompanyNotSelect />
            </div>
          </div>
        )}

        {detailFlag && (
          <div className="company-info">
            <CompanyDetail
              setDetailFlag={setDetailFlag}
              companySeq={companySeq}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </div>
        )}
      </div>
    </div>
  );
};
const addorcancel = (addflag, companySeq) => {
  if (!addflag || companySeq) {
    return (
      <span id="addfont">
        <GrAddCircle />
        추가
      </span>
    );
  }
  if (addflag) {
    return (
      <span id="addfont">
        <GiCancel />
        취소
      </span>
    );
  }
};
export default Company;
