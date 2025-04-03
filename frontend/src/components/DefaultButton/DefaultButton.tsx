import style from "./DefaultButton.module.sass";
import cn from "classnames";

function DefaultButton({
  onClick,
  text,
  classname,
  classnameText,
}: {
  onClick: Function;
  text: string;
  classname?: any;
  classnameText?: any;
}) {
  return (
    <button
      className={cn(style.container, classname)}
      onClick={() => onClick()}
    >
      <div className={cn(style.text, classnameText)}>{text}</div>
    </button>
  );
}

export default DefaultButton;
