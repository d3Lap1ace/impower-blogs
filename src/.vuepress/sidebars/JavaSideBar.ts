export default [
    "",
    {
        text: "JAVA",
        collapsible: true,
        children: [
            {
                text: "Java 容器",
                collapsible: true,
                children:[
                    "03.Java 常用容器.md",
                    "03.Java 并发容器.md",
                ],
            },
            "05.Jvm.md",
            {
                text: "Juc 并发编程",
                collapsible: true,
                children:[
                    "06.Juc并发概念.md",
                    "06.Juc线程锁及机制.md",
                    "06.Juc线程池.md",
                ],
            },
        ],
        
    },
];