import React, { useState, useCallback } from "react";
import style from "./Home.module.sass";
import Rows from "views/Rows/Rows";

type Item = {
  id: number;
  name: string;
  type: string;
};

const initialArray: Item[] = [
  { id: 0, name: "test0", type: "test0-type" },
  { id: 1, name: "test1", type: "test1-type" },
  { id: 2, name: "test2", type: "test2-type" },
  { id: 3, name: "test3", type: "test3-type" },
  { id: 4, name: "test4", type: "test4-type" },
];

function Home() {
  const [array, setArray] = useState<Item[]>(initialArray);

  const updateItem = useCallback((id: number, newName: string) => {
    setArray((prevArray) =>
      prevArray.map((item) =>
        item.id === id
          ? { ...item, name: newName, type: `${newName}-type` }
          : item
      )
    );
  }, []);

  return (
    <div className={style.container}>
      <Rows array={array} onUpdate={updateItem} />
    </div>
  );
}

export default Home;
