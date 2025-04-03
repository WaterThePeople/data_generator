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
  removeRow,
  types,
}: {
  array: any[];
  setArray: React.Dispatch<React.SetStateAction<any[]>>;
  onUpdate: (id: number, newName: string, type: string) => void;
  removeRow: (id: number) => void;
  types: any[];
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
                removeRow={removeRow}
                types={types}
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
  removeRow,
  types,
}: {
  item: any;
  onUpdate: (id: number, newName: string, type: string) => void;
  index: number;
  removeRow: (id: number) => void;
  types: any[];
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.list_item}>
      <div
        className={styles.square}
        {...attributes}
        {...listeners}
        style={{ cursor: "grab" }}
      >
        {index}
      </div>
      <Row
        item={item}
        onUpdate={onUpdate}
        removeRow={removeRow}
        types={types}
      />
    </div>
  );
}

export default Rows;
