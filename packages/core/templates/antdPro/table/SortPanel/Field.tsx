import { HolderOutlined } from "@ant-design/icons";
import { Checkbox, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {FieldItem} from "../type";

export interface DragItemContext {
  key: string;
  originalIndex: number;
}

type Props = {
  data: FieldItem;
  changeEvent(data: CheckboxChangeEvent): void;
}

function Field({ data, changeEvent }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: data.key,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <div
    className="field-item"
    ref={setNodeRef} style={style} {...attributes}>
    <Checkbox
      checked={data.checked}
      onChange={changeEvent}>
      <Typography.Text
        className="field-name"
        ellipsis={{ tooltip: data.title }}>
        {data.title}
      </Typography.Text>
    </Checkbox>
    <HolderOutlined className="move-handle" ref={setActivatorNodeRef} {...listeners} />
  </div>
}

Field.displayName = 'Field';
export { Field }