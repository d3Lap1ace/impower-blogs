import {SidebarConfig4Multiple} from "vuepress/config";
import backendSideBar from "./sidebars/backendSideBar.js";
import frontendSideBar from "./sidebars/frontendSideBar.js";
import toolsSideBar from "./sidebars/toolsSideBar.js";

export default{
    "/backend/": backendSideBar,
    "/frontend/": frontendSideBar,
    "/tools": toolsSideBar,
} as SidebarConfig4Multiple;
