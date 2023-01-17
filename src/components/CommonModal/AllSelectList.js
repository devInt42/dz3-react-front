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

  console.log("checkItem" + JSON.stringify(checkItem));
  return (
    <div>{checkItem && checkItem.map((list) => list.employeeName + ",")}</div>
  );
};
export default AllSelectList;
