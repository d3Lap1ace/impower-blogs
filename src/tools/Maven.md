## Maven依赖管理项目构建工具
### 一、Maven简介
#### 1.1  Maven介绍
[maven官方文档](https://maven.apache.org/what-is-maven.html)
`Maven` 是一款为 Java 项目构建、依赖管理的工具（软件），使用 `Maven` 可以自动化构建、测试、打包和发布项目，大大提高了开发效率和质量。
总结：Maven就是一个软件，掌握软件安装、配置、以及基本功能 **（项目构建、依赖管理）** 使用就是本课程的主要目标！
**场景1：** 例如我们项目需要第三方库（依赖），如Druid连接池、MySQL数据库驱动和Jackson等。那么我们可以将需要的依赖项的信息编写到Maven工程的配置文件，Maven软件就会自动下载并复制这些依赖项到项目中，也会自动下载依赖需要的依赖！确保依赖版本正确无冲突，依赖链路完整！
**场景2：** 完成项目开发后，想要将项目打成.war文件，并部署到服务器中运行，使用Maven软件，我们可以通过一行构建命令（mvn package）快速项目构建和大包！节省大量时间！

#### 1.2 Maven主要作用理解

1.  **依赖管理：**
Maven 可以管理项目的依赖，包括自动下载所需依赖库、自动下载依赖需要的依赖并且保证版本没有冲突、依赖版本管理等。通过 Maven，我们可以方便地维护项目所依赖的外部库，而我们仅仅需要编写配置即可。 
2.  **构建管理：**
项目构建是指将源代码、配置文件、资源文件等转化为能够运行或部署的应用程序或库的过程！
Maven 可以管理项目的编译、测试、打包、部署等构建过程。通过实现标准的构建生命周期，Maven 可以确保每一个构建过程都遵循同样的规则和最佳实践。同时，Maven 的插件机制也使得开发者可以对构建过程进行扩展和定制。主动触发构建，只需要简单的命令操作即可。
![](image/image_GT6G45QGRH.png#id=WvG6L&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 

#### 1.3 Maven软件工作原理模型图（了解）

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717907233219-13ce53f2-f6a2-43e4-94ee-620028c59687.png#averageHue=%23e2ecd6&clientId=u82be22a2-909c-4&from=paste&height=438&id=u92edc036&originHeight=438&originWidth=682&originalType=binary&ratio=1&rotation=0&showTitle=false&size=340710&status=done&style=none&taskId=uf7587550-4533-4f08-82cc-2cce5450eff&title=&width=682)

### 二、Maven安装和配置
#### 2.1 Maven安装

[Maven历届版本](https://maven.apache.org/docs/history.html)

选用版本：

| 发布时间 | maven版本 | jdk最低版本 |
| --- | --- | --- |
| 2023 - 03 -08 | **3.8.8** | Java 7 |

**安装条件：** maven需要本机安装java环境、必需包含java_home环境变量！
**软件安装：** 右键解压即可（绿色免安装）

#### 2.2 Maven环境配置

1.  **配置maven_home**
![](image/image_kVEGx5zFwc.png#id=u2P79&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
2.  **配置path**
![](image/image_vbBH3bdRH0.png#id=X3qZA&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
3.  **命令测试（cmd窗口）** 
```bash
mvn -v 
# 输出版本信息即可，如果错误，请仔细检查环境变量即可！
```
 
#### 2.3. Maven功能配置

> 我们需要需改**maven/conf/settings.xml**配置文件，来修改maven的一些默认配置。我们主要休要修改的有三个配置：1.依赖本地缓存位置（本地仓库位置）
>             2.maven下载镜像
>             3.maven选用编译项目的jdk版本！


1. 配置本地仓库地址
```xml
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
 <!-- conf/settings.xml 55行 -->
 <localRepository>D:\repository</localRepository>
```
 

2. 配置国内阿里镜像
```xml
<!--在mirrors节点(标签)下添加中央仓库镜像 160行附近-->
<mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```
 

3. 配置jdk17版本项目构建
```xml
<!--在profiles节点(标签)下添加jdk编译版本 268行附近-->
<profile>
    <id>jdk-17</id>
    <activation>
      <activeByDefault>true</activeByDefault>
      <jdk>17</jdk>
    </activation>
    <properties>
      <maven.compiler.source>17</maven.compiler.source>
      <maven.compiler.target>17</maven.compiler.target>
      <maven.compiler.compilerVersion>17</maven.compiler.compilerVersion>
    </properties>
</profile>
```
 

#### 2.4 IDEA配置本地Maven软件

> 我们需要将配置好的maven软件，配置到idea开发工具中即可！ 注意：idea工具默认自带maven配置软件，但是因为没有修改配置，建议替换成本地配置好的maven！


1.  **打开idea配置文件，构建工具配置**
依次点击
file / settings /  build /  build tool / maven  
2.  **选中本地maven软件**
3.  **测试是否配置成功**
**注意**：如果本地仓库地址不变化，只有一个原因，就是maven/conf/settings.xml配置文件编写错误！仔细检查即可！
![](image/image_5LTJ5x-1NL.png#id=GDzF4&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 

### 三、基于IDEA创建Maven工程
#### 3.1 梳理Maven工程GAVP属性
Maven工程相对之前的项目，多出一组gavp属性，gav需要我们在创建项目的时候指定，p有默认值，我们先行了解下这组属性的含义：
Maven 中的 GAVP 是指 GroupId、ArtifactId、Version、Packaging 等四个属性的缩写，其中前三个是必要的，而 Packaging 属性为可选项。这四个属性主要为每个项目在maven仓库总做一个标识，类似人的姓-名！有了具体标识，方便后期项目之间相互引用依赖等！
GAV遵循一下规则

- **GroupID 格式**：com.{公司/BU }.业务线.[子业务线]，最多 4 级。

说明：{公司/BU} 例如：alibaba/taobao/tmall/aliexpress 等 BU 一级；子业务线可选。

正例：com.taobao.tddl 或 com.alibaba.sourcing.multilang

-  **ArtifactID 格式**：产品线名-模块名。语义不重复不遗漏，先到仓库中心去查证一下。
正例：tc-client / uic-api / tair-tool / bookstore / xxx 
-  **Version版本号格式推荐**：主版本号.次版本号.修订号 
   -  主版本号：当做了不兼容的 API 修改，或者增加了能改变产品方向的新功能。 
   -  次版本号：当做了向下兼容的功能性新增（新增类、接口等）。 
   -  修订号：修复 bug，没有修改方法签名的功能加强，保持 API 兼容性。 

例如： 初始→1.0.0  修改bug → 1.0.1  功能调整 → 1.1.1等 

-  **Packaging定义规则：**
指示将项目打包为什么类型的文件，idea根据packaging值，识别maven项目类型！
packaging 属性为`jar`（默认值），代表普通的Java工程，打包以后是.jar结尾的文件。
packaging 属性为 `war`，代表Java的web工程，打包以后.war结尾的文件。
packaging 属性为 `pom`，代表不会打包，用来做继承的父工程。 


#### 3.4 Maven工程项目结构说明

Maven 是一个强大的构建工具，它提供一种标准化的项目结构，可以帮助开发者更容易地管理项目的依赖、构建、测试和发布等任务。以下是 Maven Web 程序的文件结构及每个文件的作用：

```xml
|-- pom.xml                               # Maven 项目管理文件 
|-- src
    |-- main                              # 项目主要代码
    |   |-- java                          # Java 源代码目录
    |   |   `-- com/example/myapp         # 开发者代码主目录
    |   |       |-- controller            # 存放 Controller 层代码的目录
    |   |       |-- service               # 存放 Service 层代码的目录
    |   |       |-- dao                   # 存放 DAO 层代码的目录
    |   |       `-- model                 # 存放数据模型的目录
    |   |-- resources                     # 资源目录，存放配置文件、静态资源等
    |   |   |-- log4j.properties          # 日志配置文件
    |   |   |-- spring-mybatis.xml        # Spring Mybatis 配置文件
    |   |   `-- static                    # 存放静态资源的目录
    |   |       |-- css                   # 存放 CSS 文件的目录
    |   |       |-- js                    # 存放 JavaScript 文件的目录
    |   |       `-- images                # 存放图片资源的目录
    |   `-- webapp                        # 存放 WEB 相关配置和资源
    |       |-- WEB-INF                   # 存放 WEB 应用配置文件
    |       |   |-- web.xml               # Web 应用的部署描述文件
    |       |   `-- classes               # 存放编译后的 class 文件
    |       `-- index.html                # Web 应用入口页面
    `-- test                              # 项目测试代码
        |-- java                          # 单元测试目录
        `-- resources                     # 测试资源目录
```

- pom.xml：Maven 项目管理文件，用于描述项目的依赖和构建配置等信息。
- src/main/java：存放项目的 Java 源代码。
- src/main/resources：存放项目的资源文件，如配置文件、静态资源等。
- src/main/webapp/WEB-INF：存放 Web 应用的配置文件。
- src/main/webapp/index.html：Web 应用的入口页面。
- src/test/java：存放项目的测试代码。
- src/test/resources：存放测试相关的资源文件，如测试配置文件等。

### 四、基于IDEA进行Maven工程构建

#### 4.1 构建概念和构建过程

项目构建是指将源代码、依赖库和资源文件等转换成可执行或可部署的应用程序的过程，在这个过程中包括编译源代码、链接依赖库、打包和部署等多个步骤。

项目构建是软件开发过程中至关重要的一部分，它能够大大提高软件开发效率，使得开发人员能够更加专注于应用程序的开发和维护，而不必关心应用程序的构建细节。

同时，项目构建还能够将多个开发人员的代码汇合到一起，并能够自动化项目的构建和部署，大大降低了项目的出错风险和提高开发效率。常见的构建工具包括 `Maven`、`Gradle`、`Ant`等。

![](image/image_IKTAEw9FuU.png#id=Rhwaf&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 4.2 命令方式项目构建
| 命令 | 描述 |
| --- | --- |
| mvn compile | 编译项目，生成target文件 |
| mvn package | 项目打包，在target文件夹中生成war/jar文件 |
| mvn clean | 清理编译或打包后的项目文件，删除target文件夹 |
| mvn install | 打包后上传到maven本地仓库(本地部署) |
| mvn deploy | 只打包，上传到maven私服仓库(私服部署) |
| mvn site | 生成站点 (报告) |
| mvn test | 执行测试源码 (测试) |


maven自带打包插件和jdk版本不匹配：pom.xml 添加以下代码即可

```xml
<build>
    <!-- jdk17和打war包和site插件版本插件不匹配 -->
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.2.2</version>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-site-plugin</artifactId>
            <version>3.9.1</version> <!-- 此处替换为你所需的版本号 -->
        </plugin>
    </plugins>
</build>
```

命令触发练习：

```bash
mvn 命令 命令

#清理
mvn clean
#清理，并重新打包
mvn clean package
#执行测试代码
mvn test
```

#### 4.3 可视化方式项目构建

![](image/image_Kq4H8zGur4.png#id=eg18o&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 4.4 构建插件、命令、生命周期命令之间关系

-  **构建生命周期**
我们发现一个情况！当我们执行package命令也会自动执行compile命令！ 
```xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ mybatis-base-curd ---
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ mybatis-base-curd ---
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ mybatis-base-curd ---
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ mybatis-base-curd ---
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ mybatis-base-curd ---
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ mybatis-base-curd ---
[INFO] Building jar: D:\javaprojects\backend-engineering\part03-mybatis\mybatis-base-curd\target\mybatis-base-curd-1.0-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  5.013 s
[INFO] Finished at: 2023-06-05T10:03:47+08:00
[INFO] ------------------------------------------------------------------------
```

这种行为就是因为构建生命周期产生的！构建生命周期可以理解成是一组固定构建命令的有序集合，触发周期后的命令，会自动触发周期前的命令！！！
**构建周期作用：会简化构建过程**
例如：项目打包   mvn clean package即可。 
主要三个构建生命周期： 

   -  **清理周期**：主要是对项目编译生成文件进行清理
包含命令：clean  
   -  **默认周期**：定义了真正构件时所需要执行的所有步骤，它是生命周期中最核心的部分
包含命令：compile -  test - package - install / deploy 
   -  **报告周期**
包含命令：site
打包: mvn clean package  本地仓库: mvn clean install 
-  **插件、命令、周期三者关系（了解）**
周期→包含若干命令→包含若干插件
使用周期命令构建，简化构建过程！
最终进行构建的是插件！ 

### 五、基于IDEA 进行Maven依赖管理

#### 5.1 依赖管理概念

Maven 依赖管理是 Maven 软件中最重要的功能之一。Maven 的依赖管理能够帮助开发人员自动解决软件包依赖问题，使得开发人员能够轻松地将其他开发人员开发的模块或第三方框架集成到自己的应用程序或模块中，避免出现版本冲突和依赖缺失等问题。

我们通过定义 POM 文件，Maven 能够自动解析项目的依赖关系，并通过 Maven **仓库自动**下载和管理依赖，从而避免了手动下载和管理依赖的繁琐工作和可能引发的版本冲突问题。

Maven 的**依赖管理**是 Maven 软件的一个核心功能之一，使得软件包依赖的管理和使用更加智能和方便，简化了开发过程中的工作，并提高了软件质量和可维护性。

#### 5.2 Maven工程核心信息配置和解读（GAVP）

位置：pom.xml

```xml
<!-- 模型版本 -->
<modelVersion>4.0.0</modelVersion>
<!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成， 如com.companyname.project-group，maven会将该项目打成的jar包放本地路径：/com/companyname/project-group -->
<groupId>com.companyname.project-group</groupId>
<!-- 项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->
<artifactId>project</artifactId>
<!-- 版本号 -->
<version>1.0.0</version>

<!--打包方式
    默认：jar
    jar指的是普通的java项目打包方式！ 项目打成jar包！
    war指的是web项目打包方式！项目打成war包！
    pom不会讲项目打包！这个项目作为父工程，被其他工程聚合或者继承！后面会讲解两个概念
-->
<packaging>jar/pom/war</packaging>
```

#### 5.3 Maven工程依赖管理配置

位置：pom.xml

**依赖管理和依赖添加**

```xml
<!-- 
   通过编写依赖jar包的gav必要属性，引入第三方依赖！
   scope属性是可选的，可以指定依赖生效范围！
   依赖信息查询方式：
      1. maven仓库信息官网 https://mvnrepository.com/
      2. mavensearch插件搜索
 -->
<dependencies>
    <!-- 引入具体的依赖包 -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
        <!--
            生效范围
            - compile ：main目录 test目录  运行打包 [默认]
            - provided：main目录 test目录  Servlet
            - runtime： 打包运行           MySQL
            - test:    test目录           junit
         -->
        <scope>runtime</scope>
    </dependency>

</dependencies>
```

**依赖版本统一提取和维护**

```xml
<!--声明版本-->
<properties>
  <!--命名随便,内部制定版本号即可！-->
  <junit.version>4.11</junit.version>
  <!-- 也可以通过 maven规定的固定的key，配置maven的参数！如下配置编码格式！-->
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
</properties>

<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <!--引用properties声明版本 -->
    <version>${junit.version}</version>
  </dependency>
</dependencies>
```

#### 5.4 Maven工程依赖下载失败错误解决（重点）

在使用 Maven 构建项目时，可能会发生依赖项下载错误的情况，主要原因有以下几种：

1. 下载依赖时出现网络故障或仓库服务器宕机等原因，导致无法连接至 Maven 仓库，从而无法下载依赖。
2. 依赖项的版本号或配置文件中的版本号错误，或者依赖项没有正确定义，导致 Maven 下载的依赖项与实际需要的不一致，从而引发错误。
3. 本地 Maven 仓库或缓存被污染或损坏，导致 Maven 无法正确地使用现有的依赖项。

解决方案：

1.  检查网络连接和 Maven 仓库服务器状态。 
2.  确保依赖项的版本号与项目对应的版本号匹配，并检查 POM 文件中的依赖项是否正确。 
3.  清除本地 Maven 仓库缓存（lastUpdated 文件），因为只要存在lastupdated缓存文件，刷新也不会重新下载。本地仓库中，根据依赖的gav属性依次向下查找文件夹，最终删除内部的文件，刷新重新下载即可！
例如： pom.xml依赖 
```xml
<dependency>
   <groupId>com.alibaba</groupId>
   <artifactId>druid</artifactId>
   <version>1.2.8</version>
</dependency>
```

文件：
![](image/image_fROsDreI3b.png#id=e7vUD&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 

#### 5.5 Maven工程Build构建配置

项目构建是指将源代码、依赖库和资源文件等转换成可执行或可部署的应用程序的过程，在这个过程中包括编译源代码、链接依赖库、打包和部署等多个步骤。

默认情况下，构建不需要额外配置，都有对应的缺省配置。当然了，我们也可以在pom.xml定制一些配置，来修改默认构建的行为和产物！

例如：

1. 指定构建打包文件的名称，非默认名称
2. 制定构建打包时，指定包含文件格式和排除文件
3. 打包插件版本过低，配置更高版本插件

构建配置是在`pom.xml / build`标签中指定！

**指定打包命名**

```xml
<!-- 默认的打包名称：artifactid+verson.打包方式 -->
<build>
  <finalName>定义打包名称</finalName>
</build>
```

**指定打包文件**

如果在java文件夹中添加java类，会自动打包编译到classes文件夹下！

但是在java文件夹中添加xml文件，默认不会被打包！

默认情况下，按照maven工程结构放置的文件会默认被编译和打包！

除此之外、我们可以使用resources标签，指定要打包资源的文件夹要把哪些静态资源打包到 classes根目录下！

```xml
<!--打包指定静态资源-->
<build>
<resources>
    <resource>
      <!-- 指定要打包资源的文件夹 要把哪些静态资源打包到 classes根目录下-->
      <directory>src/main/resources</directory>
      <includes>
        <include>**/*.xml</include>
        <include>**/*.properties</include>
      </includes>
    </resource>
    <resource>
      <directory>src/main/resources</directory>
      <excludes>
        <exclude>spring/*</exclude>
      </excludes>
      <includes>
        <include>*.xml</include>
        <!--<include>*/*.properties</include>-->
      </includes>
    </resource>
  </resources>
</build>
```

**配置依赖插件**

在 Maven 中，插件和依赖项是两个不同的概念。

**依赖**是指项目依赖的库或其他项目，Maven 使用依赖机制来自动管理项目的依赖关系！

**插件**是一种用于扩展 Maven 构建过程的工具。Maven 中有很多插件可以用来完成各种任务，例如编译、测试、打包、发布等等。

总体而言，依赖是项目所依赖的基本组件，而插件是用于扩展 Maven 构建过程的工具。在 pom.xml 文件中，依赖通常包含在 `<dependencies>` 元素中，而插件通常包含在 `<plugins>` 元素中。

常用的插件：修改构建插件版本、修改jdk版本、tomcat插件、mybatis逆向工程插件等等！

```xml
<build>
  <!-- jdk17 和 war包版本插件不匹配 -->
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.2.2</version>
        </plugin>
    </plugins>
</build>
```

### 六、Maven依赖传递和依赖冲突

#### 6.1 Maven依赖传递特性

假如有Maven项目A，项目B依赖A，项目C依赖B。那么我们可以说 C依赖A。也就是说，依赖的关系为：C—>B—>A， 那么我们执行项目C时，会自动把B、A都下载导入到C项目的jar包文件夹中，这就是依赖的传递性。

**传递的原则**

在 A 依赖 B，B 依赖 C 的前提下，C 是否能够传递到 A，取决于 B 依赖 C 时使用的依赖范围。

- B 依赖 C 时使用 compile 范围：可以传递
- B 依赖 C 时使用 test 或 provided 范围：不能传递，所以需要这样的 jar 包时，就必须在需要的地方明确配置依赖才可以。

**作用**

- 简化依赖导入过程
- 确保依赖版本正确

**依赖传递终止**

- 非compile范围进行依赖传递
- 依赖冲突（传递的依赖已经存在）

**案例：导入jackson依赖**

分析：jackson需要三个依赖

![](image/image_e1q3DS86cN.png#id=ZE7qG&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

依赖传递关系：data-bind中，依赖其他两个依赖

![](image/image_5o4rF-DTQC.png#id=VTsvI&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

最佳导入：直接可以导入data-bind，自动依赖传递需要的依赖

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.0</version>
</dependency>
```

#### 6.2 Maven依赖冲突特性

当直接引用或者间接引用出现了相同的jar包! 这时呢，一个项目就会出现相同的重复jar包，这就算作冲突！依赖冲突避免出现重复依赖，并且终止依赖传递！

![](image/image_M5ZFnUt-IH.png#id=AZShR&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

maven自动解决依赖冲突问题能力，会按照自己的原则，进行重复依赖选择。同时也提供了手动解决的冲突的方式，不过不推荐！

**解决依赖冲突（如何选择重复依赖）方式：**

1.  自动选择原则 
   -  短路优先原则（第一原则）
A—>B—>C—>D—>E—>X(version 0.0.1)
A—>F—>X(version 0.0.2)
则A依赖于X(version 0.0.2)。 
   -  依赖路径长度相同情况下，则“先声明优先”（第二原则）
A—>E—>X(version 0.0.1)
A—>F—>X(version 0.0.2)
在<depencies></depencies>中，先声明的，路径相同，会优先选择！ 
2.  手动排除 
```xml
<dependency>
  <groupId>com.atguigu.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>
  <scope>compile</scope>
  <!-- 使用excludes标签配置依赖的排除  -->
  <exclusions>
    <!-- 在exclude标签中配置一个具体的排除 -->
    <exclusion>
      <!-- 指定要排除的依赖的坐标（不需要写version） -->
      <groupId>commons-logging</groupId>
      <artifactId>commons-logging</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```
 

3.  小案例
伪代码如下： 
```xml
前提：
   A 1.1 -> B 1.1 -> C 1.1 
   F 2.2 -> B 2.2 
   
pom声明：
   F 2.2
   A 1.1 
   
   B 2.2
```

请问最终会导入哪些依赖和对应版本？ 

### 七、Maven工程继承和聚合关系

#### 7.1 Maven工程继承关系

1.  **继承概念**
Maven 继承是指在 Maven 的项目中，让一个项目从另一个项目中继承配置信息的机制。继承可以让我们在多个项目中共享同一配置信息，简化项目的管理和维护工作。
![](image/image_gwH0JhEm_p.png#id=Mhs4H&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
2.  **继承作用**
在父工程中统一管理项目中的依赖信息。
它的背景是： 
   - 对一个比较大型的项目进行了模块拆分。
   - 一个 project 下面，创建了很多个 module。
   - 每一个 module 都需要配置自己的依赖信息。
它背后的需求是：
   - 多个模块要使用同一个框架，它们应该是同一个版本，项目中使用的框架版本需要统一管理。
   - 使用框架时所需要的 jar 包组合（或者说依赖信息组合）需要经过长期摸索和反复调试，最终确定一个可用组合。这个耗费很大精力总结出来的方案不应该在新的项目中重新摸索。
通过在父工程中为整个项目维护依赖信息的组合既保证了整个项目使用规范、准确的 jar 包；又能够将以往的经验沉淀下来，节约时间和精力。
3.  **继承语法** 
   - 父工程
```xml
  <groupId>com.atguigu.maven</groupId>
  <artifactId>pro03-maven-parent</artifactId>
  <version>1.0-SNAPSHOT</version>
  <!-- 当前工程作为父工程，它要去管理子工程，所以打包方式必须是 pom -->
```
 
pom 
```
-   子工程
  ```xml
  <!-- 使用parent标签指定当前工程的父工程 -->
  <parent>
    <!-- 父工程的坐标 -->
    <groupId>com.atguigu.maven</groupId>
    <artifactId>pro03-maven-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
  </parent>
  
  <!-- 子工程的坐标 -->
  <!-- 如果子工程坐标中的groupId和version与父工程一致，那么可以省略 -->
  <!-- <groupId>com.atguigu.maven</groupId> -->
  <artifactId>pro04-maven-module</artifactId>
  <!-- <version>1.0-SNAPSHOT</version> -->
  ```
```

4.  **父工程依赖统一管理** 
   - 父工程声明版本
```xml
<!-- 使用dependencyManagement标签配置对依赖的管理 -->
<!-- 被管理的依赖并没有真正被引入到工程 -->
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-expression</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aop</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```
 

   - 子工程引用版本
```xml
<!-- 子工程引用父工程中的依赖信息时，可以把版本号去掉。  -->
<!-- 把版本号去掉就表示子工程中这个依赖的版本由父工程决定。 -->
<!-- 具体来说是由父工程的dependencyManagement来决定。 -->
<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
  </dependency>
</dependencies>
```
 

#### 7.2 Maven工程聚合关系

1.  **聚合概念**
Maven 聚合是指将多个项目组织到一个父级项目中，以便一起构建和管理的机制。聚合可以帮助我们更好地管理一组相关的子项目，同时简化它们的构建和部署过程。 
2.  **聚合作用** 
   1. 管理多个子项目：通过聚合，可以将多个子项目组织在一起，方便管理和维护。
   2. 构建和发布一组相关的项目：通过聚合，可以在一个命令中构建和发布多个相关的项目，简化了部署和维护工作。
   3. 优化构建**顺序**：通过聚合，可以对多个项目进行顺序控制，避免出现构建依赖混乱导致构建失败的情况。
   4. 统一管理依赖项：通过聚合，可以在父项目中管理公共依赖项和插件，避免重复定义。
3.  **聚合语法**
父项目中包含的子项目列表。 
```xml
<project>
  <groupId>com.example</groupId>
  <artifactId>parent-project</artifactId>
  <packaging>pom</packaging>
  <version>1.0.0</version>
  <modules>
    <module>child-project1</module>
    <module>child-project2</module>
  </modules>
</project>
```
 

4.  **聚合演示**
通过触发父工程构建命令、引发所有子模块构建！产生反应堆！
![](image/image_SoPELm6plB.png#id=l9enm&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 

### 八、了解Maven仓库之间的关系和优先级

Maven 仓库主要分为本地仓库（Local Repository）、中央仓库（Central Repository）和远程仓库（Remote Repository）三种类型。

1.  本地仓库
本地仓库是 Maven 在本地系统上创建的一个目录，用于存储本地构建的项目所需的所有依赖项和插件等。每个用户都有一个本地仓库，位于用户主目录下的 .m2 文件夹中。当 Maven 需要某个依赖项时，它会首先查找本地仓库中是否已经存在该依赖项的本地缓存，如果存在则直接使用，否则会向远程仓库请求下载。 
2.  中央仓库
中央仓库是 Maven 官方维护的仓库，包含了大量的开源项目和库的依赖项和插件等，是 Maven 构建时默认会访问的仓库。当本地仓库中不存在所需依赖项时，Maven 将尝试从中央仓库下载依赖项并缓存到本地仓库中。Maven 默认使用的是 Maven 官方的中央仓库，也可以使用其他公共或私有的中央仓库。 
3.  远程仓库
远程仓库通常由管理员或团队维护，用于共享内部项目的构件和依赖，或者作为第三方依赖库的备选源。Maven 会检查远程仓库中是否存在所需的依赖项，如果存在则下载并缓存到本地仓库中。远程仓库可以是私有的或公共的，也可以是 Maven 的其他仓库类型，如镜像仓库。
仓库的优先级顺序为：本地仓库 > 远程仓库 > 中央仓库。也就是说，如果本地仓库中已经存在所需依赖项，Maven 将直接使用本地仓库中的该依赖项，而不会再去远程仓库或中央仓库下载。 

总之，Maven 的仓库机制提供了依赖项和插件管理的核心支持，使得项目的构建和部署更加便捷和高效。理解和掌握 Maven 的仓库机制对于 Maven 的使用和开发至关重要。

![](image/image_YqByEvtQeC.png#id=BAe9p&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
