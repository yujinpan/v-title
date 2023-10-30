import tippy from 'tippy.js';
import { defineDirective } from 'vue-component-pluggable';

import type { Placement, Props } from 'tippy.js';

import { isOverflow, toNum } from '@/utils/dom';
import { TitleStore } from '@/utils/store';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

export default defineDirective<string, HTMLElement>({
  name: 'title',
  inserted(el, binding) {
    const theme = binding.modifiers.light ? 'light-border' : 'translucent';
    const placement = (el.getAttribute('title-placement') ||
      'top') as Placement;
    const appendTo = el.getAttribute('title-append-to') || undefined;
    const trigger = el.getAttribute('title-trigger') || undefined;
    const maxWidth = el.getAttribute('title-max-width') || undefined;
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
      delay: !delay ? 0 : [delayTime, 0],
      interactive: true,
      appendTo: appendTo
        ? ({
            parent: 'parent',
            body: document.body,
            'offset-parent': (el: HTMLElement) => el.offsetParent,
          }[appendTo] as Props['appendTo'])
        : undefined,
      onShow(instance) {
        if (!instance.props.content || (overflow && !isOverflow(el, multiple)))
          return false;
      },
      popperOptions: {
        modifiers: [
          { name: 'preventOverflow', enabled: false },
          { name: 'hide', enabled: false },
        ],
      },
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
  },
});
