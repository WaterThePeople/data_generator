import React, { useState, useCallback, useEffect } from "react";
import style from "./Home.module.sass";
import Rows from "views/Rows/Rows";
import DefaultButton from "components/DefaultButton/DefaultButton";
import DefaultInput from "components/DefaultInput/DefaultInput";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Modal from "components/Modal/Modal";
import FieldType from "components/FieldType/FieldType";

import axios from "axios";
import { serverPath } from "BackendServerPath";

const initialTypes = [{ id: ["start_value"] }, { name: [] }, { surname: [] }];

const dataFormats = ["json", "csv"];

const initialArray = [
  { id: 0, name: "ID", type: Object.keys(initialTypes[0])[0], start_value: 0 },
  { id: 1, name: "Name", type: Object.keys(initialTypes[1])[0] },
  { id: 2, name: "Surname", type: Object.keys(initialTypes[2])[0] },
];

function Home() {
  const [array, setArray] = useState<any[]>(initialArray);
  const [types, setTypes] = useState<any[]>(initialTypes);
  const [amount, setAmount] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [format, setFormat] = useState(dataFormats[0]);

  const getTypes = async () => {
    axios
      .get(`${serverPath}api/types/`, {})
      .then((response) => {
        // const types = response?.data?.available_types.map(
        //   (x: string) => Object.keys(x)[0]
        // );
        const types = response?.data?.available_types;
        setTypes(types || [initialTypes]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTypes();
  }, []);

  const updateItem = useCallback(
    (id: number, newName: string, newType: string, fields: any) => {
      setArray((prevArray) =>
        prevArray.map((item) =>
          item.id === id
            ? { id: id, name: newName, type: newType, ...fields }
            : item
        )
      );
    },
    []
  );

  const addRow = () => {
    setArray((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 0;
      return [
        ...prev,
        { id: newId, name: "New Field", type: Object.keys(types[0])[0] },
      ];
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
        start_value: item.start_value,
        min: item.min,
        max: item.max,
      })
    );

    return { amount: amount, types: temp };
  };

  const generateData = () => {
    setLoading(true);
    const payload = modifyArray(array);

    axios
      .post(`${serverPath}api/data/`, payload)
      .then((response) => {
        const data = response?.data;

        let fileContent: string;
        let mimeType: string;
        let fileExtension: string;

        if (format === "json") {
          fileContent = JSON.stringify(data, null, 2);
          mimeType = "application/json";
          fileExtension = "json";
        } else if (format === "csv") {
          const convertToCSV = (objArray: any[]) => {
            if (!Array.isArray(objArray) || objArray.length === 0) return "";

            const headers = Object.keys(objArray[0]);
            const csvRows = [
              headers.join(";"),
              ...objArray.map((row) =>
                headers
                  .map((field) => {
                    const value = row[field] ?? "";
                    return `"${String(value).replace(/"/g, '""')}"`;
                  })
                  .join(";")
              ),
            ];

            const csvString = csvRows.join("\r\n");

            return "\uFEFF" + csvString;
          };

          fileContent = convertToCSV(data);
          mimeType = "text/csv;charset=utf-8";
          fileExtension = "csv";
        } else {
          throw new Error("Unsupported format selected");
        }

        const blob = new Blob([fileContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `data.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeFormat = (x: string) => {
    setFormat(x);
    setVisible(false);
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
        <div className={style.title}>Data format:</div>
        <FieldType value={format} onClick={() => setVisible(true)} />
        <Modal setVisible={setVisible} visible={visible}>
          <div className={style.modal}>
            <div className={style.title_modal}>Select Format Type</div>
            <div className={style.formats}>
              {dataFormats.map((item, index) => (
                <DefaultButton
                  text={item}
                  key={index}
                  onClick={() => changeFormat(item)}
                  classname={style.format}
                />
              ))}
            </div>
          </div>
        </Modal>
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
