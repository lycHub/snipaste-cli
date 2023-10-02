import {DragEndEvent, DragMoveEvent} from "@dnd-kit/core";
import {minmax, removePx} from "../utils";
import {DragData} from "../ResizeBox";

interface DragStartMeta {
  group: HTMLTableColElement[];
  cols: {
    thead: HTMLTableColElement[];
    tbody: HTMLTableColElement[];
  }
  initialWidths: number[];
}

const dragStartMeta: DragStartMeta = {
  initialWidths: [],
  group: [],
  cols: {
    thead: [],
    tbody: [],
  }
}

interface DragEndParams {
  index: number;
  width: number;
}

function handleDragStart(tableWrap: HTMLDivElement | null) {
  if (tableWrap) {
    const tableContentCols = tableWrap.querySelectorAll('.ant-table-content table colgroup col') as NodeListOf<HTMLTableColElement>;
    if (tableContentCols.length) {
      dragStartMeta.group = filterCols(tableContentCols);
    } else { // 固定头部
      dragStartMeta.cols = {
        thead: filterCols(tableWrap.querySelectorAll('.ant-table-header colgroup col')),
        tbody: filterCols(tableWrap.querySelectorAll('.ant-table-body colgroup col')),
      }
    }

    const widths: number[] = [];
    const cols = dragStartMeta.group.length ? dragStartMeta.group : dragStartMeta.cols.thead;
    if (cols.length) {
      cols.forEach(item => {
        const width = item.style.width;
        widths.push(+removePx(width));
      });
      dragStartMeta.initialWidths = widths;
    }
  }
}

function handleDragMove({active, delta}: DragMoveEvent) {
  const index = (active.id as string).split('_')[1];
  const { range } = active.data.current! as DragData;
  const needSetWidthCols = dragStartMeta.group.length ? [dragStartMeta.group] : [dragStartMeta.cols.thead, dragStartMeta.cols.tbody];
  if (dragStartMeta.initialWidths.length && index && needSetWidthCols.length) {
    let currentWidth = dragStartMeta.initialWidths[+index];
    // console.log('move currentWidth :>> ', currentWidth, range);
    currentWidth += delta.x;
    const validWidth = minmax(currentWidth, range);
    needSetWidthCols.forEach(cols => {
      cols[+index].style.width = validWidth + 'px';
    });
  }
}

function handleDragEnd({active}: DragEndEvent, callback: (params: DragEndParams) => void) {
  const index = (active.id as string).split('_')[1];
  const cols = dragStartMeta.group.length ? dragStartMeta.group : dragStartMeta.cols.thead;
  if (dragStartMeta.initialWidths.length && index && cols.length) {
    const col = cols[+index];
    callback({ index: +index, width: +removePx(col.style.width) });
  }
}

function filterCols(cols?: NodeListOf<HTMLTableColElement>): HTMLTableColElement[] {
  const result: HTMLTableColElement[] = [];
  if (cols?.length) {
    cols.forEach(item => {
      if (!item.classList.contains('ant-table-selection-col')) {
        result.push(item);
      }
    })
  }

  return result;
}

export type {
  DragEndParams
}

export {
  handleDragStart,
  handleDragMove,
  handleDragEnd,
}