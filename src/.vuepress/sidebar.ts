import {SidebarConfig4Multiple} from "vuepress/config";
import JavaSideBar from "./sidebars/JavaSideBar.js";
import DbSideBar from "./sidebars/DbSideBar.js";
import MiddlewareSideBar from "./sidebars/MiddlewareSideBar.js";

export default{
    "/Java/": JavaSideBar,
    "/DataBase/": DbSideBar,
    "/Middleware/": MiddlewareSideBar,

} as SidebarConfig4Multiple;
