import {ColumnType} from "antd/es/table/interface";
export type FixedType = 'left' | 'right' | boolean;
export interface DataType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface FieldItem {
  key: string | number;
  title: string;
  fixed: FixedType;
  checked: boolean;
  width: number;
}

export interface CustomColumnType<T> extends ColumnType<T> {
  minWidth?: number;
  maxWidth?: number;
  fixed?: FixedType;
  key: string | number;
  title: string;
  width: number;
}