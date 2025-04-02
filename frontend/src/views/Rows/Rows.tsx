import styles from "./Rows.module.sass";
import Row from "./Row/Row";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Rows({
  array,
  setArray,
  onUpdate,
}: {
  array: any[];
  setArray: React.Dispatch<React.SetStateAction<any[]>>;
  onUpdate: (id: number, newName: string) => void;
}) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = array.findIndex((item) => item.id === active.id);
      const newIndex = array.findIndex((item) => item.id === over.id);
      setArray(arrayMove(array, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={array} strategy={verticalListSortingStrategy}>
        <div className={styles.container}>
          <div className={styles.title_container}>
            <div className={styles.square_empty}></div>
            <div className={styles.title}>Field Name</div>
            <div className={styles.title}>Field Type</div>
          </div>
          <div className={styles.list}>
            {array.map((item, index) => (
              <SortableRow
                key={item.id}
                item={item}
                onUpdate={onUpdate}
                index={index}
              />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  item,
  onUpdate,
  index,
}: {
  item: any;
  onUpdate: (id: number, newName: string) => void;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.list_item}
    >
      <div className={styles.square}>{index}</div>
      <Row item={item} onUpdate={onUpdate} />
    </div>
  );
}

export default Rows;
