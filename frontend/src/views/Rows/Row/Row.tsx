import React, { useState, useEffect } from "react";
import style from "./Row.module.sass";
import FieldName from "components/FieldName/FieldName";
import FieldType from "components/FieldType/FieldType";
import AdditionalField from "components/AdditionalField/AdditionalField";
import CloseButton from "components/CloseButton/CloseButton";
import Modal from "components/Modal/Modal";
import DefaultButton from "components/DefaultButton/DefaultButton";

function Row({
  item,
  onUpdate,
  removeRow,
  types,
}: {
  item: any;
  onUpdate: (id: number, newName: string, type: string, fields: any) => void;
  removeRow: (id: number) => void;
  types: any[];
}) {
  const [value, setValue] = useState(item?.name);
  const [type, setType] = useState(item?.type);
  const [visible, setVisible] = useState(false);
  const [fields, setFields] = useState<any[]>([]);
  const [fieldsValues, setFieldsValues] = useState<any[]>([]);

  useEffect(() => {
    const result = types.find((x: any) =>
      Object.keys(x)[0] === type ? x : undefined
    )[type];
    setFields(result);
    setFieldsValues(result.map((x: any) => "0"));
  }, [types, type]);

  useEffect(() => {
    onUpdate(
      item.id,
      value,
      type,
      Object.fromEntries(
        fields.map((key, i) => [key, parseFloat(fieldsValues[i])])
      )
    );
  }, [value, item.id, onUpdate, fields, fieldsValues, type]);

  const changeType = (x: string) => {
    setType(x);
    setVisible(false);
  };

  const changeFieldValue = (value: string, index: number) => {
    const updatedValues = [...fieldsValues];
    updatedValues[index] = value;
    setFieldsValues(updatedValues);
  };

  return (
    <div className={style.container}>
      <FieldName value={value} setValue={setValue} />
      <FieldType value={type} onClick={() => setVisible(true)} />
      {fields.map((item, index) => (
        <AdditionalField
          value={fieldsValues[index]}
          changeValue={changeFieldValue}
          index={index}
          key={index}
          label={item}
        />
      ))}
      <CloseButton onClick={() => removeRow(item?.id)} />
      <Modal setVisible={setVisible} visible={visible}>
        <div className={style.modal}>
          <div className={style.title}>Select Field Type</div>
          <div className={style.field_types}>
            {types
              .map((x: string) => Object.keys(x)[0])
              .map((item, index) => (
                <DefaultButton
                  text={item}
                  key={index}
                  onClick={() => changeType(item)}
                  classname={style.type}
                />
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Row;
