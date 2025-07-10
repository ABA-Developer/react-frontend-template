import React from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableItemProps<T> = {
  id: string;
  data: T;
  renderItem: (item: T) => React.ReactNode;
};

function SortableItem<T>({ id, data, renderItem }: SortableItemProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`p-3 bg-white border rounded shadow mb-2 cursor-grab text-black dark:text-white ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {renderItem(data)}
    </li>
  );
}

type SortableListProps<T> = {
  items: T[];
  getId: (item: T) => string;
  onChange: (newItems: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
};

function SortableList<T>({ items, getId, onChange, renderItem }: SortableListProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => getId(i) === active.id);
    const newIndex = items.findIndex((i) => getId(i) === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    onChange(newItems);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(getId)} strategy={verticalListSortingStrategy}>
        <ul className="w-full mx-auto">
          {items.map((item) => (
            <SortableItem
              key={getId(item)}
              id={getId(item)}
              data={item}
              renderItem={renderItem}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default SortableList;
