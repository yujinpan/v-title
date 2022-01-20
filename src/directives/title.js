/**
 * 辅助文字展示（类似el-tooltip）
 *
 * @modifier light 主题 translucent/light，默认 translucent
 * @modifier overflow 是否溢出模式，文字显示省略号时才显示，默认 false
 * @modifier multiple 是否多行模式，文字多行显示省略号时才显示，默认 false
 * @modifier delay 是否多行模式，文字多行显示省略号时才显示，默认 false
 * @attr {Number} title-delay-time 延迟时间，默认 0
 * @attr {String} title-placement 位置 top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)，默认 top
 * @attr {String} title-max-width 最大宽度
 * @example
 * ```
 * <div v-title.overflow.translucent="'test'" title-placement="top"></div>
 * ```
 */
import { isOverflow, toNum } from '@/utils/dom';
import { TitleStore } from '@/utils/store';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

export default {
  inserted(el, binding) {
    const theme = binding.modifiers.light ? 'light-border' : 'translucent';
    const placement = el.getAttribute('title-placement') || 'top';
    const trigger = el.getAttribute('title-trigger') || undefined;
    const maxWidth = toNum(el.getAttribute('title-max-width'));
    const delayTime = toNum(el.getAttribute('title-delay-time')) || 200;
    const overflow = binding.modifiers.overflow;
    const multiple = binding.modifiers.multiple;
    const delay = binding.modifiers.delay;

    const instance = tippy(el, {
      content: binding.value,
      theme,
      trigger,
      maxWidth,
      placement,
      delay: !delay ? 0 : [delayTime],
      interactive: true,
      appendTo: document.body,
      onShow(instance) {
        if (!instance.props.content || (overflow && !isOverflow(el, multiple)))
          return false;
      },
      popperOptions: {
        modifiers: {
          preventOverflow: { enabled: false },
          hide: { enabled: false }
        },
        removeOnDestroy: true
      }
    });

    TitleStore.add(el, instance);
  },
  componentUpdated(el, binding) {
    const instance = TitleStore.get(el);
    instance && instance.setContent(binding.value);
  },
  unbind(el) {
    const instance = TitleStore.get(el);
    if (instance) {
      instance.destroy();
      TitleStore.remove(el);
    }
  }
};
