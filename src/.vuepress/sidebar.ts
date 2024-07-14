import {SidebarConfig4Multiple} from "vuepress/config";
import backendSideBar from "./sidebars/backendSideBar.js";

export default{
  "/backend/": backendSideBar,

  "/": "auto",
  structure: true,
  
} as SidebarConfig4Multiple;
