// 主组件
import VTitle from '@/directives/title';

// tooltip utils
export {
  tooltipCreate,
  tooltipRemove,
  tooltipUpdateTitle
} from './utils/tooltip';

// Vue.use()
VTitle.install = (Vue) => {
  Vue.directive('title', VTitle);
};

// Vue.component()
export default VTitle;
