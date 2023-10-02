import {DragEndEvent, DragMoveEvent} from "@dnd-kit/core";
import {minmax, removePx} from "../utils";
import {DragData} from "../ResizeBox";

interface DragStartMeta {
  cols: {
    thead: NodeListOf<HTMLTableColElement> | null;
    tbody: NodeListOf<HTMLTableColElement> | null;
  }
  initialWidths: number[];
}

const dragStartMeta: DragStartMeta = {
  cols: {
    thead: null,
    tbody: null
  },
  initialWidths: []
}

interface DragEndParams {
  index: number;
  width: number;
}
function handleDragStart(tableWrap: HTMLDivElement | null) {
  if (!tableWrap) return;
  dragStartMeta.cols = {
    thead: filterCols(tableWrap.querySelectorAll('.ant-table-header colgroup col')),
    tbody: filterCols(tableWrap.querySelectorAll('.ant-table-body colgroup col')),
  }
  const widths: number[] = [];
  if (dragStartMeta.cols.thead?.length) {
    dragStartMeta.cols.thead.forEach(item => {
      const width = item.style.width;
      widths.push(+removePx(width));
    });
    // console.log('widths :>> ', widths);
    dragStartMeta.initialWidths = widths;
  }
}

function handleDragMove({active, delta}: DragMoveEvent) {
  const index = (active.id as string).split('_')[1];
  const { range } = active.data.current! as DragData;
  const { thead, tbody } = dragStartMeta.cols;
  // console.log('handleDragMove', index, dragStartMeta);
  if (dragStartMeta.initialWidths.length && index && thead && tbody) {
    const theadCol = thead[+index];
    const tbodyCol = tbody[+index];
    // console.log('theadCol :>> ', theadCol);
    let currentWidth = dragStartMeta.initialWidths[+index];
    console.log('move currentWidth :>> ', currentWidth, range);
    currentWidth += delta.x;
    const validWidth = minmax(currentWidth, range);
    theadCol.style.width = validWidth + 'px';
    tbodyCol.style.width = validWidth + 'px';
  }
}

function handleDragEnd({active}: DragEndEvent, callback: (params: DragEndParams) => void) {
  const index = (active.id as string).split('_')[1];
  const { thead } = dragStartMeta.cols;
  if (dragStartMeta.initialWidths.length && index && thead) {
    const theadCol = thead[+index];
    callback({ index: +index, width: +removePx(theadCol.style.width) });
  }
}

function filterCols(cols?: NodeListOf<HTMLTableColElement>): any {
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