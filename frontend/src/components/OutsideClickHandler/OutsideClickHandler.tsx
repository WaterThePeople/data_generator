import React, { useEffect, useRef, ReactNode } from "react";

interface OutsideClickHandlerProps {
  children: ReactNode;
  onClickOutside?: () => void;
  classname?: string;
}

const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({
  children,
  onClickOutside,
  classname,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClickOutside?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className={classname} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default OutsideClickHandler;
