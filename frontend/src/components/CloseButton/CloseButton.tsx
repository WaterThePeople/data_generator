import React from "react";
import style from "./CloseButton.module.sass";

function CloseButton({ onClick }: { onClick: Function }) {
  return (
    <button className={style.container} onClick={() => onClick()}></button>
  );
}

export default CloseButton;
