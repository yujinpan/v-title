/**
 * 辅助文字展示（类似el-tooltip）
 *
 * @modifier light 主题 dark/light，默认 dark
 * @modifier overflow 是否溢出模式，文字显示省略号时才显示，默认 false
 * @modifier multiple 是否多行模式，文字多行显示省略号时才显示，默认 false
 * @attr {String} tooltip-placement 位置 top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)，默认 top
 * @example
 * ```
 * <div v-title.overflow.dark="'test'" tooltip-placement="top"></div>
 * ```
 */

import debounce from 'lodash/debounce';

import {
  tooltipRemove,
  tooltipCreate,
  tooltipUpdateTitle
} from '@/utils/tooltip';
import { getStyleToInt } from '@/utils/dom';

// 存放所有的 tooltip 数据
const tooltipData = {
  // 1: {}
};
const tooltipIdName = 'tooltip-id';
const delayHide = 200; // @require('../utils/tooltip.js#tooltipCreate') transition: 200ms
let tooltipId = 0; // 递增

export default {
  inserted(el, binding) {
    // 设置 tooltip-id
    const id = ++tooltipId;
    el.setAttribute(tooltipIdName, id + '');
    const data = (tooltipData[id] = {
      id,
      activateTooltip: null,
      deactivateTooltip: null,
      text: binding.value
    });

    // 主题, 位置, 是否溢出模式
    const effect = binding.modifiers.light ? 'light' : 'dark';
    const placement = el.getAttribute('title-placement') || 'top';
    const overflow = !!binding.modifiers.overflow;
    const multiple = !!binding.modifiers.multiple;

    // 创建 add/remove 事件
    data.deactivateTooltip = debounce((event) => {
      deactivateTooltip(event.target);
    }, delayHide);
    data.activateTooltip = (event) => {
      data.deactivateTooltip.cancel();
      if (data.tooltipRemoveTimeout) clearTimeout(data.tooltipRemoveTimeout);
      activateTooltip(event.target, data.text, {
        effect,
        placement,
        overflow,
        multiple
      });
    };

    // 绑定事件
    el.addEventListener('mouseenter', data.activateTooltip, false);
    el.addEventListener('mouseleave', data.deactivateTooltip, false);
    el.addEventListener('click', data.deactivateTooltip, false);
  },
  componentUpdated(el, binding) {
    const data = getTooltipData(el);
    if (data) {
      data.text = binding.value;
      tooltipUpdateTitle(el, binding.value);
    }
  },
  unbind(el) {
    // 销毁事件与数据
    const data = getTooltipData(el);
    if (data) {
      el.removeEventListener('mouseenter', data.activateTooltip, false);
      el.removeEventListener('mouseleave', data.deactivateTooltip, false);
      el.removeEventListener('click', data.deactivateTooltip, false);

      // 直接移除当前的 tooltip（例如：当点击进行路由切换时需要）
      tooltipRemove(el, 0);
    }
  }
};

function activateTooltip(el, title, { effect, placement, overflow, multiple }) {
  if (!overflow || (overflow && checkOverflow(el, multiple))) {
    tooltipCreate(el, title, { effect, placement });
  }
}

function deactivateTooltip(el) {
  tooltipRemove(el, delayHide);
}

function checkOverflow(elem, multiple = false) {
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

function getTooltipData(el) {
  const id = el.getAttribute(tooltipIdName);
  if (tooltipData.hasOwnProperty(id)) {
    return tooltipData[id];
  } else {
    return null;
  }
}
