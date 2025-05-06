import React, { useState, useCallback, useEffect } from "react";
import style from "./Home.module.sass";
import Rows from "views/Rows/Rows";
import DefaultButton from "components/DefaultButton/DefaultButton";
import DefaultInput from "components/DefaultInput/DefaultInput";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

import axios from "axios";
import { serverPath } from "BackendServerPath";

const initialTypes = ["id", "name", "surname"];

const initialArray = [
  { id: 0, name: "ID", type: initialTypes[0] },
  { id: 1, name: "Name", type: initialTypes[1] },
  { id: 2, name: "Surname", type: initialTypes[2] },
];

function Home() {
  const [array, setArray] = useState<any[]>(initialArray);
  const [types, setTypes] = useState<any[]>(initialTypes);
  const [amount, setAmount] = useState<number>(5);
  const [loading, setLoading] = useState(false);

  const getTypes = async () => {
    axios
      .get(`${serverPath}api/types/`, {})
      .then((response) => {
        setTypes(response?.data?.available_types || [initialTypes]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTypes();
  }, []);

  const updateItem = useCallback(
    (id: number, newName: string, newType: string) => {
      setArray((prevArray) =>
        prevArray.map((item) =>
          item.id === id ? { ...item, name: newName, type: newType } : item
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

  const modifyArray = (array: any) => {
    const temp: any[] = [];
    array?.map((item: any) =>
      temp.push({
        name: item?.name ? item?.name : "empty",
        type: item?.type ? item?.type : "none",
      })
    );

    return { amount: amount, types: temp };
  };

  const generateData = async () => {
    setLoading(true);
    const payload = modifyArray(array);
    axios
      .post(`${serverPath}api/data/`, payload)
      .then((response) => {
        const data = response?.data;
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <DefaultInput
          value={amount}
          setValue={(val) => setAmount(Number(val))}
          isNumeric
        />
      </div>
      <div className={style.separator} />
      {!loading ? (
        <DefaultButton
          onClick={() => generateData()}
          text="GENERATE DATA"
          classname={style.generate_data_button}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Home;
