import { useCallback, useEffect, useState } from "react";

const AllSelectList = (props) => {
  const [checkItem, setCheckItem] = useState([]);
  const [checkSeq, setCheckSeq] = useState();

  //modal에서 값 받아오기
  useEffect(() => {
    async function getEmplName() {
      const result = await JSON.parse(props.checkItem);
      setCheckItem(result);
    }
    getEmplName();
  }, [props]);

  const checklength = useCallback(async () => {
    props.sendCheckLength(checkItem.length);
  }, [checkItem]);

  useEffect(() => {
    checklength();
  }, [checkItem]);

  const test = (e) => {
    setCheckSeq(e);
  };

  useEffect(() => {
    props.sendDeleteELement(checkSeq);
  }, [checkSeq]);

  return (
    <div className="AllSelectSpace">
      {checkItem &&
        checkItem.map((list) => (
          <button
            onClick={() => {
              test(list.employeeSeq);
            }}
            style={{ backgroundColor: "white" }}>
            {list.employeeName}
          </button>
        ))}
    </div>
  );
};
export default AllSelectList;
