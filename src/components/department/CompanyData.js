import axios from "axios";
import { useEffect, useState } from "react";
import WorkplaceData from "./WorkplaceData";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
const CompanyData = (props) => {
  const baseUrl = "http://localhost:8080";
  const [company, setCompany] = useState([]);
  const [companyIsOpen, setCompanyIsOpen] = useState([]);
  const [focus, setFocus] = useState("");
  useEffect(() => {
    if (props.companySeq != undefined) {
      axios
        .get(`${baseUrl}/department/list/company`, {
          headers: { Authorization: window.sessionStorage.getItem("empInfo") },
        })
        .then((res) => setCompany(res.data[0]))
        .catch((error) => console.log(error));
        
    }
  }, []);

  useEffect(() => {
    if (props.companySeq != "" && props.companySeq != undefined) {
      axios
        .get(`${baseUrl}/department/list/company/${props.companySeq}`)
        .then((res) => setCompany(res.data[0]))
        .catch((error) => console.log(error));
    }
  }, [props.companySeq]);

  const [toggleIcon, setToggleIcon] = useState([]);

  useEffect(() => {
    setToggleIcon(companyIsOpen);
  }, [companyIsOpen]);

  return (
    <div>
      {company &&
            <div key={company.companySeq}>
              <div
                className={`${
                  company.companySeq === focus
                    ? "active-item"
                    : "company-item"
                }`}
                onClick={() => {
                  companyIsOpen.includes(company.companySeq)
                    ? setCompanyIsOpen(
                        companyIsOpen.filter(
                          (company) => company !== company.companySeq
                        )
                      )
                    : setCompanyIsOpen([
                        ...companyIsOpen,
                        company.companySeq,
                      ]);
                  props.setSearch(false);
                  props.setDetailFlag(false);
                  props.setDepartmentSeq(0);
                  props.setWorkplaceSeq(0);
                  setFocus(company.companySeq);
                }}
              >
                <HiOutlineBuildingOffice2 className="companylist-icon" />
                {company.companyCode}.{company.companyName}
                {toggleIcon.includes(company.companySeq) ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronUp />
                )}
              </div>
              {companyIsOpen.includes(company.companySeq) && (
                <WorkplaceData
                  companySeq={company.companySeq}
                  key={company.companySeq}
                  setDepartmentSeq={props.setDepartmentSeq}
                  setWorkplaceSeq={props.setWorkplaceSeq}
                  setCompanySeq={props.setCompanySeq}
                  refresh={props.refresh}
                  setSearch={props.setSearch}
                  setDetailFlag={props.setDetailFlag}
                  setFocus={setFocus}
                />
              )}
            </div>
}
        
    </div>
  );
};

export default CompanyData;
