"use client"
import {MultipleContainers} from "@/components/dnd/MultipleContainers";
import {DndContext, useDraggable, useDroppable} from "@dnd-kit/core";
import {useId } from "react";

function Droppable(props: { children: JSX.Element }) {
    const {isOver, setNodeRef} = useDroppable({
      id: 'droppable',
    });
    const style = {
      color: isOver ? 'green' : undefined,
    };
    
    
    return (
      <div ref={setNodeRef} style={style}>
        {props.children}
      </div>
    );
  }
  function Draggable(props: { children: JSX.Element }) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: 'draggable',
    });
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
  
    
    return (
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.children}
      </button>
    );
  }
export default function Page() {
    return (
        <DndContext id={useId()}>
            <MultipleContainers/>
        </DndContext>
    );
}