import React, {CSSProperties, useMemo, PropsWithChildren} from 'react';
import { useDraggable } from '@dnd-kit/core';
import {Coordinates, Transform} from "@dnd-kit/utilities";
import {Data} from "@dnd-kit/core/dist/store/types";
import {useUpdateEffect} from "ahooks";

interface Props {
  id: string | number;
  data: Data;
  disabled?: boolean;
  style?: CSSProperties;
  draggingEvent?(event: boolean, transform: Transform | null): void;
  [key: string]: any;
}

function Draggable({ id, data, disabled, style, draggingEvent, children, ...rest }: PropsWithChildren<Props>) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({ id, data, disabled });

  /*const style = useMemo<CSSProperties>(() => {
    // console.log('CSS.Translate.toString(transform)', CSS.Translate.toString(transform));
    return {
      left: `${coordinates?.x}px`,
      top: `${coordinates?.y}px`,
      // transform: CSS.Translate.toString(transform)
      transform: `translate(${transform?.x}px, ${transform?.y}px)`,
    }
  }, [transform, coordinates]);*/

   useUpdateEffect(() => {
     draggingEvent?.(isDragging, transform);
  }, [isDragging, transform]);

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