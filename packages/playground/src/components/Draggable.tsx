import React, {CSSProperties, useMemo, PropsWithChildren} from 'react';
import { useDraggable } from '@dnd-kit/core';
import {Coordinates, CSS} from "@dnd-kit/utilities";
import {Data} from "@dnd-kit/core/dist/store/types";
import {useUpdateEffect} from "ahooks";

interface Props {
  id: string | number;
  data: Data;
  disabled?: boolean;
  coordinates?: Coordinates;
  draggingChangeEvent?(event: boolean): void;
  [key: string]: any;
}

function Draggable({ id, data, disabled, coordinates, draggingChangeEvent, children, ...rest }: PropsWithChildren<Props>) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({ id, data, disabled });

  const style = useMemo<CSSProperties>(() => {
    return {
      left: `${coordinates?.x}px`,
      top: `${coordinates?.y}px`,
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