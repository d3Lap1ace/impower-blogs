import {SidebarConfig4Multiple} from "vuepress/config";
import JavaSideBar from "./sidebars/JavaSideBar.js";
import DbSideBar from "./sidebars/DbSideBar.js";

export default{
    "/Java/": JavaSideBar,
    "/DataBase/": DbSideBar,

} as SidebarConfig4Multiple;
