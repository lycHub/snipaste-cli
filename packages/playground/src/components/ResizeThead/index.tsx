import './style.css';
import React, {CSSProperties, Key, PropsWithChildren} from "react";
import {restrictToHorizontalAxis} from "@dnd-kit/modifiers";
import {DndContext, DragMoveEvent, useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import {useSafeState, useUpdateEffect} from "ahooks";

interface DragData {
    range: number[];
}
interface Props {
    id: string | number;
    data: DragData;
    disabled: boolean;
    [key: string]: any;
}
function ResizeThead({ id, data, disabled, children, ...rest }: PropsWithChildren<Props>) {
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
    return <th {...rest}>
        {children}
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
    </th>
}

ResizeThead.displayName = 'ResizeBox';
export default ResizeThead;