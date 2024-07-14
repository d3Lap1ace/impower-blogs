import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
//   "/portfolio",
  {
    text: "后端开发",
    link: "/backend/",
  },
  {
    text: "前端开发",
    link: "/frontend/",
  },
  {
    text: "开发工具",
    link: "/tools/",
  },
]);
