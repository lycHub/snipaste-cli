import { AutoComplete, Input, InputNumber, Mentions, Select, Space, TimePicker, TreeSelect } from 'antd';
import React, { useState } from 'react';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

function AntdStyles() {

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];



  return <Space direction='vertical' style={{ width: 'inherit' }}>
    <Input className='zs-input' bordered={false} placeholder='请输入' />
    <Input.TextArea className='zs-input' bordered={false} rows={4} placeholder="请输入" maxLength={6} />
    <InputNumber className='zs-input' bordered={false} style={{ width: '100%' }} min={1} max={10} defaultValue={3} placeholder='请输入' />
    <Select
      className='zs-select'
      bordered={false}
      style={{ width: '100%' }}
      showSearch
      mode='multiple'
      placeholder="Select a person"
      optionFilterProp="children"
      onSearch={onSearch}
      filterOption={filterOption}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'tom',
          label: 'Tom',
        },
      ]}
    />

    <AutoComplete
      className='zs-select'
      bordered={false}
      status='error'
      options={options}
      style={{ width: '100%' }}
      onSearch={(text) => setOptions(getPanelValue(text))}
      placeholder="input here"
    />

    <TimePicker className='zs-picker' bordered={false} style={{ width: '100%' }} />
    <TimePicker.RangePicker className='zs-picker' bordered={false} style={{ width: '100%' }} />

    <TreeSelect
      className='zs-select'
      bordered={false}
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      treeData={treeData}
    />
  </Space>
}

export default AntdStyles;