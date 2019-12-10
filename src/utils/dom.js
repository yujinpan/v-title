import { getStyle } from 'element-ui/lib/utils/dom';

export function getStyleToInt(elem, attribute) {
  return parseInt(getStyle(elem, attribute), 10) || 0;
}
