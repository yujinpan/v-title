import DefaultTheme from 'vitepress/theme';
import { enhanceApp as enhanceAppDemo } from 'vitepress-plugin-component-demo';

import type { Theme } from 'vitepress';

import Component from '@/index';

export default {
  extends: DefaultTheme,
  async enhanceApp(context) {
    enhanceAppDemo(context);
    context.app.use(Component);
  },
} as Theme;
