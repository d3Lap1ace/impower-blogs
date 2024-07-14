import {SidebarConfig4Multiple} from "vuepress/config";
import backendSideBar from "./sidebars/backendSideBar.js";

export default({
    "structure": true,
    "/backend/": backendSideBar,
    "/": "auto",
}) as SidebarConfig4Multiple;
