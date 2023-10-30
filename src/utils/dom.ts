export function getStyleToInt(
  elem: HTMLElement,
  attribute: keyof CSSStyleDeclaration,
) {
  return toNum(getStyle(elem, attribute));
}

function getStyle(elem: HTMLElement, attribute: keyof CSSStyleDeclaration) {
  return elem.style[attribute] || getComputedStyle(elem)[attribute];
}

export function toNum(val: any): number {
  val = +val;
  return Number.isNaN(val) ? 0 : val;
}

// 校验是否溢出
export function isOverflow(elem: HTMLElement, multiple = false) {
  const elemRect = elem.getBoundingClientRect();
  const range = document.createRange();
  range.setStart(elem, 0);
  range.setEnd(elem, elem.childNodes.length);
  const rangeRect = range.getBoundingClientRect();

  if (multiple) {
    const height = rangeRect.height;
    const padding =
      getStyleToInt(elem, 'paddingTop') + getStyleToInt(elem, 'paddingBottom');
    const border =
      getStyleToInt(elem, 'borderTopWidth') +
      getStyleToInt(elem, 'borderBottomWidth');
    return height + padding + border > elemRect.height;
  } else {
    const width = rangeRect.width;
    const padding =
      getStyleToInt(elem, 'paddingLeft') + getStyleToInt(elem, 'paddingRight');
    const border =
      getStyleToInt(elem, 'borderLeftWidth') +
      getStyleToInt(elem, 'borderRightWidth');
    return width + padding + border > elemRect.width;
  }
}
