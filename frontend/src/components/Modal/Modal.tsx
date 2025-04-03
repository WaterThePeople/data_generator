import React, { useEffect } from "react";
import style from "./Modal.module.sass";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";
import CloseButton from "components/CloseButton/CloseButton";

function Modal({
  children,
  visible,
  setVisible,
}: {
  children: React.ReactNode;
  visible: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (visible === true) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [visible]);

  return visible ? (
    <div className={style.modal}>
      {setVisible ? (
        <div className={style.container}>
          <OutsideClickHandler
            onClickOutside={() => setVisible(false)}
            classname={style.content}
          >
            <div className={style.close_button}>
              <CloseButton onClick={() => setVisible(false)} />
            </div>
            {children}
          </OutsideClickHandler>
        </div>
      ) : (
        <div className={style.container}>{children}</div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default Modal;
