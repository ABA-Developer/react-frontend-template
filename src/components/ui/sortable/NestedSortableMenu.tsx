import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { DraggableIcon } from '../../../icons';
// import { motion } from "framer-motion";

type MenuItem = {
  id: string;
  label: string;
  parentId?: string;
};

type Props = {
  items: MenuItem[];
  setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  onOrderChange?: (items: MenuItem[]) => void;
  draggingParentId: string | null;
  setDraggingParentId: (id: string | null) => void;
};

const SortableItem = ({
  item,
  order,
  draggingParentId,
  isChild,
}: {
  item: MenuItem;
  order: number;
  draggingParentId: string | null;
  isChild: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 0.2s ease', // fallback jika transition tidak ada
  };

  // const isChild = !!item.parentId;
  const isChildOfDragging =
    draggingParentId && item.parentId === draggingParentId;

  const shouldAnimate = isDragging || isChildOfDragging;

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex justify-between items-center py-2 px-4 mb-2 rounded border bg-white dark:bg-gray-900 hover:dark:bg-gray-700 dark:border-slate-600 cursor-grab transition-all duration-200 
      ${shouldAnimate ? 'opacity-50 scale-[0.98]' : ''} 
      ${isChild ? 'ml-6' : ''}
    `}
    >
      <span className='flex flex-row justify-between w-full items-center text-black dark:text-white'>
        <div className='flex flex-row items-center gap-1'>
          <DraggableIcon />
          {item.label}{' '}
        </div>
        <span className="text-sm text-gray-400">
          {isChild ? `Child Order: ${order}` : `Parent Order: ${order}`}
        </span>
      </span>
    </li>
  );
};

const NestedSortableMenu = ({
  items,
  setItems,
  onOrderChange,
  draggingParentId,
  setDraggingParentId,
}: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const parentIds = items.filter((i) => !i.parentId).map((i) => i.id);

  const handleDragStart = (event: DragStartEvent) => {
    const dragged = items.find((i) => i.id === event.active.id);
    if (dragged && !dragged.parentId) {
      setDraggingParentId(dragged.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggingParentId(null);

    if (!over || active.id === over.id) return;

    const activeItem = items.find((i) => i.id === active.id);
    const overItem = items.find((i) => i.id === over.id);
    if (!activeItem || !overItem) return;

    if (!activeItem.parentId && !overItem.parentId) {
      const parents = items.filter((i) => !i.parentId);
      const oldIndex = parents.findIndex((p) => p.id === active.id);
      const newIndex = parents.findIndex((p) => p.id === over.id);
      const newParents = arrayMove(parents, oldIndex, newIndex);

      const newList: MenuItem[] = [];
      newParents.forEach((p) => {
        newList.push(p);
        const children = items.filter((i) => i.parentId === p.id);
        newList.push(...children);
      });

      setItems(newList);
      onOrderChange?.(newList);
    } else if (
      activeItem.parentId &&
      overItem.parentId &&
      activeItem.parentId === overItem.parentId
    ) {
      const siblings = items.filter((i) => i.parentId === activeItem.parentId);
      const oldIndex = siblings.findIndex((i) => i.id === active.id);
      const newIndex = siblings.findIndex((i) => i.id === over.id);
      const newSiblings = arrayMove(siblings, oldIndex, newIndex);

      const newList: MenuItem[] = [];
      for (const i of items) {
        if (i.parentId === activeItem.parentId) continue;
        newList.push(i);
        if (i.id === activeItem.parentId) {
          newList.push(...newSiblings);
        }
      }
      setItems(newList);
      onOrderChange?.(newList);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={parentIds} strategy={verticalListSortingStrategy}>
        <ul className="w-full mx-auto mt-6">
          <SortableContext
            items={parentIds}
            strategy={verticalListSortingStrategy}
          >
            {items
              .filter((item) => !item.parentId)
              .map((parent) => {
                const children = items.filter((i) => i.parentId === parent.id);

                return (
                  <React.Fragment key={parent.id}>
                    <SortableItem
                      key={parent.id}
                      item={parent}
                      isChild={false}
                      order={parentIds.findIndex((p) => p === parent.id) + 1}
                      draggingParentId={draggingParentId}
                    />

                    {/* SortableContext hanya untuk children */}
                    {children.length > 0 && (
                      <SortableContext
                        items={children.map((c) => c.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {children.map((child) => {
                          const order = items
                            .filter((x) => x.parentId === child.parentId)
                            .findIndex((x) => x.id === child.id);
                          return (
                            <SortableItem
                              key={child.id}
                              item={child}
                              isChild={true}
                              order={order + 1}
                              draggingParentId={draggingParentId}
                            />
                          );
                        })}
                      </SortableContext>
                    )}
                  </React.Fragment>
                );
              })}
          </SortableContext>
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default NestedSortableMenu;
