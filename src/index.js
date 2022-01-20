// 主组件
import VTitle from '@/directives/title';
import './styles/title.scss';

// Vue.use()
VTitle.install = (Vue) => {
  Vue.directive('title', VTitle);
};

// Vue.component()
export default VTitle;
