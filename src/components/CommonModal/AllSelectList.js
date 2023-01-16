import { useCallback, useEffect, useState } from "react";

const AllSelectList = (props) => {
  const [checkItem, setCheckItem] = useState([]);
  let items = [];

  //modal에서 값 받아오기
  useEffect(() => {
    async function getEmplName() {
      const result = await props.checkItem;
      setCheckItem(result);
    }
    getEmplName();
  }, [props]);

  const pushList = useCallback(async () => {
    try {
      items.push(checkItem);
    } catch (error) {
      console.log(error);
    }
  }, [checkItem]);

  useEffect(() => {
    pushList();
  }, [checkItem]);

  return <div>{checkItem}</div>;
};
export default AllSelectList;
