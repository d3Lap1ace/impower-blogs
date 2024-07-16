import { hopeTheme } from "vuepress-theme-hope";
import { searchPlugin } from "@vuepress/plugin-search";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";


export default hopeTheme({
  hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",
  darkmode: "toggle",
  author: {
    name: "luke.lewis",
    url: "https://github.com/d3Lap1ace",
    email: "aegonk@163.com",
  },
  

  iconAssets: "fontawesome-with-brands",

  logo: "book-01.png",

  logoDark: "book-01-b.png",

  repo: "https://github.com/d3Lap1ace",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,
  // 页脚
  footer: "默认页脚",
  displayFooter: true,

  // 路径导航
  breadcrumb: true,

  // 路径导航的图标显示
  breadcrumbIcon: true,

  // 全屏按钮
  fullscreen: true,

  // 文章的最后更新时间
  lastUpdated: true,

  // 显示页面的贡献者
  contributors: false,

  // 纯净模式-禁用
  pure: false,


  

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    // 注意: 仅用于测试! 你必须自行生成并在生产环境中使用自己的评论服务
    // comment: {
    //   provider: "Giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },

    search: true,
    
    components: {
      components: ["Badge", "VPCard"],
    },
    // 代码复制功能-vuepress-plugin-copy-code2
    copyCode: {
        // 在移动端也可以实现复制代码
        showInMobile: true,
        // 代码复制成功提示消息的时间-ms
        duration: 3000,
    },

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      hint: true,
      component: true,
      demo: true,
      gfm:true,
      figure: true,       // 启用 figure
      imgLazyload: true,  // 启用图片懒加载
      imgSize: true,      // 启用图片大小
      imgMark: true,      // 启用图片标记
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      playground: {
        presets: ["ts", "vue"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 katex
      // katex: true,

      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
