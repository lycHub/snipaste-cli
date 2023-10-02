import React, {Key, useRef} from 'react';
import {Checkbox, Table} from 'antd';
import {CustomColumnType, DataType, FieldItem} from './type';
import MOCK_DATA from './mock';
import {useMount, useSafeState, useSelections} from "ahooks";
import {ColWidthRange, getColumns, initFieldConfig, useTableConfig} from "./useTableField";
import ResizeBox from "../ResizeBox";
import {DragEndEvent, DragMoveEvent} from "@dnd-kit/core";
import {cloneDeep} from "lodash-es";
import {handleDragEnd, handleDragMove, handleDragStart} from "./thResize";

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
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
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
    try {
      const storageConfig = JSON.parse(sessionStorage.getItem(TableConfigStorageKey) || '[]');
      if (storageConfig.length) {
        // console.log('storageConfig', storageConfig);
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
    // console.log('className', className);

    return <ResizeBox
        tag="th"
        className={className}
        scope={scope}
        style={style}
        id={id}
        data={{ range }}
        disabled={!usedTitle}
        dragStartEvent={() => handleDragStart(tableRef.current)}
        dragMoveEvent={handleDragMove}
        dragEndEvent={dragEnd}>
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

  function saveFieldConfig(config: FieldItem[]) {
    console.log('saveFieldConfig', config);
    sessionStorage.setItem(TableConfigStorageKey, JSON.stringify(config));
  }

  return (
    <div className='config-table'>
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
