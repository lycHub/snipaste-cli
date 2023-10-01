import './style.css';
import React, {createElement, CSSProperties, Key, PropsWithChildren} from "react";
import {restrictToHorizontalAxis} from "@dnd-kit/modifiers";
import {DndContext, DragMoveEvent, useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import {useSafeState, useUpdateEffect} from "ahooks";

interface DragData {
    range: number[];
}
interface Props {
    tag?: string;
    className?: string;
    id: string | number;
    data: DragData;
    disabled: boolean;
    [key: string]: any;
}
function ResizeBox(props: PropsWithChildren<Props>) {
    const { tag, className, id, data, disabled, children, ...rest } = Object.assign({
        tag: 'div'
    }, props);

    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform} = useDraggable({
        id,
        data
    });

    const [style, setStyle] = useSafeState<CSSProperties>({});

    useUpdateEffect(() => {
        console.log('wat transform', transform, CSS.Translate.toString(transform));
        if (transform) {
            setStyle({
                transform: CSS.Translate.toString(transform)
            });
        }
    },[transform])

    function dragStart() {

    }
    function dragMove({ active, delta }: DragMoveEvent) {
        console.log('dragMove', delta.x);
    }
    function dragEnd() {

    }
    return createElement(
      tag,
      {
          className: `resize-box ${className} ${disabled ? 'disabled' : ''}`,
          ...rest
      },
      children,
      <DndContext
        modifiers={[restrictToHorizontalAxis]}
        onDragStart={dragStart}
        onDragMove={dragMove}
        onDragEnd={dragEnd}>
          <div
            className="handler"
            hidden={disabled}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
          />
      </DndContext>
    )
}

ResizeBox.displayName = 'ResizeBox';
export default ResizeBox;