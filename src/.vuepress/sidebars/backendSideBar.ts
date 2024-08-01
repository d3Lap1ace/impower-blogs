export default [
    "",
    {
        text: "JAVA",
        collapsible: true,
        children: [
            "01.Java基础.md",
            "02.Java_oop.md",
            {
                text: "Collection",
                collapsible: true,
                children:[
                    "03.Java集合.md",
                    "04.Java集合源码分析.md",
                ],
            },
            "05.Jvm.md",
            {
                text: "Juc并发编程",
                collapsible: true,
                children:[
                    "06.Juc并发概念.md",
                    "06.Juc锁.md",
                    "06.Juc线程池.md",
                ],
            },
            
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
        text: "数据库",
        collapsible: true,
        children:[
            "Linux.md",
            "JDBC.md",
            "Mysql.md",
            "Redis.md",
        ]
    },
    
    {
        text: "分布式微服务",
        collapsible: true,
        children:[
            "SpringCloud.md",
            
        ],
    },
];