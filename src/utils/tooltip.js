import Tooltip from 'tooltip.js';

// 依赖 element-ui 的 tooltip 样式，在 element-ui.js 中单独引入
// import 'element-ui/packages/theme-chalk/lib/tooltip.css';

const zIndex = 4000; // 默认的 z-index 值
const refs = {};
let tooltipId = 0;

/**
 * create tooltip
 * @param {HTMLElement} el
 * @param {String} title
 * @param {String<'light'|'dark'>} effect
 * @param {String} placement
 * @param {String} className
 * @param {Number} maxWidth
 * @return {Tooltip}
 */
export function tooltipCreate(
  el,
  title,
  { effect, placement, className, maxWidth }
) {
  const id = (el.dataset.tooltipId =
    el.dataset.tooltipId || String(++tooltipId));
  let tooltip;

  if (!refs.hasOwnProperty(id)) {
    tooltip = new Tooltip(el, {
      placement,
      // @require 'element-ui/packages/theme-chalk/lib/tooltip.css'
      template: `
        <div
          class="v-title tooltip el-tooltip__popper is-${effect} ${className}"
          role="tooltip"
          style="${
            maxWidth ? 'max-width:' + maxWidth + 'px' : ''
          };transition: opacity 200ms linear;opacity: 0;z-index: ${zIndex}">
          <div class="tooltip__arrow popper__arrow"></div>
          <div class="tooltip__inner"></div>
        </div>
      `,
      title,
      trigger: 'manual',
      popperOptions: {
        modifiers: {
          preventOverflow: { enabled: false },
          hide: { enabled: false }
        },
        removeOnDestroy: true
      },
      container: document.body
    });
    tooltip.show();
    refs[id] = tooltip;
  } else {
    tooltip = refs[id];
    clearTimeout(tooltip._timeout);
  }

  // transition
  tooltip.popperInstance && (tooltip.popperInstance.popper.style.opacity = 1);

  return tooltip;
}

/**
 * remove tooltip
 * @param {HTMLElement} el
 * @param {Number} delayHide
 */
export function tooltipRemove(el, delayHide = 200) {
  const id = el.dataset.tooltipId;
  const tooltip = refs[id];
  if (tooltip) {
    if (tooltip._timeout) clearTimeout(tooltip._timeout);
    tooltip.popperInstance && (tooltip.popperInstance.popper.style.opacity = 0);
    tooltip._timeout = setTimeout(() => {
      tooltip.dispose();
      delete refs[id];
    }, delayHide);
  }
}

/**
 * update tooltip title
 * @param {HTMLElement} el
 * @param {String} title
 */
export function tooltipUpdateTitle(el, title) {
  const id = el.dataset.tooltipId;
  const tooltip = refs[id];
  if (tooltip) {
    tooltip.updateTitleContent(title);
  }
}
