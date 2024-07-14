# jvm
## jvm简介
JDK=JRE+工具集(java.exe、javac.exe...)
JRE=JVM+系统类库(lib:jar包)
jvm的作用:加载并执行Java字节码文件(.class)
java程序特点：跨平台性
**解决了跨平台性**
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718671391087-c48527dd-ed98-4d1f-8453-cd9c5f622efa.png#averageHue=%23fafafa&clientId=u17687d70-a353-4&from=paste&height=554&id=u00c6a973&originHeight=554&originWidth=1278&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49309&status=done&style=none&taskId=u44cfe7df-76da-4c26-92ff-2dae480d573&title=&width=1278)
<!-- ![](assets/image-20230615095211158.png#id=FFLmW&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) -->

## jvm架构
jvm的整体架构如下所示：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718672015625-5795781d-4de4-4923-ba70-dd001cd799e9.png#averageHue=%23939671&clientId=ubb4767a0-cc88-4&from=paste&height=626&id=u90b874d8&originHeight=626&originWidth=1118&originalType=binary&ratio=1&rotation=0&showTitle=false&size=140644&status=done&style=none&taskId=ueb907ee2-da0e-435d-8c93-13bd5fbb3f0&title=&width=1118)
 
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718672026573-73b90c85-fbe0-4726-a80f-d244c9ce8425.png#averageHue=%23eee5d8&clientId=ubb4767a0-cc88-4&from=paste&height=850&id=u5e1e0f70&originHeight=850&originWidth=1146&originalType=binary&ratio=1&rotation=0&showTitle=false&size=171742&status=done&style=none&taskId=ufb6800cd-8b43-480f-b05d-a19391b094d&title=&width=1146)
**在JVM中包含三部分，分别是：**
**功能区：类加载子系统、垃圾回收器、字节码执行引擎**
**线程私有区：栈(线程)、本地方法栈、程序计数器**
**线程共享区：方法区、堆、直接内存**


# 类加载器子系统
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718673409069-d54464b2-cedb-41a6-9178-cea534d7d436.png#averageHue=%238e9974&clientId=ubb4767a0-cc88-4&from=paste&height=196&id=u439f1784&originHeight=196&originWidth=1041&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46669&status=done&style=none&taskId=u38cea75c-87fc-4bbd-a30d-022efc1ba03&title=&width=1041)
加载：通过一个类的全限定名获取这个类所对应的二进制字节流，然后通过该二进制字节流将其加载到JVM中，并且为之创建一个Class对象
验证：为了确保Class文件字节流中包含的信息符合当前虚拟机的要求，并且不会危害虚拟机自身安全

分类:
1、启动类加载器（Bootstrap class loader）：它是虚拟机的内置类加载器，通过表示为null。负责加载Java核心类库，如rt.jar中的类、只加载包名为java、javax、sun等开头的类。启动类加载器是由C++实现的，不是一个Java类。
2、扩展类加载器（Extension|Platform Class Loader）(平台类加载器)：扩展类加载器负责加载Java的扩展类库，**位于JRE的lib/ext目录下的jar包。**在 Java 9 之后，由于模块化的引入，这个类加载器已经被废弃。平台类加载器负责加载 JDK 自带的模块。**这些模块通常位于 JDK 安装目录下的 jmods 文件夹中。**
3、应用程序类加载器（Application Class Loader）：也称为**系统类加载器**，它负责加载应用程序的类，即开发者自己编写的类。
4、自定义类加载器
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718707718025-0ce7822a-ff2d-4a6f-8393-e0d8cea86817.png#averageHue=%23faece2&clientId=uc0bbc4cf-357a-4&from=paste&height=281&id=u26e19ba1&originHeight=281&originWidth=1147&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47496&status=done&style=none&taskId=u5e1de75f-d1b8-4dce-a530-24a38113c39&title=&width=1147)
上述箭头是指类加载器之间的上下级关系，而不是继承关系，它们的继承体系如下所示：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718707736272-2167a389-c313-4c4c-8405-2a8520376fbf.png#averageHue=%23fdfbfb&clientId=uc0bbc4cf-357a-4&from=paste&height=428&id=ude48f066&originHeight=428&originWidth=1101&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75411&status=done&style=none&taskId=u748dbc80-7876-48d3-a952-89c6c025d9d&title=&width=1101)

## 双亲委托(派)机制
双亲委派模型的工作过程是：如果一个类加载器收到了类加载的请求，它首先不会自己尝试加载,而是返回给上级 
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718707804681-ad8eded8-9609-43b2-ab9e-742f429f88c9.png#averageHue=%23ebea96&clientId=uc0bbc4cf-357a-4&from=paste&height=1384&id=uddaa3bd9&originHeight=1384&originWidth=1503&originalType=binary&ratio=1&rotation=0&showTitle=false&size=261360&status=done&style=none&taskId=u8a3592cc-460f-4bfa-a16c-79327007634&title=&width=1503)

1、**避免重复加载**：当一个类需要被加载时，首先会委派给父类加载器进行加载。如果父类加载器能够找到并加载该类，就不会再由子类加载器重复加载，避免了重复加载同一个类的问题。
2、**确保类的唯一性**：通过双亲委派机制，类加载器在加载类时会按照一定的顺序进行查找和加载。这样可以确保同一个类在不同的类加载器中只会被加载一次，保证了类的唯一性。
3、**提高安全性**：双亲委派机制可以防止恶意代码通过自定义类加载器来替换核心类库中的类。因为在加载核心类库时，会优先委派给启动类加载器进行加载，而启动类加载器是由JVM提供的，具有较高的安全性，这种机制防止某些核心类库被恶意篡改等。

# 运行时数据区
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718707871662-23125cca-a015-4318-989f-9244d7a1cee2.png#averageHue=%2395a59a&clientId=uc0bbc4cf-357a-4&from=paste&height=218&id=u82acda44&originHeight=218&originWidth=1064&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45612&status=done&style=none&taskId=u95e59dbd-0b7e-4840-8df2-fa49ad83a0d&title=&width=1064)
## 程序计数器
属于线程私有区
作用：是一块较小的内存空间，存储的是当前线程所执行的**行号**
特点：**线程私有**空间 ，唯一一个**不会出现内存溢出**的内存空间
## 本地方法栈
与虚拟机栈作用相似。但它不是为Java方法服务的，而是本地方法，本地方法的实现一般都是通过c语言。由于规范对这块没有强制要求，不同虚拟机实现方法不同。
本地方法：**被native所修饰的方法**
```java
public class Object {
    
    public final native Class<?> getClass();		// 获取字节码文件对象的本地方法
    public native int hashCode();					// 获取对象hashCode值的本地方法
    ...
        
}
```
## 虚拟机栈  
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718797002629-1f193e6f-6df2-47b0-af14-952db973e06f.png#averageHue=%23fdfcfa&clientId=u6cad70b3-966f-4&from=paste&height=389&id=ucf8c3121&originHeight=389&originWidth=1053&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30143&status=done&style=none&taskId=udcca369f-5816-4d30-b3e5-077e020a83a&title=&width=1053)
JVM栈以栈帧（Stack Frame）为单位进行管理，每个栈帧对应一个方法的执行。当一个方法被调用时，JVM会为该方法创建一个新的栈帧，并将其推入当前线程的
JVM栈顶。当方法执行完毕或者遇到异常时，栈帧会被弹出，恢复到上一个栈帧的状态

### 栈帧详解
每个栈帧由三部分组成：局部变量表（Local Variable Table）、操作数栈（Operand Stack）、动态链接（Dynamic Linking）、方法出口
#### 局部变量表
作用： 存储方法参数和方法体内的局部变量：8种基本类型变量、对象引用（reference）。
#### 操作数栈
操作数栈（Operand Stack）：用于存储方法执行过程中的**操作数**。主要作为方法调用的中转站使用，用于存放方法执行过程中产生的**中间计算结果。另外，计算过程中产生的临时变量也会放在操作数栈中**
#### 动态链接
动态链接是指在方法调用过程中，将**符号引用（Symbolic Reference）解析为实际的方法或字段**。符号引用是一种用于表示方法或字段的符号名称，它与具体的内存地址没有直接关联。而**动态链接的作用就是将符号引用转换为实际的内存地址**，以便正确地执行方法调用。
当一个方法要调用其他方法，需要将常量池中指向方法的符号引用转化为其在内存地址中的直接引用。
![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718797230993-72319f3f-2dc8-4fc5-bf2a-55cf68233715.png#averageHue=%23d5d5d5&clientId=u6cad70b3-966f-4&from=paste&id=ue6a2a902&originHeight=569&originWidth=699&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9348e5cd-2b52-481e-99ab-ed0bc9ad090&title=)
#### 方法返回地址
方法返回地址存储的是调用该方法的**程序计数器的值**。
**作用：**可以知道调用完当前方法后，上一层方法接着做什么。
### StackOverflowError

JVM栈的大小是固定的【通常为1MB】，可以通过命令行参数【**-Xss**】进行调整。每个线程都有自己独立的JVM栈，用于支持线程的并发执行。**栈太小或者方法调用过深**，都将抛出StackOverflowError异常
### OutOfMemoryError：
如果栈的内存大小可以动态扩展， 如果虚拟机在动态扩展栈时无法申请到足够的内存空间，则抛出OutOfMemoryError异常。
## Java堆
Java虚拟机堆是Java内存区域中一块用来存放**对象**实例、数组、stringtable的区域，新创建的对象，数组都使用堆内存；【从Java7开始，常量池也会使用堆内存】
堆内存还可以继续进行细分，如下所示：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718708202152-991d6d14-8654-4d17-919e-b903c962af3f.png#averageHue=%23f5e7e6&clientId=uc0bbc4cf-357a-4&from=paste&height=186&id=ud71e2948&originHeight=186&originWidth=1268&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12136&status=done&style=none&taskId=u77917b5a-ca19-476b-8589-7c4fd6740ff&title=&width=1268)
说明：
1、新生代占整个堆内存的1/3、老年代占整个堆内存的2/3  1:2
2、新生代又可以细分为：伊甸园(Eden)、幸存区(from、to)，它们之间的比例默认情况下是8:1:1
survivor区:
survivor0区：From区
survivor1区：To区
**特点**：
1、被**线程共享**，因此需要考虑线程安全问题
2、会产生内存溢出问题


在默认情况下，Java虚拟机堆内存的初始大小为物理内存的1/64，并且最大可达物理内存的1/4。其中，新生代和老年代的初始比例通常是1:2，即新
生代占堆内存的1/3，老年代占堆内存的2/3

```shell
# pid表示的进程的id、可以使用jps命令查询对应的进程id
jmap -heap <pid>	#jdk8及以前使用

jhsdb jmap --heap --pid 16279 #新版本

# 也可以通过如下的jvm参数查看内存分配情况
-XX:+PrintGCDetails
```
### 堆内存大小设定
-XX:NewRatio
-XX:NewRatio参数：该参数用于设置老年代和新生代的初始比例。例如，-XX:NewRatio=2表示新生代占堆内存的1/3，老年代占堆内存的2/3。
-XX:SurvivorRatio
-XX:SurvivorRatio参数：该参数用于设置Eden区和Survivor区的初始比例。例如，-XX:SurvivorRatio=8表示Eden区占新生代的8/10，每个Survivor
区占新生代的1/10。
-Xss:栈
-Xms
设置堆的初始大小。例如，-Xms512m表示将堆的初始大小设置为512MB。
-Xmx
设置堆的最大大小。例如，-Xmx1024m表示将堆的最大大小设置为1GB。
-Xmn
设置新生代的大小。例如，-Xmn256m表示将新生代的大小设置为256MB。

## 方法区(元空间)
方法区是被所有**线程共享**。
方法区主要包含以下几个重要的组成部分：
1、类信息：方法区存储了加载的类的结构信息，包括类的名称、父类、接口、字段、方法等。这些信息在类加载过程中被加载到方法区，并且在运行
时被使用。
2、运行时常量池：每个类都有一个运行时常量池，它是方法区的一部分。运行时常量池用于存储编译期生成的各种字面量和符号引用。例如，字符串
常量、类和方法的符号引用等都存储在运行时常量池中。
3、即时编译器编译后的代码：当JVM将某段热点代码（HotSpot）识别出来后，会将其编译为机器码以提高执行效率。这些编译后的代码被存储在方
法区中。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718708454338-8d3b1170-3e74-495e-a430-5d6f1c34f447.png#averageHue=%23f8edeb&clientId=uc0bbc4cf-357a-4&from=paste&height=200&id=u523f93c7&originHeight=200&originWidth=1239&originalType=binary&ratio=1&rotation=0&showTitle=false&size=115040&status=done&style=none&taskId=uc8643a43-945d-48dc-b661-67ed3e6daac&title=&width=1239)

变化的原因：
1、提高内存的回收效率(方法区内存的回收效率远远低于堆内存，因为方法去中存储的都是类信息、运行时常量池这些信息不能被轻易回收)
2、字符串常量池在方法区，那么很容易产生内存溢出(因为方法区的垃圾回收效率比较低)

 
# 执行引擎
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718708500851-3f40387e-1f7f-4eff-a98a-77f1e2acefea.png#averageHue=%23f8e9e1&clientId=uc0bbc4cf-357a-4&from=paste&height=188&id=u81099ff0&originHeight=188&originWidth=1026&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21966&status=done&style=none&taskId=ud90a618d-49e8-434c-abc9-386eef04a46&title=&width=1026)
执行引擎主要包含以下几个重要的组成部分：
1、解释器（Interpreter）：解释器逐条解释字节码指令，并将其转换为对应的机器码进行执行。解释器的优点是实现简单、快速启动和适应性强，
但由于每次执行都需要解释字节码，因此执行效率相对较低。
2、即时编译器（Just-In-Time Compiler，JIT）：即时编译器将热点代码（HotSpot）从字节码直接编译成机器码，以提高执行效率。热点代码通
常是经过多次执行的代码块，即被频繁调用的方法或循环等。即时编译器可以根据运行时的情况进行优化，例如内联展开、方法内联、去除无用代码
等。JVM中常用的即时编译器有C1（Client Compiler）和C2（Server Compiler）。
3、垃圾回收器（Garbage Collector）：垃圾回收器负责自动回收不再使用的对象，并释放其占用的内存空间。执行引擎与垃圾回收器紧密合作，当执
行引擎发现某个对象不再被引用时，会通知垃圾回收器进行回收。垃圾回收器的工作涉及到堆内存的分配和释放，以及对象的标记、清除等操作。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718708521816-951b1d51-4cee-4f55-a955-5efe888e904e.png#averageHue=%23ebeae9&clientId=uc0bbc4cf-357a-4&from=paste&height=281&id=u74497d89&originHeight=281&originWidth=613&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18742&status=done&style=none&taskId=u681a7696-0b67-4a8a-b155-e0e0c588ee0&title=&width=613)
可通过代码测试：100万次调用：

## 垃圾对象判定
要进行垃圾回收，那么首先需要找出垃圾，如果判断一个对象是否为垃圾呢? 
两种算法：
1、引用计数法
2、可达性分析算法
### 引用计数法(Reference-Counting)
引用计数算法是通过判断对象的**引用数量**来决定对象是否可以被回收。
给对象中添加一个引用计数器，每当有一个地方引用它时，计数器值就加1；当引用失效时，计数器值就减1；任何时刻计数器为0的对象就是不可能再被使用的。
优点：
- 简单，高效，现在的objective-c、python等用的就是这种算法。
缺点：
- 引用和去引用伴随着加减算法，影响性能
- 很难处理循环引用，相互引用的两个对象则无法释放。
因此，目前主流的Java虚拟机都摒弃掉了这种算法
### 可达性分析算法(JVM中默认使用)
这个算法的基本思想，就是通过一系列的称为 **“GC Roots”** 的对象作为起点，从这些节点开始向下搜索，节点所走过的路径称为**引用链**，当一个对象到 GC Roots 没有任何引用链相连的话，则证明，此对象是不可用的。(类似于葡萄串)；
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718798020769-1c9296ab-00d4-4767-8dfd-52f303dd4d84.png#averageHue=%23fefefd&clientId=u6cad70b3-966f-4&from=paste&height=340&id=u84f438d3&originHeight=340&originWidth=1176&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65997&status=done&style=none&taskId=udd1a58d5-9ac7-48b7-8508-01f4830bd43&title=&width=1176)
在Java语言中，可以作为GC Roots的对象包括下面几种：
1、虚拟机栈（栈帧中的本地变量表）中的引用对象 ==> 正在运行的方法中的参数、局部变量等
2、方法区中的常量引用的对象 ==> 运行时常量池中的对象，例如程序中需要使用的类的类类型对象
3、本地方法栈中JNI（Native方法）的引用对象 ==> 正在运行的本地方法
4、Java虚拟机的内部引用 ==> 基本数据类型对应的Class对象，常驻异常对象（空指针、OOM等），系统类加载器
5、被同步锁synchronize持有的对象。
## 垃圾回收算法
### 标记清除(Mark-Sweep)
执行过程：首先标记出所有需要回收的对象，在标记完成后统一回收所有被标记的对象。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718798073371-2f118338-71c3-493c-884a-b8478c806de8.png#averageHue=%23f7f7f7&clientId=u6cad70b3-966f-4&from=paste&height=149&id=ud4b5d29e&originHeight=149&originWidth=1000&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19187&status=done&style=none&taskId=udf663d1f-39f9-4cea-84a1-f98fe6f74cc&title=&width=1000)
优点：速度比较快
缺点：会产生内存碎片，碎片过多，仍会使得连续空间少
### 标记整理(Mark-Compact)
执行过程：首先标记出所有需要回收的对象，在标记完成后统一进行整理，整理是指存活对象向一端移动来减少内存碎片，相对效率较低
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718798090412-462dd63f-9197-4664-99ce-780ee22fbc3f.png#averageHue=%23f7f7f7&clientId=u6cad70b3-966f-4&from=paste&height=149&id=u7b3e7d5d&originHeight=149&originWidth=1049&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21357&status=done&style=none&taskId=u6647f0cb-6420-4d9a-a22a-c96228d0102&title=&width=1049)
优点：无内存碎片
缺点：效率较低
### 复制算法(Copying)
执行过程：开辟两份大小相等空间，一份空间始终空着，垃圾回收时，将存活对象拷贝进入空闲空间；
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718798108805-a8b68786-b242-4034-860a-f9e886a1949e.png#averageHue=%23f8f8f7&clientId=u6cad70b3-966f-4&from=paste&height=164&id=uc9ebd89e&originHeight=164&originWidth=970&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22866&status=done&style=none&taskId=u4bd8c93a-87e8-47a0-8c53-2f9b503f68d&title=&width=970)
优点：无内存碎片
缺点：占用空间多
注意：如果有很多对象的存活率较高，这时我们采用复制算法，那么效率就比较低；
### 分代回收(Generational-Collection)
概述：根据对象存活周期的不同，将对象划分为几块，比如Java的堆内存，分为新生代和老年代，然后根据各个年代的特点采用最合适的算法；
新生代对象的存活的时间都比较短，因此使用的是【复制算法】；
而老年代对象存活的时间比较长那么采用的就是【标记清除】或者【标记整理】；
## 四种引用类型
### 强引用
Java中默认声明的就是强引用
**只要强引用存在，垃圾回收器将永远不会回收被引用的对象，哪怕内存不足时，JVM也会直接抛出OutOfMemoryError，不会去回收。**
### 软引用
**在内存足够的时候，软引用对象不会被回收，只有在内存不足时，系统则会回收软引用对象**
在 JDK1.2 之后，用java.lang.ref.**SoftReference**类来表示软引用。
### 弱引用
**无论内存是否足够，只要 JVM 开始进行垃圾回收，那些被弱引用关联的对象都会被回收**。
在 JDK1.2之后,用java.lang.ref.**WeakReference**来表示弱引用。
### 虚引用
虚引用是最弱的一种引用关系，如果一个对象仅持有虚引用，那么它就和没有任何引用一样，它随时可能会被回收，在 JDK1.2 之后，用 PhantomReference 类来表示，
## 垃圾收集器
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718708596962-915e141f-4dd1-4c8f-8ed2-870deb6dee7d.png#averageHue=%23f1d78b&clientId=uc0bbc4cf-357a-4&from=paste&height=508&id=u0cf02ffa&originHeight=508&originWidth=1358&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32632&status=done&style=none&taskId=u9afe3c41-436b-4496-ab92-0e6225b4a46&title=&width=1358)

 
# 本地方法接口/本地库
在Java虚拟机（JVM）中，本地方法接口（Native Method Interface，JNI）和本地库（Native Library）是用于与底层系统交互的机制。
本地方法接口（JNI）允许Java代码调用使用其他编程语言（如C、C++）编写的本地方法。这些本地方法是通过JNI接口定义的，并且在Java代码中
以**native**关键字声明。当Java代码调用本地方法时，JVM会将控制权转移到本地方法实现所在的本地库。

本地库是一个包含本地方法实现的动态链接库（DLL）或共享对象文件（SO）。它是使用其他编程语言编写的，通常是为了与底层操作系统或硬件进
行交互。本地库可以通过JNI加载到JVM中，并提供给Java代码调用。

使用本地方法接口和本地库，Java程序可以利用底层系统的功能和性能优势，例如访问硬件设备、调用操作系统特定的API、执行高性能计算等。同
时，本地方法也可以用于与现有的C/C++代码进行集成，以便重用现有的代码库。

# 线上问题定位
不同的问题【接口报错，RT超时、CPU飙高、OOM...】排查方案是一不一样的。


排查问题方式：直接排查**项目的运行日志**，tomcat的logs，找到运行日志或者项目目录logs文件夹，去分析运行日志，找到问题点，进行问题定位和分析，最后解决，更新源码，运维部署迭代。
如果是分布式系统关于日志的采集可能需要有一套完整的日志采集系统：Spring Boot Admin、ELK

没有报错、程序卡死这种问题参数的主要原因可能是CPU飙升、内存飙升、死锁等。
### CPU飙升问题排查
具体步骤如下所示：
1、通过top查看系统各种资源的占用情况，看看CPU占用是否过高
2、通过ps -ef | grep java查询指定的进程id
3、通过top -H -p pid查看指定进程中的线程信息(一个进程中有多个线程哦)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718798645003-ef61340d-4240-4b93-bfe2-8a24500be7d9.png#averageHue=%23141c23&clientId=ua7f2c372-f4a8-4&from=paste&height=182&id=ua58c62fd&originHeight=182&originWidth=1459&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22725&status=done&style=none&taskId=u0baa402d-bc11-4718-9aac-77b0be914de&title=&width=1459)
4、将线程的id的十进制数据转换成十六进制：printf "%x" tid
5、通过jstack -l pid查询进行中的线程nid(native thread id):
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718798664736-8ec477f9-0086-4da0-a7b5-3412709d3771.png#averageHue=%2310161c&clientId=ua7f2c372-f4a8-4&from=paste&height=502&id=u9d10b169&originHeight=502&originWidth=1737&originalType=binary&ratio=1&rotation=0&showTitle=false&size=69115&status=done&style=none&taskId=ufeaef963-0e83-46bf-a8d1-419041845f2&title=&width=1737)
### 死锁问题排查
**死锁**：线程死锁是指由于两个或者多个线程互相持有对方所需要的资源，导致这些线程处于等待状态，无法前往执
## OOM异常
# java内存分配
## 内存概况

JVM的运行时内存区域分为：方法区、堆、虚拟机栈、本地方法栈、程序计数器几大块。


| 区域名称 | 作用 |
| --- | --- |
| 程序计数器 | 程序计数器是CPU中的寄存器，它包含每一个线程下一条要执行的指令的地址 |
| 本地方法栈 | 当程序中调用了native的本地方法时，本地方法执行期间的内存区域 |
| 方法区 | 存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。 |
| 堆内存 | 存储对象（包括数组对象），new来创建的，都存储在堆内存。 |
| 虚拟机栈 | 用于存储正在执行的每个Java方法的局部变量表等。局部变量表存放了编译期可知长度的各种基本数据类型、对象引用，方法执行完，自动释放。 |


栈内存 [Stack] //动态的内存空间
作用 :
1. 给执行的方法提供运行空间的 //方法被调用进栈,方法调用完毕会立刻出栈
特点 : 先进后出 -> 弹夹
2. 局部变量[定义在方法内部的变量] : 存放在栈内存中 [在栈内存中的方法内]

堆内存 [heap] :
作用 :
1. 存对象的 [被new出来的东西]
new  : 1. 创建对象  2. 在堆内存中开辟空间
2. 在堆内存中开辟空间,堆内存会给这个空间一个唯一的地址值 //但是当对象被清理时此地址可以复用
3. 在堆内存中对象内部空间的数据是有默认值
整型 : 0, 浮点型 : 0.0,字符型 '\u0000' , 布尔型 : false , 引用数据类型 : null
4. 与栈内存立即回收不一样,堆内存中的对象不是立即回收 -> 等待Java中GC[垃圾回收]机制空闲时回收
5. 在JDK8版本,常量池搬到了 堆内存 //以前 常量池在 方法区

方法区 [method area] :
作用 :
1. 存储程序的字节码对象的 [字节码对象中有 此程序的目录(成员变量,成员方法来描述的)]
2. 常量池在方法区中 [JDK8版本之前]

本地方法区 [native method area]  : 给 Java 程序中的本地方法提供运行空间和存储空间的
本地方法 : 在Java程序中被 native 关键字修饰的方法

```
Java 语言 是根据 C语言 和 C++语言 升级得来的 ; --> Java的内核本质上 还是C语言 !    
    
本地方法的作用 : 用来和操作系统做深度交互的方法 //方法体内容不是Java代码
```

寄存器 : 和CPU进行交互的 -> 来处理程序中的运算

## 两个数组对象的内存图





## **两个对象的内存图**

Java对象保存在内存中时，由以下三部分组成：

- 对象头 
   - Mark Word：记录了和当前对象有关的GC、锁等信息。（后面再讲）
   - 指向类的指针：每一个对象需要记录它是由哪个类创建出来的，而Java对象的类数据保存在方法区，指向类的指针就是记录创建该对象的类数据在方法区的首地址。该指针在32位JVM中的长度是32bit，在64位JVM中长度是64bit。
   - 数组长度（只有数组对象才有）
- 实例数据 
   - 即实例变量的值
- 对齐填充 
   - 因为JVM要求Java对象占的内存大小应该是8bit的倍数，如果不满足该大小，则需要补齐至8bit的倍数，没有特别的功能。





## 实例变量的内存分析
# 从面试开始

1. 请谈谈你对JVM 的理解(谈谈JVM的内存模型)？为啥选择JDK17?
```java
1.性能提升
更好的垃圾回收器。综合评估，从 Java 8 升级到 Java 11，G1GC 平均速度提升 16.1%，ParallelGC 为 4.5%，从 Java 11 升级到 Java 17，G1GC 平均速度提升 8.66%，ParallelGC 为 6.54%, // 最大的亮点是带来了稳定版的 ZGC 垃圾回收器，达到亚毫秒级停顿、吞吐量也比较高。
2.Spring framework6 和 Spring Boot3 都默认使用 Java 17 作为最低版本
3.JDK17 相对于 JDK8 和 JDK11，所有垃圾回收器的性能都有很明显的提升，特别是稳定版的 ZGC 垃圾回收器、开启方式：-XX:+UseZGC
 
4.JDK14 开始删除 CMS 垃圾回收器,JDK14 开始弃用 ParallelScavenge 和 SerialOld GC 的组合使用

```

2. 什么是OOM ？什么是StackOverflowError？有哪些方法分析？java 内存快照 -jar 可执行jar包:
3. JVM 的常用参数调优你知道哪些？
4. 内存快照抓取和MAT分析DUMP文件知道吗？
5. 谈谈JVM中，对类加载器你的认识？
6. GC类型:3种:
7. 三大垃圾回收算法和垃圾回收器[G1、ZGC]

 
