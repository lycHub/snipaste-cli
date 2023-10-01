import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {CustomColumnType, DataType, FieldItem} from './type';
import MOCK_DATA from './mock';
import {useMount, useSafeState} from "ahooks";
import {getColumns, initFieldConfig, useTableConfig} from "./useTableField";

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
    const config = initFieldConfig(baseColumns);
    setFieldConfig(config);
    const cols = getColumns(config, baseColumns);
    setColumns(cols);
  }

  return (
    <div className='config-table'>
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: 300 }}
        pagination={false}
      />
    </div>
  )
}

ConfigurableTable.displayName = 'ConfigurableTable';
export default ConfigurableTable;
