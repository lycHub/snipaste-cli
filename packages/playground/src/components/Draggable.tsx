import React, {CSSProperties, useMemo, PropsWithChildren} from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities";
import {Data} from "@dnd-kit/core/dist/store/types";
import {useUpdateEffect} from "ahooks";

interface Props {
  id: string | number;
  data: Data;
  disabled?: boolean;
  draggingChangeEvent?(event: boolean): void;
  [key: string]: any;
}

function Draggable({ id, data, disabled, draggingChangeEvent, children, ...rest }: PropsWithChildren<Props>) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({ id, data, disabled });

  const style = useMemo<CSSProperties>(() => {
    return {
      // left: `${coordinate.x}px`,
      // top: `${coordinate.y}px`,
      transform: CSS.Translate.toString(transform)
    }
  }, [transform]);

   useUpdateEffect(() => {
     draggingChangeEvent?.(isDragging);
  }, [isDragging]);

  return <div
    ref={setNodeRef}
    style={style}
    {...rest}
    {...listeners}
    {...attributes}>
    {children}
  </div>
}

Draggable.displayName = 'Draggable';
export default Draggable;