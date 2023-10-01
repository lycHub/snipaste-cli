import { useSafeState } from "ahooks";
import {CustomColumnType, FieldItem} from "./type";
import {minmax} from "../utils";

const ColWidthRange = [80, 1000];

function useTableConfig<T>() {
  const [columns, setColumns] = useSafeState<CustomColumnType<T>[]>([]);
  const [fieldConfig, setFieldConfig] = useSafeState<FieldItem[]>([]);

  return {
    columns, setColumns,
    fieldConfig, setFieldConfig
  }
}

function initFieldConfig<T>(cols: CustomColumnType<T>[]): FieldItem[] {
  return cols.map((item) => {
    // const key = item.dataIndex;
    return {
      key: item.key,
      title: item.title,
      fixed: item.fixed || false,
      checked: true,
      width: item.width,
    }
  })
}

function getColumns<T>(fields: FieldItem[], cols: CustomColumnType<T>[]) {
  // console.log('getCurrentColumns :>> ', trueFixedIndexes);
  return fields.reduce((res, curr, index) => {
    if (curr.checked) {
      const targetColumn = cols.find(item => item.key === curr.key);
      if (targetColumn) {
        targetColumn.width = minmax(curr.width || targetColumn.width, ColWidthRange);
        // console.log('targetColumn.width', targetColumn)
        res.push(targetColumn);
      }
    }
    return res;
  }, [] as CustomColumnType<T>[]);
}
  
  
export {
  ColWidthRange,
  initFieldConfig,
  getColumns,
  useTableConfig,
}