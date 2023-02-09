import { useCallback, useEffect, useState } from "react";
import "./DepartmentModal.css";
import CompanyList from "./CompanyList";

const DepartmentModal = (props) => {
  const { open, close, header, getInfoCaLLback } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();
  const [companyName, setCompanyName] = useState();

  const [pointList, setPointList] = useState([]);

  function SelelctEmplList() {
    getInfoCaLLback(pointList);
  }

  const sendCompanyName = (i) => {
    setCompanyName(i);
  };
  const sendPointList = (e) => {
    setPointList(e);
  };

  //처음에 실행하고 바뀔때만 렌더링
  const changeDeptSeq = useCallback(() => {}, [departmentSeq]);
  const changeWorkSeq = useCallback(() => {}, [workplaceSeq]);
  const changeEmplSeq = useCallback(() => {}, [employeeSeq]);
  const changeComSeq = useCallback(() => {}, [departmentSeq]);

  useEffect(() => {
    setWorkplaceSeq(pointList.workplaceSeq);
    setDepartmentSeq(pointList.departmentSeq);
  }, [pointList]);
  useEffect(() => {
    changeDeptSeq();
  }, [departmentSeq]);

  useEffect(() => {
    changeWorkSeq();
  }, [workplaceSeq]);

  useEffect(() => {
    changeEmplSeq();
  }, [employeeSeq]);

  useEffect(() => {
    changeComSeq();
  }, [departmentSeq]);

  return (
    <div className={open ? "openModal modal dept" : "modal dept"}>
      {open ? (
        <section>
          <header>
            {header}

            <button
              className="OrganicBtn"
              onClick={() => {
                close();
              }}>
              X
            </button>
          </header>
          <main>
            <div style={{ paddingBottom: "15px" }}>• 선택 가능 목록</div>
            <div className="DeptModalDiv1">
              <CompanyList
                sendPointList={sendPointList}
                sendCompanyName={sendCompanyName}
              />
            </div>
            <div style={{ paddingTop: "10px" }}>
              <span style={{ paddingRight: "5px", marginLeft: "150px" }}>
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    close();
                  }}>
                  취소
                </button>
              </span>

              <button
                type="button"
                class="btn btn-primary"
                onClick={SelelctEmplList}>
                확인
              </button>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default DepartmentModal;
