import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "impower",
  description: "vuepress-theme-hope 的文档演示",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});


module.exports = {
    title: '我的博客',
    description: '全栈知识库',
    theme: 'rope',
    base: '/impower-blogs/',
    locales: {
        '/': {
          lang: 'zh-CN'
        }
      },
}
