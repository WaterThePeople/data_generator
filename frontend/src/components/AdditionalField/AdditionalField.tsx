import React from "react";
import style from "./AdditionalField.module.sass";

function AdditionalField({
  value,
  changeValue,
  label,
  maxLength = 250,
  readOnly = false,
  disabled = false,
  dataType = "number",
  index = 0,
}: {
  value: string;
  changeValue: (value: string, index: number) => void;
  label?: string;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  dataType?: string;
  index: number;
}) {
  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={value}
        onChange={(e) => changeValue(e.target.value, index)}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
        type={dataType}
        min="0"
        step="1"
      />
      <div className={style.label}>{label}</div>
    </div>
  );
}

export default AdditionalField;
