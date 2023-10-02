import React, {Key, useRef} from 'react';
import {Checkbox, Dropdown, Table, Typography} from 'antd';
import {CustomColumnType, DataType, FieldItem} from '../type';
import MOCK_DATA from '../mock';
import {useMount, useSelections} from "ahooks";
import {ColWidthRange, getColumns, initFieldConfig, useTableConfig} from "../useTableField";
import ResizeBox from "../../ResizeBox";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd, handleDragMove, handleDragStart} from "../thResize";
import {
  handleDragStart as sortStart,
  handleDragEnter as sortEnter,
  handleDragOver as sortOver,
  handleDragLeave as sortLeave,
  handleDragEnd as sortEnd,
  handleDrop as sortDrop, handleDragOver
} from "../thSort";
import './style.css';
import {arrayMove} from "@dnd-kit/sortable";
import {cloneDeep} from "lodash-es";
import {SettingOutlined} from "@ant-design/icons";
import SortPanel from "../SortPanel";

const TableConfigStorageKey = 'table-config';

const baseColumns: CustomColumnType<DataType>[] = [
  {
    title: '用户ID',
    width: 120,
    dataIndex: 'userId',
    key: 'userId',
    fixed: 'left',
  },
  {
    title: '文章标题',
    width: 100,
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
    ellipsis: true,
    // maxWidth: 300
  },
  {
    title: '文章内容',
    dataIndex: 'body',
    key: 'body',
    ellipsis: true,
    width: 180,
  },
  {
    title: 'Column 3',
    dataIndex: 'body',
    key: '3',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Column 4',
    dataIndex: 'body',
    key: '4',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Column 41',
    dataIndex: 'body',
    key: '41',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Column 5',
    dataIndex: 'body',
    key: '5',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Column 6',
    dataIndex: 'body',
    key: '6',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Column 7',
    dataIndex: 'body',
    key: '7',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Column 8',
    dataIndex: 'body',
    key: '8',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Column 9',
    dataIndex: 'body',
    key: '9',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const data: DataType[] = MOCK_DATA;

function ConfigurableTable() {
  const {
    columns, setColumns,
    fieldConfig, setFieldConfig
  } = useTableConfig<DataType>();

  useMount(() => {
    init();
  });

  function init() {
    let config: FieldItem[] = [];
    let needSave = true;
    try {
      const storageConfig = JSON.parse(sessionStorage.getItem(TableConfigStorageKey) || '[]');
      if (storageConfig.length) {
        needSave = false;
        config = storageConfig;
        // config = initFieldConfig(baseColumns);
      } else {
        config = initFieldConfig(baseColumns);
      }
    } catch (error) {
      config = initFieldConfig(baseColumns);
    }
    setFieldConfig(config);
    const cols = getColumns(config, baseColumns);
    // console.log('cols', cols);
    setColumns(cols);
    if (needSave) {
      saveFieldConfig(config);
    }
  }

  const { selected, setSelected, allSelected, toggleAll } = useSelections(
    data.map(item => item.id),
    [],
  );

  function selectChange(keys: Key[]) {
    setSelected(keys as number[]);
  }

  const tableRef = useRef<HTMLDivElement>(null);
  function customCell(event: any) {
    const { children, className, scope, style, title } = event;
    const usedTitle = title || (typeof children[1] === 'string' ? children[1] : '');
    const index = columns.findIndex(item => item.title === usedTitle);
    const range = [columns[index]?.minWidth || ColWidthRange[0], columns[index]?.maxWidth || ColWidthRange[1]];
    const id = `${usedTitle}_${index}`;

    const draggable = usedTitle && !columns[index].fixed;
    // console.log('draggable', usedTitle, draggable);
    return <ResizeBox
        key={id}
        tag="th"
        className={className}
        scope={scope}
        style={style}
        id={id}
        data={{ range }}
        disabled={!usedTitle}
        dragStartEvent={() => handleDragStart(tableRef.current)}
        dragMoveEvent={handleDragMove}
        dragEndEvent={dragEnd}
        draggable={draggable}
        data-title={usedTitle}
        onDragStart={sortStart}
        onDragEnter={sortEnter}
        onDragOver={sortOver}
        onDragLeave={sortLeave}
        onDragEnd={sortEnd}
        onDrop={onDrop}>
      {
        className.includes('ant-table-selection-column') ? <Checkbox checked={allSelected} onChange={toggleAll} /> : usedTitle
      }
    </ResizeBox>;
  }
  function dragEnd(event: DragEndEvent) {
    handleDragEnd(event,({ index, width }) => {
      fieldConfig[index].width = width;
      setFieldConfig(fieldConfig);
      saveFieldConfig(fieldConfig);
    });
  }

  function onDrop(event: DragEvent) {
    sortDrop(event,({ fromTitle, toTitle }) => {
      // console.log('onDrop', fromTitle, toTitle);
      if (fromTitle !== toTitle) {
        const oldIndex = fieldConfig.findIndex(item => item.title === fromTitle);
        const newIndex = fieldConfig.findIndex(item => item.title === toTitle);
        const newConfig = arrayMove(fieldConfig.slice(), oldIndex, newIndex);
        fieldConfigChange(newConfig);
      }
    });
  }

  function saveFieldConfig(config: FieldItem[]) {
    // console.log('saveFieldConfig', config);
    sessionStorage.setItem(TableConfigStorageKey, JSON.stringify(config));
  }

  const fieldConfigChange = (fields: FieldItem[]) => {
    setFieldConfig(fields);
    const cols = getColumns(fields, baseColumns);
    setColumns(cols);
    saveFieldConfig(fields);
  }

  return (
    <div className='config-table'>
      <div className="setting">
        <Dropdown
          overlay={<SortPanel fields={fieldConfig} changeEvent={fieldConfigChange} />}
          trigger={['click']}>
          <Typography.Link className="config-pannel">
            <SettingOutlined /> 表格配置
          </Typography.Link>
        </Dropdown>
      </div>
      <Table
        ref={tableRef}
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 300 }}
        pagination={false}
        rowSelection={{ selectedRowKeys: selected, onChange: selectChange }}
        components={{
          header: {
            cell: customCell
          }
        }}
      />
    </div>
  )
}

ConfigurableTable.displayName = 'ConfigurableTable';
export default ConfigurableTable;
