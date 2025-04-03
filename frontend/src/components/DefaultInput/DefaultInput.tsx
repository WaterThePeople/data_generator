import React from "react";
import style from "./DefaultInput.module.sass";
import cn from "classnames";

function DefaultInput({
  value,
  setValue,
  maxLength = 250,
  readOnly = false,
  disabled = false,
  isNumeric = false,
}: {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  isNumeric?: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (isNumeric && !/^\d*$/.test(newValue)) {
      return;
    }

    setValue(newValue);
  };

  return (
    <div className={cn(style.container, isNumeric && style.is_numeric)}>
      <input
        className={style.input}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={isNumeric ? "0" : ""}
        type={isNumeric ? "text" : "text"}
      />
    </div>
  );
}

export default DefaultInput;
