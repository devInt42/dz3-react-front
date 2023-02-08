import { TrySharp } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";

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

  const checklength = useCallback(async () => {
    // console.log(uniqueObjArr.length);
    props.sendCheckLength(uniqueObjArr.length);
  }, [checkItem]);

  useEffect(() => {
    checklength();
  }, [checkItem]);

  return (
    <div className="AllSelectSpace">
      {uniqueObjArr && uniqueObjArr.map((list) => list.employeeName + "ㅤ")}
    </div>
  );
};
export default AllSelectList;
