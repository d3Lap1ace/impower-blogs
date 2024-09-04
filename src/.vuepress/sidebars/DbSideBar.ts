export default [
    "",
    {
        text: "数据库",
        collapsible: true,
        children: [
            {
                text: "Mysql",
                collapsible: true,
                children:[
                    "01.Mysql基本使用.md",
                    "01.Mysql高级.md",
                    "03.ShardingSphere5.md",
                ],
            },
            {
                text: "Redis",
                collapsible: true,
                children:[
                    "04.Redis基本使用.md",
                    "05.Redis应用.md",
                ],
            },
            "06.ElasticSearch基本使用.md",
            "07.MongoDB基本使用.md",
            "分布式ID方案.md",
        ],
        
    },
];