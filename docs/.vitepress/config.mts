import { defineConfig } from 'vitepress';
import viteDemoPlugin from 'vitepress-plugin-component-demo/vite-plugin';

import viteConfig from '../../vite.config';

export default defineConfig({
  base: '/v-title/',
  title: 'v-title',
  description: 'Tooltip text for Vue.',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yujinpan/v-title/' },
    ],
  },
  vite: {
    plugins: [viteDemoPlugin()],
    resolve: viteConfig.resolve,
    css: viteConfig.css,
  },
  async transformHtml(code) {
    return code.replace(
      '</body>',
      `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S66MPLRFJZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S66MPLRFJZ');
</script>
</body>`,
    );
  },
});
