import Plugin from '../../lib/index';

export default (ctx) => {
  const { Vue } = ctx;

  Vue.use(Plugin);
};
