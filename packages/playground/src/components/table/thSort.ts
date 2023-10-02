const DragValidCls = 'resize-box';
const DragTargetCls = 'drag-target';
const DragOverCls = 'drag-over';
const DragDataKey = 'dragIndex';

let draggingEl: HTMLTableHeaderCellElement | null = null;

interface DragEndParams {
  oldIndex: number;
  newIndex: number;
}
function validEl(event: DragEvent) {
  const th = event.target as HTMLTableHeaderCellElement;
  return th?.draggable && th.classList.contains(DragValidCls) ? th : null;
}
function handleDragStart(event: DragEvent) {
  const th = validEl(event);
  // console.log('handleDragStart', th.dataset.index);
  if (th && th.dataset.index && event.dataTransfer) {
    th.classList.add(DragTargetCls);
    draggingEl = th;
    event.dataTransfer.setData(DragDataKey, th.dataset.index);
    event.dataTransfer.effectAllowed = 'move';
  }
}

function handleDragEnter(event: DragEvent) {
  const th = validEl(event);
  // console.log('handleDragStart', th.dataset.index);
  if (th && th !== draggingEl) {
    th.classList.add(DragOverCls);
  }
}

function handleDragOver(event: DragEvent) {
  const th = validEl(event);
  if (th) {
    event.preventDefault();
  }
}

function handleDragLeave(event: DragEvent) {
  // console.log('handleDragLeave', event.target); 在不可drop到div上放手也会触发
  const th = validEl(event);
  if (th && th !== draggingEl) {
    th.classList.remove(DragOverCls);
  }
}

function handleDragEnd(event: DragEvent) {
  event.preventDefault();
  const th = validEl(event);
  if (th && th === draggingEl) {
    th.classList.remove(DragTargetCls);
    draggingEl = null;
  }
}

function handleDrop(event: DragEvent, callback: (event: DragEndParams) => void) {
  event.preventDefault();
  const th = validEl(event);
  const result = null;
  if (th && th !== draggingEl && th.dataset.index) {
    draggingEl?.classList?.remove(DragTargetCls);
    th.classList.remove(DragOverCls);
    draggingEl = null;
    if (callback && event.dataTransfer) {
      const oldIndex = +event.dataTransfer.getData(DragDataKey);
      const newIndex = +th.dataset.index;
      callback({ oldIndex, newIndex });
    }
  }
}

export {
  handleDragStart,
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDragEnd,
  handleDrop
}