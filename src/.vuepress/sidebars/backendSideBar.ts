export default [
    "",
    {
        text: "JAVA",
        collapsible: true,
        children: [
            "01.Java基础.md",
            "02.Java_oop.md",
            "03.Java集合.md",
            "04.Java集合源码分析.md",
            "05.Jvm.md",
            {
                text: "Juc并发",
                collapsible: true,
                children:[
                    "06.Juc基础概念.md",
                    "06.Juc锁.md",
                    "06.Juc高级",
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
];