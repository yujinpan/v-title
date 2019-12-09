// 主组件
import VTitle from '@/directives/title';

// Vue.use()
VTitle.install = (Vue) => {
  Vue.directive('title', VTitle);
};

// Vue.component()
export default VTitle;
