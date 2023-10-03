function removePx(value: string) {
    return value ? value.slice(0, -2) : '0'
}
// utils
function setStyleProps(dom: HTMLElement, properties: Record<string, string>) {
    const props = Object.entries(properties);
    if (dom && props.length) {
        props.forEach(([key, value]) => {
            dom.style.setProperty(key, value);
        });
    }
}

function minmax(value: number, range: number[]) {
    const validValue = value || 0;
    return Math.max(Math.min(validValue, range[1]), range[0]);
}

export {
    minmax,
    removePx,
    setStyleProps,
}