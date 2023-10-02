const DragValidCls = 'resize-box';
const DragTargetCls = 'drag-target';
const DragOverCls = 'drag-over';
const DragDataKey = 'dragItemKey';

let draggingEl: HTMLTableHeaderCellElement | null = null;

interface DragEndParams {
  fromKey: string;
  toKey: string;
}
function validEl(event: DragEvent) {
  const th = event.target as HTMLTableHeaderCellElement;
  return th?.draggable && th.classList.contains(DragValidCls) ? th : null;
}
function handleDragStart(event: DragEvent) {
  const th = validEl(event);
  // console.log('handleDragStart', th.dataset.key);
  if (th && th.dataset.key && event.dataTransfer) {
    th.classList.add(DragTargetCls);
    draggingEl = th;
    event.dataTransfer.setData(DragDataKey, th.dataset.key);
    event.dataTransfer.effectAllowed = 'move';
  }
}

function handleDragEnter(event: DragEvent) {
  const th = validEl(event);
  // console.log('handleDragStart', th.dataset.key);
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
  if (th && th !== draggingEl && th.dataset.key) {
    draggingEl?.classList?.remove(DragTargetCls);
    th.classList.remove(DragOverCls);
    draggingEl = null;
    if (callback && event.dataTransfer) {
      const fromKey = event.dataTransfer.getData(DragDataKey);
      const toKey = th.dataset.key;
      callback({ fromKey, toKey });
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