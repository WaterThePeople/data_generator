import React, { useState, useEffect } from "react";
import style from "./Row.module.sass";
import FieldName from "components/FieldName/FieldName";
import FieldType from "components/FieldType/FieldType";
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
  onUpdate: (id: number, newName: string, type: string) => void;
  removeRow: (id: number) => void;
  types: any[];
}) {
  const [value, setValue] = useState(item?.name);
  const [type, setType] = useState(item?.type);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    onUpdate(item.id, value, type);
  }, [value, type, item.id, onUpdate]);

  const changeType = (x: string) => {
    setType(x);
    setVisible(false);
  };

  return (
    <div className={style.container}>
      <FieldName value={value} setValue={setValue} />
      <FieldType value={type} onClick={() => setVisible(true)} />
      <CloseButton onClick={() => removeRow(item?.id)} />
      <Modal setVisible={setVisible} visible={visible}>
        <div className={style.modal}>
          <div className={style.title}>Select Field Type</div>
          <div className={style.field_types}>
            {types.map((item, index) => (
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
