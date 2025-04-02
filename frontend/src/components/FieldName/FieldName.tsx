import React from "react";
import style from "./FieldName.module.sass";

function FieldName({
  value,
  setValue,
  maxLength = 250,
  readOnly = false,
  disabled = false,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
}

export default FieldName;
