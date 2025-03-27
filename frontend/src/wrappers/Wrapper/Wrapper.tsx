import React, { useState, useEffect } from "react";
import style from "./Wrapper.module.sass";
import { Link } from "react-router-dom";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Link className={style.logo} to={"/"}>
          <img
            src={process.env.PUBLIC_URL + "/logo_white.png"}
            alt="Logo"
            className={style.image}
          />
          <div className={style.text}>Data Generating Project</div>
        </Link>
      </div>
      {children}
    </div>
  );
}

export default Wrapper;
