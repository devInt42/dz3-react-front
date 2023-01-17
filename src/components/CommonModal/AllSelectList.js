import { useCallback, useEffect, useState } from "react";

const AllSelectList = (props) => {
  const [checkItem, setCheckItem] = useState([]);
  let items = [];

  //modal에서 값 받아오기
  useEffect(() => {
    async function getEmplName() {
      //console.log(props.checkItem);
      const result = await JSON.parse(props.checkItem);
      //const result = await props.checkItem;
      // console.log("나오나요" + result);
      setCheckItem(result);
    }
    getEmplName();
  }, [props]);

  items.push(checkItem && checkItem.map((list) => list.employeeName));
  // console.log(items);
  // console.log(checkItem && checkItem.map((list) => list.employeeName));
  return (
    <div>
      {items}
      {/* {checkItem && checkItem.map((list) => list.employeeName + ",")} */}
    </div>
  );
};
export default AllSelectList;
