import React, { useState, useEffect } from "react";
import style from "./Row.module.sass";
import FieldName from "components/FieldName/FieldName";
import FieldType from "components/FieldType/FieldType";

function Row({
  item,
  onUpdate,
}: {
  item: any;
  onUpdate: (id: number, newName: string) => void;
}) {
  const [value, setValue] = useState(item?.name);

  useEffect(() => {
    onUpdate(item.id, value);
  }, [value, item.id, onUpdate]);

  return (
    <div className={style.container}>
      <FieldName value={value} setValue={setValue} />
      <FieldType value={value} setValue={setValue} />
    </div>
  );
}

export default Row;
