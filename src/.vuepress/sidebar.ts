import {SidebarConfig4Multiple} from "vuepress/config";
import { zhSidebar } from "./sidebars/backendSideBar.js"

export default{
  "/backend/": zhSidebar,

  "/": "auto",
  
} as SidebarConfig4Multiple;
