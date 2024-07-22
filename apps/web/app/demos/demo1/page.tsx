"use client";
import { useEffect, useRef } from "react";
import { DndProvider, useDrag, useDragLayer, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Box(props: any) {
  return (
    <div
      ref={props?.bref}
      className={` w-20 h-20  border border-dashed border-gray-300 ${props?.className}`}
    >
      {props?.children}
    </div>
  );
}

function DraggableComponent({ type }: { type: string }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type,
    item: {
      foo: 1,
    },
    collect: (m) => ({
      isDragging: m.isDragging(),
    }),
  }));

  // useEffect(() => {
  //   dragPreview(<Box></Box>), { captureDraggingState: true };
  // }, []);

  useEffect(() => {
    dragPreview(
      <div>
        <Box className={"bg-green-300"}>你好呀</Box>
      </div>,
      { captureDraggingState: true }
    );
  }, []);

  if (isDragging) {
    return null;
  }

  return (
    <>
      <Box bref={drag}>你好呀</Box>
    </>
  );
}

function MyDropTarget() {
  const [{ isOver, type }, drop] = useDrop(() => ({
    accept: ["foo"],
    drop: (item, monitor) => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      type: monitor.getItemType(),
    }),
  }));

  return (
    <div className=" w-40 h-32 bg-gray-600" ref={drop}>
      {isOver ? "is over" : "drop target"}
    </div>
  );
}

export default function Page() {
  const ref = useRef<any>();

  console.log(ref.current);

  return (
    <DndProvider backend={HTML5Backend}>
      <DraggableComponent type="foo" />
      <DraggableComponent type="bar" />

      <MyDropTarget />

      {/* <CustomDragLayer /> */}
    </DndProvider>
  );
}
