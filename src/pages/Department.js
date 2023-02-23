import DepartmentDetail from "../components/department/DepartmentDetail";
import DepartmentList from "../components/department/DepartmentList";
import Alert from "react-bootstrap/Alert";
import "../components/department/css/Department.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DepartmentNotSelect from "../components/department/DepartmentNotSelect";
import DepartmentSearch from "../components/department/DepartmentSearch";
import SearchResult from "../components/department/SearchResult";
const Department = () => {
  const [departmentSeq, setDepartmentSeq] = useState(0);
  const [workplaceSeq, setWorkplaceSeq] = useState(0);
  const [companySeq, setCompanySeq] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [detailFlag, setDetailFlag] = useState(false);
  const [insertForm, setInsertForm] = useState(false);
  const [depth, setDepth] = useState(0);
  const InitSeq = () => {
    setWorkplaceSeq(0);
    setDepartmentSeq(0);
  };
  useEffect(() => {}, [searchData]);
  return (
    <div>
      <h2>부서 관리</h2>
      <hr className="line"></hr>
      <DepartmentSearch
        setSearch={setSearch}
        setSearchData={setSearchData}
        searchData={searchData}
        setCompanySeq={setCompanySeq}
        companySeq={companySeq}
      />
      <Alert variant="secondary" className="header-alert">
        <IoInformationCircleOutline /> 회사별 조직도(부서)를 등록할 수 있습니다.
      </Alert>
      <div id="department-form">
        <div id="department-list-box">
          <DepartmentList
            setDepartmentSeq={setDepartmentSeq}
            setWorkplaceSeq={setWorkplaceSeq}
            setCompanySeq={setCompanySeq}
            refresh={refresh}
            setSearch={setSearch}
            setDetailFlag={setDetailFlag}
            companySeq={companySeq}
            setDepth={setDepth}
          />
        </div>

        {search && (
          <div id="department-info">
            <SearchResult
              searchData={searchData}
              setSearch={setSearch}
              setDepartmentSeq={setDepartmentSeq}
              setWorkplaceSeq={setWorkplaceSeq}
              setCompanySeq={setCompanySeq}
              setDetailFlag={setDetailFlag}
            />
          </div>
        )}
        {detailFlag && !search && (
          <div id="department-info">
            <DepartmentDetail
              departmentSeq={departmentSeq}
              workplaceSeq={workplaceSeq}
              companySeq={companySeq}
              setRefresh={setRefresh}
              InitSeq={InitSeq}
              refresh={refresh}
              setDetailFlag={setDetailFlag}
              setInsertForm={setInsertForm}
              insertForm={insertForm}
              setSearch={setSearch}
            />
          </div>
        )}
        {workplaceSeq !== 0 && !search && !detailFlag && (
          <div id="companynotselectform">
            <div>
              <Button
                variant="outline-success"
                onClick={() => {
                  setDetailFlag(true);
                  setInsertForm(true);
                }}
              >
                부서 추가
              </Button>
            </div>
          </div>
        )}
        {workplaceSeq === 0 && !search && (
          <div id="companynotselectform">
            <div>
              <DepartmentNotSelect />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Department;
