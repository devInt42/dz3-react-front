import { Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import "../modals/SearchModal.css";
import CompanyList from "./CompanyList";

const DepartmentModal = (props) => {
  const { open, close, header, getInfoCaLLback } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();
  const [companyName, setCompanyName] = useState();
  const [text, setText] = useState();
  const [pointList, setPointList] = useState([]);
  const [selectEmp, setSelectEmp] = useState(null);
  const [checkItem, setCheckItem] = useState([]);

  function SelelctEmplList() {
    getInfoCaLLback(pointList);
  }

  // emplist에서 선택한 사원의 모든 정보 받아오기
  const sendPointEmpList = (i) => {
    setSelectEmp(i);
  };

  useEffect(() => {}, [selectEmp]);

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
    <div className={open ? "openModal modal" : "modal"}>
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
            <div>
              <div>
                <Row>
                  <Col className="">
                    <CompanyList
                      sendPointList={sendPointList}
                      sendCompanyName={sendCompanyName}
                    />
                  </Col>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={SelelctEmplList}>
                    확인
                  </button>
                </Row>
              </div>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default DepartmentModal;
