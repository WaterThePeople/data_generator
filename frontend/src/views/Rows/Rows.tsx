import style from "./Rows.module.sass";
import Row from "./Row/Row";

function Rows({
  array,
  onUpdate,
}: {
  array: any[];
  onUpdate: (id: number, newName: string) => void;
}) {
  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.title}>Field Name</div>
        <div className={style.title}>Field Type</div>
      </div>
      {array.map((item) => (
        <Row key={item?.id} item={item} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default Rows;
