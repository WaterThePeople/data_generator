import React from "react";
import style from "./FieldType.module.sass";

function FieldType({ value, onClick }: { value: string; onClick: Function }) {
  return (
    <button className={style.container} onClick={() => onClick()}>
      <div className={style.text}>{value}</div>
    </button>
  );
}

export default FieldType;
