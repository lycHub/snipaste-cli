import './style.css';
import React, {createElement, PropsWithChildren} from "react";
import {restrictToHorizontalAxis} from "@dnd-kit/modifiers";
import {DndContext, DragEndEvent, DragMoveEvent, DragStartEvent} from "@dnd-kit/core";
import Draggable from "../Draggable";

interface DragData {
    range: number[];
}
interface Props {
    tag?: string;
    className?: string;
    id: string | number;
    data: DragData;
    disabled: boolean;
    dragStartEvent(event: DragStartEvent): void;
    dragMoveEvent(event: DragMoveEvent): void;
    dragEndEvent(event: DragEndEvent): void;
    [key: string]: any;
}
function ResizeBox(props: PropsWithChildren<Props>) {
    const {
        tag,
        className,
        id,
        data,
        disabled,
        children,
        dragStartEvent,
        dragMoveEvent,
        dragEndEvent,
        ...rest
    } = Object.assign({ tag: 'div' }, props);

    return createElement(
      tag,
      {
          className: `resize-box ${className} ${disabled ? 'disabled' : ''}`,
          ...rest
      },
      children,
      <DndContext
        modifiers={[restrictToHorizontalAxis]}
        onDragStart={dragStartEvent}
        onDragMove={dragMoveEvent}
        onDragEnd={dragEndEvent}>
          <Draggable id={id} data={data} disabled={disabled}>
              <div className="handler" />
          </Draggable>
      </DndContext>
    )
}

ResizeBox.displayName = 'ResizeBox';
export default ResizeBox;