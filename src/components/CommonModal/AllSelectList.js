import { useEffect, useState } from "react";

const AllSelectList = (props) => {
  const [checkItem, setCheckItem] = useState([]);

  //modal에서 값 받아오기
  useEffect(() => {
    async function getEmplName() {
      const result = await JSON.parse(props.checkItem);
      setCheckItem(result);
    }
    getEmplName();
  }, [props]);

  //set 집합으로 중복값 제거
  const uniqueObjArr = [...new Set(checkItem.map(JSON.stringify))].map(
    JSON.parse
  );

  //해당 직원이름 출력
  return (
    <div className="AllSelectSpace">
      {uniqueObjArr && uniqueObjArr.map((list) => list.employeeName + ",")}
    </div>
  );
};
export default AllSelectList;
