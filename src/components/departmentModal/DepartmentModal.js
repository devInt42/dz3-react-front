import { useCallback, useEffect, useState } from "react";
import "./DepartmentModal.css";
import CompanyList from "./CompanyList";
import { Button } from "react-bootstrap";

const DepartmentModal = (props) => {
  const { open, close, header, getInfoCaLLback } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();
  const [companyName, setCompanyName] = useState();
  const [companySeq, setCompanySeq] = useState();

  //dept에서 seq 받아오기
  const getComSeq = useCallback(() => {
    setCompanySeq(props.companySeq);
  }, [props]);

  useEffect(() => {
    getComSeq();
  }, [props]);

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
  useEffect(() => {}, [companySeq]);
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
                companySeq={companySeq}
              />
            </div>
            <div style={{ paddingTop: "10px" }}>
              <span style={{ paddingRight: "5px", marginLeft: "150px" }}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    close();
                  }}>
                  취소
                </Button>
              </span>
              <span>
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={SelelctEmplList}>
                  확인
                </Button>
              </span>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default DepartmentModal;
