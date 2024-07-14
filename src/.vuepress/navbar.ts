import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/portfolio",
  "/programming-language/",
  {
    text: "后端开发",
    link: "/backend ",
  },
  {
    text: "开发工具",
    link: "/tools",
  },
]);
