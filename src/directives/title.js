/**
 * 辅助文字展示（类似el-tooltip）
 *
 * @modifier light 主题 dark/light，默认 dark
 * @modifier overflow 是否溢出模式，文字显示省略号时才显示，默认 false
 * @modifier multiple 是否多行模式，文字多行显示省略号时才显示，默认 false
 * @modifier delay 是否多行模式，文字多行显示省略号时才显示，默认 false
 * @attr {Number} title-delay-time 延迟时间，默认 0
 * @attr {String} title-placement 位置 top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)，默认 top
 * @attr {String} title-max-width 最大宽度
 * @attr {String} title-class-name 自定义类名
 * @example
 * ```
 * <div v-title.overflow.dark="'test'" title-placement="top"></div>
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
let tooltipId = 0; // 递增

export default {
  inserted(el, binding) {
    // set tooltip-id
    const id = ++tooltipId;
    el.setAttribute(tooltipIdName, id + '');
    const data = (tooltipData[id] = {
      target: el,
      tooltip: null,
      id,
      _activateTooltip: null,
      activateTooltip: null,
      _deactivateTooltip: null,
      deactivateTooltip: null,
      text: binding.value
    });

    // attrs config
    const effect = binding.modifiers.light ? 'light' : 'dark';
    const maxWidth = el.getAttribute('title-max-width');
    const className = el.getAttribute('title-class-name');
    const placement = el.getAttribute('title-placement') || 'top';
    const delayTime = el.getAttribute('title-delay-time') || 200;
    const overflow = binding.modifiers.overflow;
    const multiple = binding.modifiers.multiple;
    const delay = binding.modifiers.delay;

    // create add/remove event
    // hide delay 250ms
    data._deactivateTooltip = () => {
      // remove tooltip's elem listener
      if (data.tooltip) {
        const tooltipElem = data.tooltip.popperInstance.popper;
        // cancel deactivate when enter
        tooltipElem.removeEventListener(
          'mouseenter',
          data.deactivateTooltip.cancel,
          false
        );
        // deactivate when leave
        tooltipElem.removeEventListener(
          'mouseleave',
          data.deactivateTooltip,
          false
        );
      }
      deactivateTooltip(data.target);
      data.tooltip = null;
    };
    data.deactivateTooltip = debounce(data._deactivateTooltip, 250);

    // show delay
    data._activateTooltip = () => {
      data.tooltip = activateTooltip(data.target, data.text, {
        effect,
        placement,
        overflow,
        multiple,
        maxWidth,
        className
      });
      if (data.tooltip) {
        const tooltipElem = data.tooltip.popperInstance.popper;
        // cancel deactivate when enter
        tooltipElem.addEventListener(
          'mouseenter',
          data.deactivateTooltip.cancel,
          false
        );
        // deactivate when leave
        tooltipElem.addEventListener(
          'mouseleave',
          data.deactivateTooltip,
          false
        );
      }
    };
    data.activateTooltip = debounce(
      data._activateTooltip,
      delay ? delayTime : 0
    );

    // 绑定事件
    el.addEventListener('mouseenter', data.activateTooltip, false);
    // cancel deactivate when enter
    el.addEventListener('mouseenter', data.deactivateTooltip.cancel, false);
    el.addEventListener('mouseleave', data.deactivateTooltip, false);
    // cancel activate when leave
    el.addEventListener('mouseleave', data.activateTooltip.cancel, false);
    el.addEventListener('click', data._deactivateTooltip, false);
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
      el.removeEventListener(
        'mouseenter',
        data.deactivateTooltip.cancel,
        false
      );
      el.removeEventListener('mouseleave', data.deactivateTooltip, false);
      el.removeEventListener('mouseleave', data.activateTooltip.cancel, false);
      el.removeEventListener('click', data._deactivateTooltip, false);

      // 直接移除当前的 tooltip（例如：当点击进行路由切换时需要）
      data._deactivateTooltip();

      // remove cache data
      removeTooltipData(el);
    }
  }
};

// 激活
function activateTooltip(
  el,
  title,
  { effect, placement, overflow, multiple, maxWidth, className }
) {
  if (!overflow || (overflow && checkOverflow(el, multiple))) {
    return tooltipCreate(el, title, { effect, placement, maxWidth, className });
  }
}

// 关闭
function deactivateTooltip(el) {
  // @require('../utils/tooltip.js#tooltipCreate') transition: 200ms
  tooltipRemove(el, 200);
}

// 校验是否溢出
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

// 获取缓存数据
function getTooltipData(el) {
  const id = el.getAttribute(tooltipIdName);
  if (tooltipData.hasOwnProperty(id)) {
    return tooltipData[id];
  } else {
    return null;
  }
}

// 移除缓存数据
function removeTooltipData(el) {
  const id = el.getAttribute(tooltipIdName);
  if (tooltipData.hasOwnProperty(id)) {
    delete tooltipData[id];
  }
}
