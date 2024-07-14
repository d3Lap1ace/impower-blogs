import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

import theme from "./theme.js";


export default defineUserConfig({
  base: "/impower-blogs/",

  lang: "zh-CN",
  title: "impower",
  description: "vuepress-theme-hope 的文档演示",

  theme,

  //插件配置
  plugins: [
    searchPlugin({
        locales: {
            '/':{
                placeholder: "搜索本站",
            }
        },
        // 热键支持
        hotKeys: ["command", "k"],
        // 最大推荐个数
        maxSuggestions: 7,
        // 排除首页
        isSearchable: (page) => page.path !== '/',
    })
  ],
  
  markdown: {
    // 开启代码块的行号
    lineNumbers: true,
    // 支持 4 级以上的标题渲染
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
  },

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});


