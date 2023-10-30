import type { Instance } from 'tippy.js';

export class TitleStore {
  static instances: Record<string, Instance> = {};
  static id = 0;
  static idAttrName = 'title-id';

  static get(el: HTMLElement) {
    const id = el.getAttribute(TitleStore.idAttrName);
    return TitleStore.instances[id as string];
  }

  static add(el: HTMLElement, instance: Instance) {
    const id = ++TitleStore.id;
    el.setAttribute(TitleStore.idAttrName, id + '');
    TitleStore.instances[id] = instance;
  }

  static remove(el: HTMLElement) {
    const id = el.getAttribute(TitleStore.idAttrName) as string;
    id in TitleStore.instances && delete TitleStore.instances[id];
  }
}
