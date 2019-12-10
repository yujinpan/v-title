/*!
 * v-title v1.0.2
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */

import debounce from 'lodash/debounce';
import Tooltip from 'tooltip.js';

var zIndex = 4000;
var refs = {};
var tooltipId = 0;
function tooltipCreate(el, title, _ref) {
  var effect = _ref.effect,
      placement = _ref.placement;
  var id = el.dataset.tooltipId = el.dataset.tooltipId || String(++tooltipId);
  var tooltip;

  if (!refs.hasOwnProperty(id)) {
    tooltip = new Tooltip(el, {
      placement: placement,
      template: "\n        <div \n          class=\"tooltip el-tooltip__popper is-".concat(effect, "\" \n          role=\"tooltip\" \n          style=\"transition: opacity 200ms linear;opacity: 0;z-index: ").concat(zIndex, "\">\n          <div class=\"tooltip__arrow popper__arrow\"></div>\n          <div class=\"tooltip__inner\"></div>\n        </div>\n      "),
      title: title,
      trigger: 'manual',
      popperOptions: {
        modifiers: {
          preventOverflow: {
            enabled: false
          },
          hide: {
            enabled: false
          }
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

  tooltip.popperInstance && (tooltip.popperInstance.popper.style.opacity = 1);
  return tooltip;
}
function tooltipRemove(el) {
  var delayHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var id = el.dataset.tooltipId;
  var tooltip = refs[id];

  if (tooltip) {
    if (tooltip._timeout) clearTimeout(tooltip._timeout);
    tooltip.popperInstance && (tooltip.popperInstance.popper.style.opacity = 0);
    tooltip._timeout = setTimeout(function () {
      tooltip.dispose();
      delete refs[id];
    }, delayHide);
  }
}
function tooltipUpdateTitle(el, title) {
  var id = el.dataset.tooltipId;
  var tooltip = refs[id];

  if (tooltip) {
    tooltip.updateTitleContent(title);
  }
}

var tooltipData = {};
var tooltipIdName = 'tooltip-id';
var delayHide = 200;
var tooltipId$1 = 0;
var VTitle = {
  inserted: function inserted(el, binding) {
    var id = ++tooltipId$1;
    el.setAttribute(tooltipIdName, id + '');
    var data = tooltipData[id] = {
      id: id,
      activateTooltip: null,
      deactivateTooltip: null
    };
    var effect = binding.modifiers.light ? 'light' : 'dark';
    var placement = el.getAttribute('title-placement') || 'top';
    var overflow = !!binding.modifiers.overflow;
    data.deactivateTooltip = debounce(function (event) {
      deactivateTooltip(event.target);
    }, delayHide);

    data.activateTooltip = function (event) {
      data.deactivateTooltip.cancel();
      if (data.tooltipRemoveTimeout) clearTimeout(data.tooltipRemoveTimeout);
      activateTooltip(event.target, binding.value, {
        effect: effect,
        placement: placement,
        overflow: overflow
      });
    };

    el.addEventListener('mouseenter', data.activateTooltip, false);
    el.addEventListener('mouseleave', data.deactivateTooltip, false);
    el.addEventListener('click', data.deactivateTooltip, false);
  },
  componentUpdated: function componentUpdated(el, binding) {
    tooltipUpdateTitle(el, binding.value);
  },
  unbind: function unbind(el) {
    var data = getTooltipData(el);

    if (data) {
      el.removeEventListener('mouseenter', data.activateTooltip, false);
      el.removeEventListener('mouseleave', data.deactivateTooltip, false);
      el.removeEventListener('click', data.deactivateTooltip, false);
      tooltipRemove(el, 0);
    }
  }
};

function activateTooltip(el, title, _ref) {
  var effect = _ref.effect,
      placement = _ref.placement,
      overflow = _ref.overflow;

  if (!overflow || overflow && checkOverflow(el)) {
    tooltipCreate(el, title, {
      effect: effect,
      placement: placement
    });
  }
}

function deactivateTooltip(el) {
  tooltipRemove(el, delayHide);
}

function checkOverflow(elem) {
  return elem.scrollWidth > elem.offsetWidth;
}

function getTooltipData(el) {
  var id = el.getAttribute(tooltipIdName);

  if (tooltipData.hasOwnProperty(id)) {
    return tooltipData[id];
  } else {
    return null;
  }
}

VTitle.install = function (Vue) {
  Vue.directive('title', VTitle);
};

export default VTitle;
export { tooltipCreate, tooltipRemove, tooltipUpdateTitle };
//# sourceMappingURL=index.js.map
