export class TitleStore {
  /**
   * @type {{[p: string]: import('tippy.js').Instance}}
   */
  static instances = {};
  static id = 0;
  static idAttrName = 'title-id';

  static get(el) {
    const id = el.getAttribute(TitleStore.idAttrName);
    return TitleStore.instances[id];
  }

  static add(el, instance) {
    const id = ++TitleStore.id;
    el.setAttribute(TitleStore.idAttrName, id);
    TitleStore.instances[id] = instance;
  }

  static remove(el) {
    const id = el.getAttribute(TitleStore.idAttrName);
    id in TitleStore.instances && delete TitleStore.instances[id];
  }
}
