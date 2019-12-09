import Tooltip from 'tooltip.js';

// 依赖 element-ui 的 tooltip 样式，在 element-ui.js 中单独引入
// import 'element-ui/packages/theme-chalk/lib/tooltip.css';

const zIndex = 4000; // 默认的 z-index 值
const refs = {};
let tooltipId = 0;

export function tooltipCreate(el, title, { effect, placement }) {
  const id = (el.dataset.tooltipId =
    el.dataset.tooltipId || String(++tooltipId));
  let tooltip;

  if (!refs.hasOwnProperty(id)) {
    tooltip = new Tooltip(el, {
      placement,
      // @require 'element-ui/packages/theme-chalk/lib/tooltip.css'
      template: `
        <div 
          class="tooltip el-tooltip__popper is-${effect}" 
          role="tooltip" 
          style="transition: opacity 200ms linear;opacity: 0;z-index: ${zIndex}">
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

export function tooltipUpdateTitle(el, title) {
  const id = el.dataset.tooltipId;
  const tooltip = refs[id];
  if (tooltip) {
    tooltip.updateTitleContent(title);
  }
}
