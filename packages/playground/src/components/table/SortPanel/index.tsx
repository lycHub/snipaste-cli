import React, {Key, useMemo, useRef} from 'react';
import './style.css';
import {Checkbox, List, Typography} from "antd";
import {HolderOutlined} from "@ant-design/icons";
import {FieldItem} from "../type";
import {Field} from "./Field";
import {CheckboxChangeEvent} from "antd/es/checkbox";

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

  function emit(sortableList: FieldItem[]) {
    const res = fixedLeft.concat(sortableList, fixedRight);
    console.log('emit', res);
    changeEvent(res);
  }

  return (
    <div className='sort-panel'>
      <div className="list fixed top">
        {
          fixedLeft.map((item) => (
            <div key={item.key} className="field-item">{ item.title }</div>
          ))
        }
      </div>
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
