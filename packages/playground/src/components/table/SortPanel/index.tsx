import React, { useMemo } from 'react';
import './style.css';
import {FieldItem} from "../type";
import {Field} from "./Field";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {restrictToFirstScrollableAncestor, restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";

interface Props {
  fields: FieldItem[];
  changeEvent(fields: FieldItem[]): void;
}
function SortPanel({ fields, changeEvent }: Props) {
  const fixedLeft = fields.filter(item => item.fixed === 'left');
  const fixedRight = fields.filter(item => item.fixed === 'right');
  const list = useMemo(() => fields.filter(item => !item.fixed), [fields]);

  const handleCheckChange = ({ target }: CheckboxChangeEvent, index: number) => {
    // console.log('handleCheckChange', target)
    list[index].checked = target.checked;
    emit(list.slice());
  }

  function onDragEnd(event: DragEndEvent) {
    // console.log('handleDragEnd :>> ', event);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = list.findIndex(item => item.key === active.id);
      const newIndex = list.findIndex(item => item.key === over?.id);
      const newFields = arrayMove(list.slice(), oldIndex, newIndex);
      emit(newFields);
    }
  }

  function emit(sortableList: FieldItem[]) {
    const res = fixedLeft.concat(sortableList, fixedRight);
    // console.log('emit', res);
    changeEvent(res);
  }

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className='sort-panel'>
      <div className="list fixed top">
        {
          fixedLeft.map((item) => (
            <div key={item.key} className="field-item">{ item.title }</div>
          ))
        }
      </div>
      <DndContext
        modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={fields.map(item => item.key)}>
          <div className="list sort">
            {
              list.map((item, index) => (
                <Field
                  key={item.key}
                  data={item}
                  changeEvent={data => { handleCheckChange(data, index) }} />
              ))
            }
          </div>
        </SortableContext>
      </DndContext>

      <div className="list fixed bottom">
        {
          fixedRight.map((item) => (
            <div key={item.key} className="field-item">{ item.title }</div>
          ))
        }
      </div>

    </div>
  )
}

SortPanel.displayName = 'SortPanel';
export default SortPanel;
