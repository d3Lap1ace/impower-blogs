import { sidebar } from "vuepress-theme-hope";
export const zhSidebar = sidebar({
    "/codenotes/":[
        {
            text: "JAVA",
            collapsible: true,
            children: [
                "Java基础",
                "Java面向对象.md",
                "集合.md",
                "源码分析.md",
                "Jvm.md",
                
            ],
        },
        {
            text: "Spring框架",
            collapsible: true,
            children:[
                "Mybatis.md",
                "Spring6.md",
                "SpringBoot.md",
            ]
        },
        {
            text: "Linux",
            collapsible: true,
            children:[
                "Mysql.md",
                "JDBC.md",
                "Linux.md",
            ]
        },
        {
            text: "高并发",
            collapsible: true,
            children:[
                "高并发.md",
            ],
        },
        {
            text: "分布式微服务",
            collapsible: true,
            children:[
                "SpringCloud.md",
                "Redis.md",
            ],
        },
    ]
});