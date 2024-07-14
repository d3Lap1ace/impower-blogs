| **命令名称** | **作用*** |
| --- | --- |
| git config --global user.name 用户名 | 设置用户签名 |
| git config --global user.email 邮箱 | 设置用户邮箱 |
| git init | 初始化本地库 |
| git status | 查看本地库状态 |
| git add 文件名 | 添加到暂存区 |
| git commit -m "日志信息" 文件名 | 提交到本地库 |
| git reflog | 查看历史记录 |
| git reset --hard 版本号 | 版本穿梭 |
| git checkout -- <file> | 恢复到最近一次提交的状态。 |
| git reset HEAD <file> | 将暂存区的修改撤销，重新放回到工作区。 |
| git revert <commit> | 创建一个新的提交，将指定提交的修改撤销。 |

工作原理
Git将代码仓库视为一个存储所有文件历史记录的快照数据库，每次提交会创建一个新的快照，并记录一个指向该快照的指针。Git使用哈希算法来生成每个提交的唯一标识。Git还使用分支来支持并行开发，每个分支都是指向提交的指针。
