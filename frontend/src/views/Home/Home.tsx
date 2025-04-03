import React, { useState, useCallback } from "react";
import style from "./Home.module.sass";
import Rows from "views/Rows/Rows";
import DefaultButton from "components/DefaultButton/DefaultButton";
import DefaultInput from "components/DefaultInput/DefaultInput";

const types = ["integer", "text", "date", "time", "month", "weekday"];

const initialArray = [
  { id: 0, name: "ID", type: "integer" },
  { id: 1, name: "Name", type: "text" },
  { id: 2, name: "Surname", type: "text" },
  { id: 3, name: "Date", type: "date" },
  { id: 4, name: "Time", type: "time" },
  { id: 5, name: "Month", type: "month" },
  { id: 6, name: "Weekday", type: "weekday" },
];

function Home() {
  const [array, setArray] = useState<any[]>(initialArray);
  const [amount, setAmount] = useState<string | number>(100);

  const updateItem = useCallback(
    (id: number, newName: string, type: string) => {
      setArray((prevArray) =>
        prevArray.map((item) =>
          item.id === id ? { ...item, name: newName } : item
        )
      );
    },
    []
  );

  const addRow = () => {
    setArray((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 0;
      return [...prev, { id: newId, name: "New Field", type: types[0] }];
    });
  };

  const removeRow = (id: number) => {
    setArray((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={style.container}>
      <Rows
        array={array}
        setArray={setArray}
        onUpdate={updateItem}
        removeRow={removeRow}
        types={types}
      />
      <DefaultButton onClick={addRow} text="+ Add Another Field" />
      <div className={style.separator} />
      <div className={style.rows_amount}>
        <div className={style.title}>#Rows:</div>
        <DefaultInput value={amount} setValue={setAmount} isNumeric />
      </div>
      <div className={style.separator} />
      <DefaultButton
        onClick={() => console.log()}
        text="GENERATE DATA"
        classname={style.generate_data_button}
      />
    </div>
  );
}

export default Home;
