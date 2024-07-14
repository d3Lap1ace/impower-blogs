# spring
## ★ 什么是spring框架?
**我们一般说 Spring 框架指的都是 Spring Framework，它是很多模块的集合，使用这些模块可以很方便地协助我们进行开发，**比如说 Spring 支持 IoC 和 AOP可以很方便地对数据库进行访问、可以很方便地集成第三方组件、对单元测试支持比较好、支持 RESTful Java 应用程序的开发。
**Spring 最核心的思想就是不重新造轮子，开箱即用，提高开发效率**
## ★spring springMVC springboot 三者的区别
Spring 包含了多个功能模块 如ioc aop 很方便地集成第三方组件 
Spring MVC 是 Spring 中的一个很重要的模块，主要赋予 Spring 快速构建 MVC 架构的 Web 程序的能力。其核心思想是通过将业务逻辑、数据、显示分离来组织代码。
Spring Boot 只是简化了配置，
## ★什么是Spring Bean?
Bean 代指的就是那些被 IoC 容器所管理的对象。
IoC 容器帮助我们管理哪些对象，这个是通过配置元数据来定义的。配置元数据可以是 XML 文件、注解或者 Java 配置类。
![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717914746265-9a5c0243-3c3f-4b5d-be07-044b57478ebd.png#averageHue=%23f7f7f7&clientId=ua3c3e75b-72ea-4&from=paste&id=ub20b571c&originHeight=296&originWidth=498&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u38747b38-0d89-4ca0-befc-67744b32164&title=)
## ★IoC concept
### ★控制反转（IoC）

-  控制反转是一种思想。 
-  控制反转是为了降低程序耦合度，提高程序扩展力。 
-  控制反转，反转的是什么？ 
   - 将对象的创建权利交出去，交给第三方容器负责。
   - 将对象和对象之间关系的维护权交出去，交给第三方容器负责。
-  控制反转这种思想如何实现呢？ 
   - DI（Dependency Injection）：依赖注入

IoC 容器就像是一个工厂一样，当我们需要创建一个对象的时候，只需要配置好配置文件/注解即可，
### ★依赖注入(DI)
DI（Dependency Injection）：依赖注入，依赖注入实现了控制反转的思想。

- **指Spring创建对象的过程中，将对象依赖属性通过配置进行注入**

依赖注入常见的实现方式包括两种：

- 第一种：set注入
- 第二种：构造注入

结论：IOC 就是一种控制反转的思想， 而 DI 是对IoC的一种具体实现。

●谁依赖于谁：当然是**应用程序依赖于IoC容器**；
●为什么需要依赖：**应用程序需要IoC容器来提供对象需要的外部资源**；
●谁注入谁：很明显是**IoC容器注入应用程序某个对象，应用程序依赖的对象**；
●注入了什么：就是**注入某个对象所需要的外部资源（包括对象、资源、常量数据）**

**IoC的一个重点是在系统运行中，动态的向某个对象提供它所需要的其他对象。这一点是通过DI（Dependency Injection，依赖注入）来实现的**。比如对象A需要操作数据库，以前我们总是要在A中自己编写代码来获得一个Connection对象，有了 spring我们就只需要告诉spring，A中需要一个Connection，至于这个Connection怎么构造，何时构造，A不需要知道。在系统运行时，spring会在适当的时候制造一个Connection，然后像打针一样，注射到A当中，这样就完成了对各个对象之间关系的控制。A需要依赖 Connection才能正常运行，而这个Connection是由spring注入到A中的，依赖注入的名字就这么来的。那么DI是如何实现的呢？ Java 1.3之后一个重要特征是反射（reflection），它允许程序在运行的时候动态的生成对象、执行对象的方法、改变对象的属性，spring就是通过反射来实现注入的。


**Bean管理说的是：Bean对象的创建，以及Bean对象中属性的赋值（或者叫做Bean对象之间关系的维护）。**
**bean的高级工厂:**

| 类型名 | 简介 |
| --- | --- |
| ClassPathXmlApplicationContext | 通过读取类路径下的 XML 格式的配置文件创建 IOC 容器对象 |
| FileSystemXmlApplicationContext | 通过文件系统路径读取 XML 格式的配置文件创建 IOC 容器对象 |
| ConfigurableApplicationContext | ApplicationContext 的子接口，包含一些扩展方法 refresh() 和 close() ，让 ApplicationContext 具有启动、关闭和刷新上下文的能力。 |
| WebApplicationContext | 专门为 Web 应用准备，基于 Web 环境创建 IOC 容器对象，并将对象引入存入 ServletContext 域中。 |

## ★spring中单例bean是线程安全麽
不是线程安全  
spring中的bean一般都是无状态的对象,没有线程安全的问题,如果在bean中定义了可修改的成员变量,是线程不安全的
## Spring IoC / DI
### xml实现方式
#### import dependency
```xml
<dependencies>
    <!--spring context依赖-->
    <!--Spring Context依赖之后，表示将Spring的基础依赖引入了
         ioc/di = spring-context [spring-beans spring-core spring-expression]
    -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>6.0.6</version>
    </dependency>

    <!--junit5测试-->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.3.1</version>
    </dependency>
</dependencies>
```
#### pojo

---

#### xml configuration
文件：resources/spring-bean-01.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 此处要添加一些约束，配置文件的标签并不是随意命名 -->
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    https://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <!-- 引入外部属性文件 -->
	<context:property-placeholder location="classpath:jdbc.properties"/>

  <!-- 实验一 [重要]创建bean -->
  <bean id="happyComponent" class="com.spring.ioc.HappyComponent"/>
  

  <!-- 实验三 [重要]给bean的属性赋值：setter注入 -->
  <bean id="happyComponent3" class="com.spring.ioc.HappyComponent">
    
    <!-- property标签：通过组件类的setXxx()方法给组件对象设置属性 -->
    <!-- name属性：指定属性名（这个属性名是getXxx()、setXxx()方法定义的，和成员变量无关） -->
    <!-- value属性：指定属性值 -->
    <!-- ref 属性：通过 bean 的 id 引用另一个 bean -->
    <property name="componentName" value="veryHappy"/>
  </bean>
  
  <bean id="..." [1] class="..." [2]>  
    <!-- collaborators and configuration for this bean go here -->
  </bean>

  <bean id="..." class="...">
    <!-- collaborators and configuration for this bean go here -->
  </bean>
  <!-- more bean definitions go here -->
    
    <!--
       一个bean就是一个组件对象
          id是组件对象的标识,为了后期获取组件对象, id不能重复
          class创建组件对象的类的全限定符(反射),要求你的类有无参数构造函数![不限制访问修饰符]
    -->
    
</beans>
```

#### **使用容器,获取Bean**

`ApplicationContext` 是一个高级工厂的接口，能够维护不同 bean 及其依赖项的注册表。通过使用方法 `T getBean(String name, Class<T> requiredType)` ，您可以检索 bean 的实例。

```java
//创建ioc容器对象，指定配置文件，ioc也开始实例组件对象
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
//获取ioc容器的组件对象
PetStoreService service = context.getBean("petStore", PetStoreService.class);
//使用组件对象
List<String> userList = service.getUsernameList();
```

#### summary

1. 声明bean，不分先后顺序，spring容器内部有缓存机制，先实例化后属性赋值！
2. ref 容易错写成value,会抛出Caused by: java.lang.IllegalStateException: Cannot convert value of type 'java.lang.String' to required type 异常！
3. 只有声明到ioc容器，方可被其他bean引用！
4. 会调用无参构造
5. 必须配置set方法,属性设置,ioc容器是通过set方法调用,进行属性赋值!!!

    


#### 工厂特性 FactoryBean特性
`FactoryBean` 接口是Spring IoC容器实例化逻辑的可插拔性点。

用于配置复杂的Bean对象，可以将创建过程存储在`FactoryBean` 的getObject方法！

`FactoryBean<T>` 接口提供三种方法：

-  `T getObject()`: 
返回此工厂创建的对象的实例。该返回值会被存储到IoC容器！ 
-  `boolean isSingleton()`: 
如果此 `FactoryBean` 返回单例，则返回 `true` ，否则返回 `false` 。此方法的默认实现返回 `true` （注意，lombok插件使用，可能影响效果）。 
-  `Class<?> getObjectType()`: 返回 `getObject()` 方法返回的对象类型，如果事先不知道类型，则返回 `null` 。
![](image/image_7avKHyEa0d.png#id=ChVda&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717915280098-8210f541-0e35-4cff-a9ad-0d1087cf6d6b.png#averageHue=%23efefef&clientId=ua3c3e75b-72ea-4&from=paste&height=319&id=ue4584b0e&originHeight=319&originWidth=501&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18054&status=done&style=none&taskId=u965a543b-8ae5-422a-8fed-5a6959f10c0&title=&width=501)

实体类
```java
// 实现FactoryBean接口时需要指定泛型
// 泛型类型就是当前工厂要生产的对象的类型
public class HappyFactoryBean implements FactoryBean<HappyMachine> {
    
    private String machineName;
    
    public String getMachineName() {
        return machineName;
    }
    
    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }
    
    @Override
    public HappyMachine getObject() throws Exception {
    
        // 方法内部模拟创建、设置一个对象的复杂过程
        HappyMachine happyMachine = new HappyMachine();
    
        happyMachine.setMachineName(this.machineName);
    
        return happyMachine;
    }
    
    @Override
    public Class<?> getObjectType() {
    
        // 返回要生产的对象的类型
        return HappyMachine.class;
    }
}
```
xml
```xml
<bean id="happyFactoryBean" class="com.spring.xml.ioc03.HappyFactoryBean">
        <property name="machineName" value="iceCreamMachine"/>
</bean>
```
test
```java
@Test
    public void test_04(){
        ApplicationContext ac = new ClassPathXmlApplicationContext("springIoc01.xml");
        HappyFactoryBean happyFactoryBean = ac.getBean("happyFactoryBean", HappyFactoryBean.class);
        System.out.println("happyFactoryBean = " + happyFactoryBean);

		//如果想要获取FactoryBean对象, 直接在id前添加&符号即可!  &happyMachine7 这是一种固定的约束
        Object bean = ac.getBean("&happyFactoryBean");
        System.out.println("bean = " + bean);
    }
```

**FactoryBean和BeanFactory区别**
**FactoryBean**是 Spring 中一种特殊的 bean，可以在 getObject() 工厂方法自定义的逻辑创建Bean！是一种能够生产其他 Bean 的 Bean。FactoryBean 在容器启动时被创建，而在实际使用时则是通过调用 getObject() 方法来得到其所生产的 Bean。因此，FactoryBean 可以自定义任何所需的初始化逻辑，生产出一些定制化的 bean。

一般情况下，整合第三方框架，都是通过定义FactoryBean实现！！！

**BeanFactory** 是 Spring 框架的基础，其作为一个顶级接口定义了容器的基本行为，例如管理 bean 的生命周期、配置文件的加载和解析、bean 的装配和依赖注入等。BeanFactory 接口提供了访问 bean 的方式，例如 getBean() 方法获取指定的 bean 实例。它可以从不同的来源（例如 Mysql 数据库、XML 文件、Java 配置类等）获取 bean 定义，并将其转换为 bean 实例。同时，BeanFactory 还包含很多子类（例如，ApplicationContext 接口）提供了额外的强大功能。

总的来说，FactoryBean 和 BeanFactory 的区别主要在于前者是用于创建 bean 的接口，它提供了更加灵活的初始化定制功能，而后者是用于管理 bean 的框架基础接口，提供了基本的容器功能和 bean 生命周期管理。



#### 作用域
```xml
<!--bean的作用域 -->
<!-- scope属性：取值singleton（默认值），bean在IOC容器中只有一个实例，IOC容器初始化时创建对象 -->
<!-- scope属性：取值prototype，bean在IOC容器中可以有多个实例，getBean()时创建对象 -->
<bean id="happyMachine8" scope="prototype" class="com.spring.ioc.HappyMachine">
    <property name="machineName" value="happyMachine"/>
</bean>
<bean id="happyComponent8" scope="singleton" class="com.spring.ioc.HappyComponent">
    <property name="componentName" value="happyComponent"/>
</bean>
```
如果是在WebApplicationContext环境下还会有另外两个作用域（但不常用）：

| 取值 | 含义 | 创建对象的时机 | 默认值 |
| --- | --- | --- | --- |
| request | 请求范围内有效的实例 | 每次请求 | 否 |
| session | 会话范围内有效的实例 | 每次会话 | 否 |


#### ★生命周期

1.  
   1. **阶段一：加载Bean定义**： 
      - Spring容器读取`XML文件`或其`他配置文件`，解析配置信息。
      - 将解析后的配置信息转换为Spring内部数据结构（`BeanDefinition`对象）。
      - 存储`BeanDefinition`对象，待进行组件实例化。
   2. **阶段二：实例化Bean组件**： 
      - 根据`BeanDefinition`中的信息，实例化Bean对象。
      - 如果有依赖其他Bean的情况，先实例化被依赖的Bean。
      - 此步骤单纯实例化Bean和依赖的Bean组件，不会进行属性赋值。
2.  **阶段三：设置Bean属性**：
- Spring容器将根据`BeanDefinition`中的配置，通过setter方法或字段直接注入属性值。 
   - Spring容器属性和实例化过程是分离的，所有在配置的时候，组件声明和引用不分先后顺序。
   4. **阶段四：调用Bean的初始化方法**： 
      - 如果Bean实现了`InitializingBean`接口，Spring将调用其`afterPropertiesSet()`方法。
      - 如果在XML配置中定义了`init-method`，则执行该方法。
      - 如果Bean使用了`@PostConstruct`注解，则执行被注解的方法。
      - 此阶段调用自定义初始化方法，可以进行相关的初始化工作，类似： `Servlet`的`init`方法。
   5. **阶段五：Bean可以使用**： 
      - 此时Bean已经初始化完成，可以被其他Bean引用或者容器直接使用。
   6. **阶段六：调用Bean的销毁方法阶段**（仅适用于单例Bean）： 
      - 如果Bean实现了`DisposableBean`接口，Spring将调用其`destroy()`方法。
      - 如果在XML配置中定义了`destroy-method`，则执行该方法。
      - 如果Bean使用了`@PreDestroy`注解，则在销毁之前执行被注解的方法。
      - 此阶段调用自定义销毁方法，可以进行相关的初始化工作，类似： `Servlet`的`destroy`方法。

![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717916985039-8212fbc7-e0cf-41ed-9db9-b79c7cc93b3d.png#averageHue=%23f8f8f8&clientId=ua3c3e75b-72ea-4&from=paste&id=u4fd3d2f1&originHeight=2563&originWidth=5969&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud5c519b0-e497-4ad7-8bd4-ba8ab775c0c&title=)
### 注解实现
#### import dependency
```xml
<dependencies>
    <!--spring context依赖-->
    <!--当你引入Spring Context依赖之后，表示将Spring的基础依赖引入了-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>6.0.6</version>
    </dependency>

    <!--junit5测试-->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.3.1</version>
    </dependency>
</dependencies>
```
#### pojo/service/controller
```java
@Controller
public class UserController {

    private UserService userService;


    public  UserController( @Autowired UserService userService) {
        this.userService = userService;
        System.out.println("controller无参构造...........");
    }

    public void controllerPrint() {
        userService.servicePrint();
        System.out.println("Controller............");
    }
}
```
#### xml configruation
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">


	  <!-- 引入外部属性文件 -->
	<context:property-placeholder location="classpath:jdbc.properties"/>

	<!-- 配置自动扫描的包 -->
	<!-- 1.包要精准,提高性能!
		 2.会扫描指定的包和子包内容
		 3.多个包可以使用,分割 例如: com.spring.controller,com.spring.service等
	-->
	<context:component-scan base-package="com.spring.components">

		<!-- context:exclude-filter标签：指定排除规则 -->
		<!-- type属性：指定根据什么来进行排除，annotation取值表示根据注解来排除 -->
		<!-- expression属性：指定排除规则的表达式，对于注解来说指定全类名即可 -->
	<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
	</context:component-scan>



	<!-- 仅扫描 = 关闭默认规则 + 追加规则 -->
	<!-- use-default-filters属性：取值false表示关闭默认扫描规则 -->
	<context:component-scan base-package="com.spring.ioc.components" use-default-filters="false">
	<!-- context:include-filter标签：指定在原有扫描规则的基础上追加的规则 -->
	<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
	</context:component-scan>


</beans>
```
#### Test Class
```java
@SpringJUnitConfig(springTest.class)
public class springTest {
    private Logger logger = LoggerFactory.getLogger(springTest.class);
    @Test
    public void test_01(){
        ApplicationContext context = new ClassPathXmlApplicationContext("springconfig.xml");
        UserController userController = context.getBean("userController", UserController.class);
        userController.controllerPrint();
        logger.info("执行成功");
    }
}
```
| 注解 | 说明 | 
 | 
 | 
 |
| --- | --- | --- | --- | --- |
| [@Component ](/Component ) | 该注解用于描述 Spring 中的 Bean，它是一个泛化的概念，仅仅表示容器中的一个组件（Bean），并且可以作用在应用的任何层次，例如 Service 层、Dao 层等。 使用时只需将该注解标注在相应类上即可。 | 
 | 
 | 
 |
| [@Repository ](/Repository ) | 该注解用于将数据访问层（Dao 层）的类标识为 Spring 中的 Bean，其功能与 [@Component ](/Component )
 相同。  | 
 | 
 | 
 |
| [@Service ](/Service ) | 该注解通常作用在业务层（Service 层），用于将业务层的类标识为 Spring 中的 Bean，其功能与 [@Component ](/Component )
 相同。  | 
 | 
 | 
 |
| [@Controller ](/Controller ) | 该注解通常作用在控制层（如SpringMVC 的 Controller），用于将控制层的类标识为 Spring 中的 Bean，其功能与 [@Component ](/Component )
 相同。  | 
 | 
 | 
 |


**总结**

1. 注解方式IoC只是标记哪些类要被Spring管理
2. 最终，我们还需要XML方式或者后面讲解Java配置类方式指定注解生效的包
3. **现阶段配置方式为 注解 （标记）+ XML（扫描）**

#### [@Autowired ](/Autowired ) 

get/set  constructor method args property

#### [@Qualifier ](/Qualifier ) 

根据 [@Autowired ](/Autowired ) 标记位置成员变量的变量名作为 bean 的 id 进行匹配 

```java
@Controller(value = "xxxx")
public class SoldierController {
   
    @Autowired
    @Qualifier(value = "maomiService222")
    // 根据面向接口编程思想，使用接口类型引入Service组件
    private ISoldierService soldierService;
```

#### @Resource注入

##### ★@Resource @Autowired注解有什么区别？

- @Resource注解是JDK扩展包中的，也就是说属于JDK的一部分。所以该注解是标准注解，更加具有通用性。(JSR-250标准中制定的注解类型。JSR是Java规范提案。)
- @Autowired注解是Spring框架自己的。
- **@Resource注解默认根据名称装配byName，未指定name时，使用属性名作为name。通过name找不到的话会自动启动通过类型byType装配。**
- **@Autowired注解默认根据类型装配byType，如果想根据名称装配，需要配合@Qualifier注解一起用。**
- @Resource注解用在属性上、setter方法上。
- @Autowired注解用在属性上、setter方法上、构造方法上、构造方法参数上。

@Resource注解属于JDK扩展包，所以不在JDK当中，需要额外引入以下依赖：【**如果是JDK8的话不需要额外引入依赖。高于JDK11或低于JDK8需要引入以下依赖。**】

#### [@Value ](/Value ) 

通常用于注入外部化属性

声明外部配置**

application.properties

```properties
catalog.name=MovieCatalog
```

**xml引入外部配置**

```xml
<!-- 引入外部配置文件-->
<context:property-placeholder location="application.properties" />
```

**@Value注解读取配置**

```java
package com.spring.components;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * projectName: com.spring.components
 *
 * description: 普通的组件
 */
@Component
public class CommonComponent {

    /**
     * 情况1: ${key} 取外部配置key对应的值!
     * 情况2: ${key:defaultValue} 没有key,可以给与默认值
     */
    @Value("${catalog:默认值}")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

### 配置类实现

全注解开发就是不再使用spring配置文件了，写一个配置类来代替配置文件。

```java
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

//标注当前类是配置类，替代application.xml    
@Configuration
//使用注解读取外部配置，替代 <context:property-placeholder标签
@PropertySource("classpath:application.properties")
//使用@ComponentScan注解,可以配置扫描包,替代<context:component-scan标签
@ComponentScan(basePackages = {"com.spring.components"})
public class MyConfiguration {
    
}
```

**总结：**

@Configuration指定一个类为配置类，可以添加配置注解，替代配置xml文件

[@ComponentScan(basePackages ](/ComponentScan(basePackages ) = {"包","包"}) 替代<context:component-scan标签实现注解扫描 

@PropertySource("classpath:配置文件地址") 替代 <context:property-placeholder标签

配合IoC/DI注解，可以进行完整注解开发！

#### [@Bean ](/Bean ) 
`@Bean` 注释用于指示方法实例化、配置和初始化要由 Spring IoC 容器管理的新对象。
需求分析: 第三方jar包的类，添加到ioc容器，无法使用@Component等相关注解！因为源码jar包内容为只读模式！
```java
//标注当前类是配置类，替代application.xml    
@Configuration
//引入jdbc.properties文件
@PropertySource({"classpath:application.properties","classpath:jdbc.properties"})
@ComponentScan(basePackages = {"com.spring.components"})
public class MyConfiguration {

    //如果第三方类进行IoC管理,无法直接使用@Component相关注解
    //解决方案: xml方式可以使用<bean标签
    //解决方案: 配置类方式,可以使用方法返回值+@Bean注解
    @Bean
    public DataSource createDataSource(@Value("${jdbc.user}") String username,
                                       @Value("${jdbc.password}")String password,
                                       @Value("${jdbc.url}")String url,
                                       @Value("${jdbc.driver}")String driverClassName){
        //使用Java代码实例化
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setUrl(url);
        dataSource.setDriverClassName(driverClassName);
        //返回结果即可
        return dataSource;
    }
}
```

##### @bean的高级特性

```java
/**
 *
 * @Bean的细节讨论:
 *    1. @Bean方法必须加入到配置类中,可以制造[第三方对象]和自己的对象加入到ioc容器
 *    2. @Bean制造对象的命名问题 默认: 方法名(ergouzi) 指定命名: @Bean(name | value="指定名称')
 *    3. @Bean制造的对象指定初始化和销毁方法 [1.接口 2.@Bean(initMethod="" , destroyMethod="" ) 3.注解 ]
 *    4. @Bean制造对象是单例还是多例 默认： 单例  |  @Scope [类 @Component..|方法 @Bean] @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
 *    5. @Bean方法想要引入其他的组件对象怎么办
 *       方案1： 另一个组件再全局注入，@Bean方法中引入全局变量即可~ 【不推荐】
 *       方案2： 专属@Bean的组件，只需要在@Bean的方法的行程列表传入即可 【写道形参列表，ioc容器就会自动查找和注入】
 *       注意： 形参列表不能瞎写 基本数据类型必须+@Value
 *                              引用类型必须ioc容器中有对应的组件
 *       注意： 注入类性有多个组件对象 （类型 变量名=其中一个组件的名字）
 *
 *
 */
@Bean("dataSource")//@Bean -> ioc容器会自动调用此方法,将返回值存储到ioc容器中!
public DataSource ergouzi(@Value("${jdbc.url}") String url,
                          @Value("${jdbc.driver}")String driver,
                          @Value("${jdbc.username}") String username,
                          @Value("${jdbc.password}")String password){
    DruidDataSource dataSource = new DruidDataSource();
    dataSource.setUrl(url);
    dataSource.setDriverClassName(driver);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    return dataSource;
}


@Conditional(MyCondition.class) //条件化注入
// @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Bean(initMethod = "init",destroyMethod = "destroy")
public A a(I c){
    A a = new A();
    a.setB(c);
    return a;
}
```
#####  ★component 和 Bean的区别

- @Component 注解作用于类，而@Bean注解作用于方法。
- @Component通常是通过类路径扫描来自动侦测以及自动装配到 Spring 容器中（我们可以使用 @ComponentScan 注解定义要扫描的路径从中找出标识了需要装配的类自动装配到 Spring 的 bean 容器中）。@Bean 注解通常是我们在标有该注解的方法中定义产生这个 bean,@Bean告诉了 Spring 这是某个类的实例，当我需要用它的时候还给我。
- @Bean 注解比 @Component 注解的自定义性更强，而且很多地方我们只能通过 @Bean 注解来注册 bean。比如当我们引用第三方库中的类需要装配到 Spring容器时，则只能通过 @Bean来实现。
#### [@Import ](/Import ) 

`@Import` 注释允许从另一个配置类加载 `@Bean` 定义，如以下示例所示：

```java
@Configuration
public class ConfigA {

  @Bean
  public A a() {
    return new A();
  }
}

@Configuration
@Import(ConfigA.class) //类也是写死
public class ConfigB {

  @Bean
  public B b() {
    return new B();
  }
}
```

#### [@Conditional ](/Conditional ) 

能够根据一定的条件进行判断，满足条件就给容器注入bean。

```java
@Conditional(MyCondition.class) //条件化注入
```

### 三种配置方式总结

#### XML方式配置总结

1. 所有内容写到xml格式配置文件中
2. 声明bean通过<bean标签
3. <bean标签包含基本信息（id,class）和属性信息 <property name value / ref
4. 引入外部的properties文件可以通过<context:property-placeholder
5. IoC具体容器实现选择ClassPathXmlApplicationContext对象

#### XML+注解方式配置总结

1. 注解负责标记IoC的类和进行属性装配
2. xml文件依然需要，需要通过<context:component-scan标签指定注解范围
3. 标记IoC注解：@Component,@Service,@Controller,[@Repository ](/Repository ) 
4. 标记DI注解：[@Autowired ](/Autowired ) [@Qualifier ](/Qualifier ) [@Resource ](/Resource ) [@Value ](/Value ) 
5. IoC具体容器实现选择ClassPathXmlApplicationContext对象

#### 完全注解方式配置总结

1. 完全注解方式指的是去掉xml文件，使用配置类 + 注解实现
2. xml文件替换成使用@Configuration注解标记的类
3. 标记IoC注解：@Component,@Service,@Controller,[@Repository ](/Repository ) 
4. 标记DI注解：[@Autowired ](/Autowired ) [@Qualifier ](/Qualifier ) [@Resource ](/Resource ) [@Value ](/Value ) 
5. <context:component-scan标签指定注解范围使用[@ComponentScan(basePackages ](/ComponentScan(basePackages ) = {"com.spring.components"})替代 
6. <context:property-placeholder引入外部配置文件使用@PropertySource({"classpath:application.properties","classpath:jdbc.properties"})替代
7. <bean 标签使用@Bean注解和方法实现
8. IoC具体容器实现选择AnnotationConfigApplicationContext对象

## ★AOP  (Aspect Oriented Programming)

AOP（Aspect Oriented Programming）是一种设计思想，是面向切面编程，它是面向对象编程的一种补充和完善，能够将那些与业务无关，却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可拓展性和可维护性, 同时提高了开发的效率。

- 动态代理（InvocationHandler）：JDK原生的实现方式，需要被代理的目标类必须实现接口。因为这个技术要求代理对象和目标对象实现同样的接口（兄弟两个拜把子模式）。
- cglib：通过继承被代理的目标类（认干爹模式）实现代理，所以不需要目标类实现接口。
- AspectJ：早期的AOP实现的框架，SpringAOP借用了AspectJ中的AOP注解。

![](https://cdn.nlark.com/yuque/0/2024/jpeg/43928099/1717917166034-5619d83b-b3ab-4396-a009-2815ea02ab08.jpeg#averageHue=%23fbfbfa&clientId=ua3c3e75b-72ea-4&from=paste&id=uc17ad167&originHeight=354&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u878424bb-fa9e-4429-95db-952dac369ba&title=)
### ★ Spring AOP 和 AspectJ AOP 有什么区别？
**Spring AOP 属于运行时增强，而 AspectJ 是编译时增强。** Spring AOP 基于代理(Proxying)，而 AspectJ 基于字节码操作(Bytecode Manipulation)。
Spring AOP 已经集成了 AspectJ ，AspectJ 应该算的上是 Java 生态系统中最完整的 AOP 框架了。AspectJ 相比于 Spring AOP 功能更加强大，但是 Spring AOP 相对来说更简单，
如果我们的切面比较少，那么两者性能差异不大。但是，当切面太多的话，最好选择 AspectJ ，它比 Spring AOP 快很多
### ★ AspectJ 定义的通知类型有哪些？

- **Before**（前置通知）：目标对象的方法调用之前触发
- **After** （后置通知）：目标对象的方法调用之后触发
- **AfterReturning**（返回通知）：目标对象的方法调用完成，在返回结果值之后触发
- **AfterThrowing**（异常通知）：目标对象的方法运行中抛出 / 触发异常后触发。AfterReturning 和 AfterThrowing 两者互斥。如果方法调用成功无异常，则会有返回值；如果方法抛出了异常，则不会有返回值。
- **Around** （环绕通知）：编程式控制目标对象的方法调用。环绕通知是所有通知类型中可操作范围最大的一种，因为它可以直接拿到目标对象，以及要执行的方法，所以环绕通知可以任意的在目标对象的方法调用前后搞事，甚至不调用目标对象的方法
### ★ 多个切面的执行顺序如何控制？
1、通常使用@Order 注解直接定义切面顺序
```java
// 值越小优先级越高
@Order(3)
@Component
@Aspect
public class LoggingAspect implements Ordered {
```
**2、实现Ordered 接口重写 getOrder 方法。**
```java
@Component
@Aspect
public class LoggingAspect implements Ordered {

    // ....

    @Override
    public int getOrder() {
        // 返回值越小优先级越高
        return 1;
    }
}
```

### creation and configuration
import dependency
```java
<!-- spring-aspects会帮我们传递过来aspectjweaver -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>6.0.6</version>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>6.0.6</version>
</dependency>
```
声明切面类
```java
// @Aspect表示这个类是一个切面类
@Aspect
// @Component注解保证这个切面类能够放入IOC容器
@Component
public class LogAspect {
    // value 具体哪个方法使用aop切面
    @Before(value="execution(public int com.spring.aop.annotation.CalculatorImpl.*(..))")
    public void beforeMethod(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        String args = Arrays.toString(joinPoint.getArgs());
        System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
    }

    @After("execution(* com.spring.aop.annotation.CalculatorImpl.*(..))")
    public void afterMethod(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Logger-->后置通知，方法名："+methodName);
    }

    @AfterReturning(value = "execution(* com.spring.aop.annotation.CalculatorImpl.*(..))", returning = "result")
    public void afterReturningMethod(JoinPoint joinPoint, Object result){
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Logger-->返回通知，方法名："+methodName+"，结果："+result);
    }

    @AfterThrowing(value = "execution(* com.spring.aop.annotation.CalculatorImpl.*(..))", throwing = "ex")
    public void afterThrowingMethod(JoinPoint joinPoint, Throwable ex){
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Logger-->异常通知，方法名："+methodName+"，异常："+ex);
    }
    
    @Around("execution(* com.spring.aop.annotation.CalculatorImpl.*(..))")
    public Object aroundMethod(ProceedingJoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        String args = Arrays.toString(joinPoint.getArgs());
        Object result = null;
        try {
            System.out.println("环绕通知-->目标对象方法执行之前");
            //目标对象（连接点）方法的执行
            result = joinPoint.proceed();
            System.out.println("环绕通知-->目标对象方法返回值之后");
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            System.out.println("环绕通知-->目标对象方法出现异常时");
        } finally {
            System.out.println("环绕通知-->目标对象方法执行完毕");
        }
        return result;
    }
    
}
```

开启aspectj注解支持
 xml方式
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--
        基于注解的AOP的实现：
        1、将目标对象和切面交给IOC容器管理（注解+扫描）
        2、开启AspectJ的自动代理，为目标对象自动生成代理
        3、将切面类通过注解@Aspect标识
    -->
    <context:component-scan base-package="com.spring.aop.annotation"></context:component-scan>

    <aop:aspectj-autoproxy />
</beans>
```
配置类方式
```java
@Configuration
@ComponentScan(basePackages = "com.spring")
//作用等于 <aop:aspectj-autoproxy /> 配置类上开启 Aspectj注解支持!
@EnableAspectJAutoProxy
public class MyConfig {
}
```
### 获取通知细节信息
**JointPoint接口**
需要获取方法签名、传入的实参等信息时，可以在通知方法声明JoinPoint类型的形参。 

   - 要点1：JoinPoint 接口通过 getSignature() 方法获取目标方法的签名（方法声明时的完整信息）
   - 要点2：通过目标方法签名对象获取方法名
   - 要点3：通过 JoinPoint 对象获取外界调用目标方法时传入的实参列表组成的数组
```java
// @Before注解标记前置通知方法
// value属性：切入点表达式，告诉Spring当前通知方法要套用到哪个目标方法上
// 在前置通知方法形参位置声明一个JoinPoint类型的参数，Spring就会将这个对象传入
// 根据JoinPoint对象就可以获取目标方法名称、实际参数列表
@Before(value = "execution(public int com.spring.aop.api.Calculator.add(int,int))")
public void printLogBeforeCore(JoinPoint joinPoint) {
    
    // 1.通过JoinPoint对象获取目标方法签名对象
    // 方法的签名：一个方法的全部声明信息
    Signature signature = joinPoint.getSignature();
    
    // 2.通过方法的签名对象获取目标方法的详细信息
    String methodName = signature.getName();
    System.out.println("methodName = " + methodName);
    
    int modifiers = signature.getModifiers();
    System.out.println("modifiers = " + modifiers);
    
    String declaringTypeName = signature.getDeclaringTypeName();
    System.out.println("declaringTypeName = " + declaringTypeName);
    
    // 3.通过JoinPoint对象获取外界调用目标方法时传入的实参列表
    Object[] args = joinPoint.getArgs();
    
    // 4.由于数组直接打印看不到具体数据，所以转换为List集合
    List<Object> argList = Arrays.asList(args);
    
    System.out.println("[AOP前置通知] " + methodName + "方法开始了，参数列表：" + argList);
}
```
 **方法返回值**
在返回通知中，通过 **@AfterReturning  **注解的returning属性获取目标方法的返回值！ 
```java
// @AfterReturning注解标记返回通知方法
// 在返回通知中获取目标方法返回值分两步：
// 第一步：在@AfterReturning注解中通过returning属性设置一个名称
// 第二步：使用returning属性设置的名称在通知方法中声明一个对应的形参
@AfterReturning(
        value = "execution(public int com.spring.aop.api.Calculator.add(int,int))",
        returning = "targetMethodReturnValue"
)
public void printLogAfterCoreSuccess(JoinPoint joinPoint, Object targetMethodReturnValue) {
    
    String methodName = joinPoint.getSignature().getName();
    
    System.out.println("[AOP返回通知] "+methodName+"方法成功结束了，返回值是：" + targetMethodReturnValue);
}
```
 
**异常对象捕捉**
在异常通知中，通过@AfterThrowing注解的throwing属性获取目标方法抛出的异常对象 
```java
// @AfterThrowing注解标记异常通知方法
// 在异常通知中获取目标方法抛出的异常分两步：
// 第一步：在@AfterThrowing注解中声明一个throwing属性设定形参名称
// 第二步：使用throwing属性指定的名称在通知方法声明形参，Spring会将目标方法抛出的异常对象从这里传给我们
@AfterThrowing(
        value = "execution(public int com.spring.aop.api.Calculator.add(int,int))",
        throwing = "targetMethodException"
)
public void printLogAfterCoreException(JoinPoint joinPoint, Throwable targetMethodException) {
    
    String methodName = joinPoint.getSignature().getName();
    
    System.out.println("[AOP异常通知] "+methodName+"方法抛异常了，异常类型是：" + targetMethodException.getClass().getName());
}
```
### 切入点表达式
### 提取切入点表达式
```java
@Pointcut("execution(* com.spring.aop.annotation.*.*(..))")
public void pointCut(){}
```
**在同一个切面中使用**
```java
@Before("pointCut()")
public void beforeMethod(JoinPoint joinPoint){
    String methodName = joinPoint.getSignature().getName();
    String args = Arrays.toString(joinPoint.getArgs());
    System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
}
```
**在不同切面中使用**
```java
@Before("com.spring.aop.CommonPointCut.pointCut()")
public void beforeMethod(JoinPoint joinPoint){
    String methodName = joinPoint.getSignature().getName();
    String args = Arrays.toString(joinPoint.getArgs());
    System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
}
```

### 环绕通知

环绕通知对应整个 try...catch...finally 结构，包括前面四种通知的所有功能。

```java
// 使用@Around注解标明环绕通知方法
@Around(value = "com.spring.aop.aspect.springPointCut.transactionPointCut()")
public Object manageTransaction(
    
        // 通过在通知方法形参位置声明ProceedingJoinPoint类型的形参，
        // Spring会将这个类型的对象传给我们
        ProceedingJoinPoint joinPoint) {
    
    // 通过ProceedingJoinPoint对象获取外界调用目标方法时传入的实参数组
    Object[] args = joinPoint.getArgs();
    
    // 通过ProceedingJoinPoint对象获取目标方法的签名对象
    Signature signature = joinPoint.getSignature();
    
    // 通过签名对象获取目标方法的方法名
    String methodName = signature.getName();
    
    // 声明变量用来存储目标方法的返回值
    Object targetMethodReturnValue = null;
    
    try {
    
        // 在目标方法执行前：开启事务（模拟）
        log.debug("[AOP 环绕通知] 开启事务，方法名：" + methodName + "，参数列表：" + Arrays.asList(args));
    
        // 过ProceedingJoinPoint对象调用目标方法
        // 目标方法的返回值一定要返回给外界调用者
        targetMethodReturnValue = joinPoint.proceed(args);
    
        // 在目标方法成功返回后：提交事务（模拟）
        log.debug("[AOP 环绕通知] 提交事务，方法名：" + methodName + "，方法返回值：" + targetMethodReturnValue);
    
    }catch (Throwable e){
    
        // 在目标方法抛异常后：回滚事务（模拟）
        log.debug("[AOP 环绕通知] 回滚事务，方法名：" + methodName + "，异常：" + e.getClass().getName());
    
    }finally {
    
        // 在目标方法最终结束后：释放数据库连接
        log.debug("[AOP 环绕通知] 释放数据库连接，方法名：" + methodName);
    
    }
    
    return targetMethodReturnValue;
}
```

## ★ spring transaction

### ★事务基本概念
#### ①什么是事务
数据库事务( transaction)是访问并可能操作各种数据项的一个数据库操作序列，**这些操作要么全部执行,要么全部不执行**，是一个不可分割的工作单位。事务由事务开始与事务结束之间执行的全部数据库操作组成。
#### ②事务的特性
**原子性**（Atomicity）：事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用；
**一致性**（Consistency）：执行事务前后，数据保持一致，例如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的；
**隔离性**（Isolation）：并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的；
**持久性**（Durability）：一个事务被提交之后。它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响。
**只有保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。也就是说 A、I、D 是手段，C 是目的！**
![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717918491488-9a33c09b-5c9f-44d5-ae88-dc2bf4d7256a.png#averageHue=%238ec7bc&clientId=ua3c3e75b-72ea-4&from=paste&id=ue49e7987&originHeight=371&originWidth=351&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u58ff7c79-0520-4cf1-8533-02d9df9657c&title=)

### ★ Spring 管理事务的方式有几种？

- **编程式事务**：通过 TransactionTemplate或者 TransactionManager 手动管理事务，对业务代码侵入性大 很少使用
- **声明式事务**： : 实际是通过 AOP 实现（基于@Transactional 的全注解方式使用最多）本质上他通过AOP功能将事务处理的功能编织到拦截的方法中,
#### 编程式事务
编程式事务是**指手动编写程序来管理事务**，即通过编写代码的方式直接控制事务的提交和回滚。在 Java 中，通常使用事务管理器(如 Spring 中的 `PlatformTransactionManager`)来实现编程式事务。
编程式事务的**主要优点是灵活性高，可以按照自己的需求来控制事务的粒度、模式等等**。但是，编写大量的事务控制代码容易出现问题，对代码的可读性和可维护性有一定影响。
```java
Connection conn = ...;
  
try {
    // 开启事务：关闭事务的自动提交
    conn.setAutoCommit(false);
    // 核心操作
    // 业务代码
    // 提交事务
    conn.commit();
  
}catch(Exception e){
  
    // 回滚事务
    conn.rollBack();
  
}finally{
  
    // 释放数据库连接
    conn.close();
  
}
```
编程式的实现方式存在缺陷：

- 细节没有被屏蔽：具体操作过程中，所有细节都需要程序员自己来完成，比较繁琐。
- 代码复用性不高：如果没有有效抽取出来，每次实现功能都需要自己编写代码，代码就没有得到复用。
#### 声明式事务

声明式事务是指使用注解或 XML 配置的方式来控制事务的提交和回滚。
开发者只需要添加配置即可， 具体事务的实现由第三方框架实现，避免我们直接进行事务操作！
使用声明式事务可以将事务的控制和业务逻辑分离开来，提高代码的可读性和可维护性。
区别：

- 编程式事务需要手动编写代码来管理事务
- 而声明式事务可以通过配置文件或注解来控制事务。

Spring声明式事务对应依赖 

   - spring-tx: 包含声明式事务实现的基本规范（事务管理器规范接口和事务增强等等）
   - spring-jdbc: 包含DataSource方式事务管理器实现类DataSourceTransactionManager
   - spring-orm: 包含其他持久层框架的事务管理器实现类例如：Hibernate/Jpa等
### Spring声明式事务对应事务管理器接口



1.  Spring声明式事务对应依赖 
   - spring-tx: 包含声明式事务实现的基本规范（事务管理器规范接口和事务增强等等）
   - spring-jdbc: 包含DataSource方式事务管理器实现类DataSourceTransactionManager
   - spring-orm: 包含其他持久层框架的事务管理器实现类例如：Hibernate/Jpa等
```xml
<!-- 声明式事务依赖-->
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>6.0.6</version>
  </dependency>
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aop</artifactId>
      <version>6.0.6</version>
  </dependency>
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>6.0.6</version>
   </dependency>
```

2.  Spring声明式事务对应事务管理器接口
![](image/image_maTcx-F58u.png#id=wnILb&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717919025560-81eaf404-de48-4d58-b935-83057f7c1df3.png#averageHue=%23f7f6ef&clientId=u978f062a-8ba9-4&from=paste&height=217&id=u6180d352&originHeight=217&originWidth=672&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10276&status=done&style=none&taskId=u714a426a-bebb-411a-b1c4-6da24ecc1a6&title=&width=672)
我们现在要使用的事务管理器是org.springframework.jdbc.datasource.DataSourceTransactionManager，将来整合 JDBC方式、JdbcTemplate方式、Mybatis方式的事务实现！
DataSourceTransactionManager类中的主要方法： 
   - doBegin()：开启事务
   - doSuspend()：挂起事务
   - doResume()：恢复挂起的事务
   - doCommit()：提交事务
   - doRollback()：回滚事务
### 使用声明事务注解@Transactional
```java
// 表面该方法或类使用事务
@Transactional  

// readOnly = true把当前事务设置为只读 默认是false!
@Transactional(readOnly = true)

// timeout设置事务超时时间,单位秒! 默认: -1 永不超时,不限制事务时间!
@Transactional(readOnly = false,timeout = 3)

/**
 * rollbackFor = 指定哪些异常才会回滚,默认是 RuntimeException and Error 异常方可回滚!
 * noRollbackFor = 指定哪些异常不会回滚, 默认没有指定,如果指定,应该在rollbackFor的范围内!
 * isolation = 设置事务的隔离级别,mysql默认是repeatable read!
 */
@Transactional(readOnly = false,
               timeout = 3,
               rollbackFor = Exception.class,
               noRollbackFor = FileNotFoundException.class,
               isolation = Isolation.REPEATABLE_READ)
public void changeInfo() throws FileNotFoundException {
    studentDao.updateAgeById(100,1);
    //主动抛出一个检查异常,测试! 发现不会回滚,因为不在rollbackFor的默认范围内!
    new FileInputStream("xxxx");
    studentDao.updateNameById("test1",1);
}
```
### ★  Spring 事务中哪几种事务传播行为?
```java
//在被调用的子方法中设置传播行为，代表如何处理调用的事务！ 是加入，还是新事务等！
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void MethodB(){
    // ...
}
@Transactional 注解通过 propagation 属性设置事务的传播行为。它的默认值是：
Propagation propagation() default Propagation.REQUIRED;
```
| 名称 | 含义 |
| --- | --- |
| REQUIRED  默认值 | 使用的最多的一个事务传播行为，我们平时经常使用的@Transactional注解默认使用就是这个事务传播行为。如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。
所以当前方法有可能和其他方法共用事务  在共用事务的情况下：当前方法会因为其他方法回滚而受连累 |
| REQUIRES_NEW | 当前方法必须工作在事务中  不管当前线程上是否有已经开启的事务，都要开启新事务  在新事务中运行  不会和其他方法共用事务，避免被其他方法连累 |

**注意：**
在同一个类中，对于@Transactional注解的方法调用，事务传播行为不会生效。这是因为Spring框架中使用代理模式实现了事务机制，在同一个类中的方法调用并不经过代理，而是通过对象的方法调用，因此@Transactional注解的设置不会被代理捕获，也就不会产生任何事务传播行为的效果。
其他传播行为值

1. Propagation.REQUIRED：如果当前存在事务，则加入当前事务，否则创建一个新事务。
2. Propagation.REQUIRES_NEW：创建一个新事务，并在新事务中执行。如果当前存在事务，则挂起当前事务，即使新事务抛出异常，也不会影响当前事务。
3. Propagation.NESTED：如果当前存在事务，则在该事务中嵌套一个新事务，如果没有事务，则与Propagation.REQUIRED一样。
4. Propagation.SUPPORTS：如果当前存在事务，则加入该事务，否则以非事务方式执行。
5. Propagation.NOT_SUPPORTED：以非事务方式执行，如果当前存在事务，挂起该事务。
6. Propagation.MANDATORY：必须在一个已有的事务中执行，否则抛出异常。
7. Propagation.NEVER：必须在没有事务的情况下执行，否则抛出异常。
### ★  事务隔离级别
事务隔离级别回滚

数据库事务的隔离级别是指在多个事务并发执行时，数据库系统为了保证数据一致性所遵循的规定。常见的隔离级别包括：

1. 读未提交（Read Uncommitted）：事务可以读取未被提交的数据，容易产生脏读、不可重复读和幻读等问题。实现简单但不太安全，一般不用。
2. 读已提交（Read Committed）：事务只能读取已经提交的数据，可以避免脏读问题，但可能引发不可重复读和幻读。
3. 可重复读（Repeatable Read）：在一个事务中，相同的查询将返回相同的结果集，不管其他事务对数据做了什么修改。可以避免脏读和不可重复读，但仍有幻读的问题。
4. 串行化（Serializable）：最高的隔离级别，完全禁止了并发，只允许一个事务执行完毕之后才能执行另一个事务。可以避免以上所有问题，但效率较低，不适用于高并发场景。
不同的隔离级别适用于不同的场景，需要根据实际业务需求进行选择和调整。
### ★  @Transactional(rollbackFor = Exception.class)注解了解吗？
Exception 分为运行时异常 RuntimeException 和非运行时异常。事务管理对于企业应用来说是至关重要的，即使出现异常情况，它也可以保证数据的一致性。
当 @Transactional 注解作用于类上时，该类的所有 public 方法将都具有该类型的事务属性，同时，我们也可以在方法级别使用该标注来覆盖类级别的定义。
@Transactional 注解默认回滚策略是只有在遇到RuntimeException(运行时异常) 或者 Error 时才会回滚事务，而不会回滚 Checked Exception（受检查异常）。这是因为 Spring 认为RuntimeException和 Error 是不可预期的错误，而受检异常是可预期的错误，可以通过业务逻辑来处理。

### JdbcTemplate
为了在特定领域帮助我们简化代码，Spring 封装了很多 『Template』形式的模板类。例如：RedisTemplate、RestTemplate  JDBCTemplate 等等
### spring 注解
@Autowired 自动装配依赖项
**@Qualifier**: 用于解决依赖注入时的歧义，当有多个相同类型的 bean 时指定注入哪一个
**@Scope**: 用于定义 bean 的作用域，
**@Component**: 用于声明一个组件
**@Service** 
**@Repository**:
@bean
@import

## Lombok

Lombok是将自动生成的代码织入字节码文件中，从而实现：源代码没有，但是字节码文件有——毕竟我们最终运行的是字节码文件，只要字节码文件中有即可。而这个过程因为要参与源文件编译，所以需要安装IDEA插件。

dependency import

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
    <scope>provided</scope>
</dependency>
```
|  |  |
| --- | --- |
| 注解 | 作用 |
| [@Data ](/Data ) | 生成getXxx()方法、setXxx()方法、toString()、equals()、canEqual()、hashCode()方法 |
| [@AllArgsConstructor ](/AllArgsConstructor ) | 生成全参构造器 |
| [@NoArgsConstructor ](/NoArgsConstructor ) | 生成无参构造器 |
| [@Slf4j ](/Slf4j ) | 生成日志对象 |
| [@Getter ](/Getter ) | 生成getXxx()方法 |
| [@Setter ](/Setter ) | 生成setXxx()方法 |
| [@ToString ](/ToString ) | 生成toString()方法 |

## 日志

1.  sout有什么问题 
   1.  问题1：I/O影响性能
System.out对象是一个输出流对象，所以控制台输出信息本质上是I/O操作。而I/O操作是项目运行过程中两大性能瓶颈之一。 
   2.  问题2：无法统一管理
项目上线时，希望把所有（或一部分）sout打印关闭，但是只能手动一个一个查找，耗费开发人员的极大精力，因为sout的无度使用会使它分散在项目的各个角落。 
   3.  问题3：显得你很low
想看某个变量的值，只会使用sout在控制台打印出来，不会debug，这只能被人鄙视。 
2.  使用[日志框架]的好处 
   1.  设定级别，统一管理
日志框架会按照事件的严重程度来划分级别，例如： 
      - 错误（Error）：表示程序运行出错，比如抛异常等情况。
      - 警告（Warning）：表示程序运行过程中有潜在风险，但此时并没有报错。
      - 信息（Info）：表示程序运行过程中完成了一个关键动作，需要以程序运行信息的形式告知开发者。
      - 调试（Debug）：表示程序运行过程中更加细致的信息，协助程序员调试程序。
> 📌Tips：各种不同的具体日志系统会使用不同的日志级别名称，也可能有更多个级别设定。但是思想是一致的。
通过在配置文件中指定某一个日志级别来控制系统要打印的内容。日志框架会打印**当前指定级别**的日志和比当前指定级别**更严重**的级别的日志。
例如在开发阶段，我们指定debug级别，项目上线修改成info级别，那么所有debug级别的日志就都不打印了，不需要到项目代码中一个一个修改，非常方便。

   2.  灵活指定输出位置
使用日志框架不一定是打印到控制台，也可以保存到文件中或者保存到数据库。这就看具体的项目维护需求。 
   3.  自定义日志格式
打印日志数据可以使用日志框架的默认格式，也可以根据需要定制。
   4.  基于日志分析问题
将来我们开发的应用系统中，不仅包含Java代码，还有很多中间件服务器。任何子系统出现故障我们都是通过日志来定位问题、分析故障原因。甚至更复杂的系统还会专门开发日志子系统，在主系统出现问题时抓取日志数据供维护人员参考。
而日志数据必须要有确定格式才便于格式化和抓取，这肯定不是随意写sout就能实现的。 

依赖导入
```xml
 <!-- 日志 ， 会自动传递slf4j门面-->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```
日志配置
```xml
<settings>
  <!-- SLF4J 选择slf4j输出！ -->
  <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```

# Spring MVC
## ★ 说说自己对于 Spring MVC 了解?
MVC 是模型(Model)、视图(View)、控制器(Controller)的简写，其核心思想是通过将业务逻辑、数据、显示分离来组织代码。
![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717920816264-4f50d264-c2df-4144-8189-b69e59679bde.png#averageHue=%23f0f7e8&clientId=u978f062a-8ba9-4&from=paste&id=ua5c33745&originHeight=243&originWidth=481&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9d557b66-e81f-40c7-9a31-e6f738a8388&title=)

主要作用
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717920957201-60fa4422-52a3-408a-8975-6d7fd812e2fc.png#averageHue=%23f5f5f5&clientId=u978f062a-8ba9-4&from=paste&height=531&id=u7dfaa0f2&originHeight=531&originWidth=954&originalType=binary&ratio=1&rotation=0&showTitle=false&size=80045&status=done&style=none&taskId=u5ce16ec3-a8be-4ec7-83ee-e25447fd2cb&title=&width=954)
## **★ SpringMVC 工作原理了解吗?**
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717921026386-eed454c5-fb0e-430a-9277-c1ad38c288b7.png#averageHue=%23f8f3f0&clientId=u978f062a-8ba9-4&from=paste&height=656&id=u68bebe44&originHeight=656&originWidth=1605&originalType=binary&ratio=1&rotation=0&showTitle=false&size=117474&status=done&style=none&taskId=ued09a076-8780-4cf0-90ec-7eddbc0904b&title=&width=1605)
**流程说明：**

1. 客户端（浏览器）发送请求， DispatcherServlet拦截请求。
2. DispatcherServlet 根据请求信息调用 HandlerMapping 。HandlerMapping 根据 URL 去匹配查找能处理的 Handler（也就是我们平常说的 Controller 控制器） ，并会将请求涉及到的拦截器和 Handler 一起封装。
3. DispatcherServlet 调用 HandlerAdapter适配器执行 Handler 。
4. Handler 完成对用户请求的处理后，会返回一个 ModelAndView 对象给DispatcherServlet，ModelAndView 顾名思义，包含了数据模型以及相应的视图的信息。Model 是返回的数据对象，View 是个逻辑上的 View。
5. ViewResolver 会根据逻辑 View 查找实际的 View。
6. DispaterServlet 把返回的 Model 传给 View（视图渲染）。
7. 把 View 返回给请求者（浏览器）
## **★  Spring MVC 的核心组件有哪些？**
            a.     **DispatcherServlet**:   **核心的中央处理器**，SpringMVC提供   负责接收请求、分发，并给予客户端响应。做出整个流程的调用，，我们只需要在web.xml配置  [CEO]
            b.     **HandlerMapping**: **处理器映射器  **SpringMVC提供   根据 URL去匹配查找能处理的 Handler，ds会先访问她查找地址有没有对应的处理方法，加入ioc容器【秘书】
            c.     **HandlerAdapter**: **处理器适配器** SpringMVC提供  负责参数简化和数据响应简化，ds通过handlerAdapter间接的调用handler，加入到ioc容器【经理】
            d.     **Handler:请求处理器 ** **handler就是我们controller方法，只需要到秘书中注册即可！ controller不在是servlet ，加入到ioc容器【打工人】**
            e.     **ViewResovler**: **视图解析器 **SpringMVC提供 负责进行视图快速查找的组件，他不是必须的！返回json可以不配置！加入到ioc容器【财务】

## SpringMVC  Configuration
### pom  dependencies
```xml
<-- pom-->
  <dependencies>
<!-- springioc 核心依赖  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>
<!-- web -->
    <dependency>
      <groupId>jakarta.platform</groupId>
      <artifactId>jakarta.jakartaee-web-api</artifactId>
      <version>9.1.0</version>
      <scope>provided</scope>
    </dependency>

<!-- springwebmvc相关依赖  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${spring.version}</version>
    </dependency>
  
<!-- josn -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.15.0</version>
    </dependency>

 <!-- jsp需要依赖! jstl-->
    <dependency>
      <groupId>jakarta.servlet.jsp.jstl</groupId>
      <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
      <version>3.0.0</version>
    </dependency>

      
<!-- 参数 -->
      <dependency>
      <groupId>org.hibernate.validator</groupId>
      <artifactId>hibernate-validator</artifactId>
      <version>8.0.0.Final</version>
    </dependency>

    <dependency>
      <groupId>org.hibernate.validator</groupId>
      <artifactId>hibernate-validator-annotation-processor</artifactId>
      <version>8.0.0.Final</version>
    </dependency>

    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.3.1</version>
    </dependency>

<!--junit5测试-->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.3.1</version>
    </dependency>
<!-- springTest -->
  <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>6.0.6</version>
        <scope>test</scope>
    </dependency>

<!-- 日志 -->
      <dependency>
          <groupId>org.apache.logging.log4j</groupId>
          <artifactId>log4j-core</artifactId>
          <version>2.19.0</version>
      </dependency>
      <dependency>
          <groupId>org.apache.logging.log4j</groupId>
          <artifactId>log4j-slf4j2-impl</artifactId>
          <version>2.19.0</version>
      </dependency>
```
### springmvc.xml
resources/spring.xml
```xml
<!-- 方案1: 直接使用bean标签配置即可  -->
    <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping" />
    <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter" />
<!-- 方案2: 不写  
以上两种，导入的经理和秘书都是小白 都是笨蛋！ 只能处理原生的一些数据格式!-->



<!-- 打工人所在的类-->
    <context:component-scan base-package="com.spring.controller" />
<!-- 增强经理和秘书-->
    <mvc:annotation-driven />
<!--配置进阶版的经理和秘书 【自带json转化器 | 静态资源处理 | 异常处理。。。】
   解析步骤：
      1. spring-webmvc
      2. meta-info
      3. spring.handlers
      4. http://www.springframework.org/schema/mvc=org.springframework.web.servlet.config.MvcNamespaceHandler
      5. registerBeanDefinitionParser("annotation-driven", new AnnotationDrivenBeanDefinitionParser());
      6. AnnotationDrivenBeanDefinitionParser-parse [将经理和秘书增强以后，手动加入ioc容器] -->
<!--财务： viewResolver
	handler -> string -> viewResolver -> jsp页面
 -->


<!-- 配置动态页面语言jsp的视图解析器,快速查找jsp-->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
    <!--前缀 | 后缀 根据你所在的文件夹进行动态调整！
        前缀： 最大的公共文件夹
        后缀： .jsp
        handler -> 字符串 -》 视图解析器 -》 前缀 + 我们( index | login) + 后缀 jsp项目下地址即可
        建议： jsp存储到web-inf文件夹！ 外部无法直接访问，视图解析器是可以查找！
     -->
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```
### web.xml
webbapp/WEB-INF/web.xml
```xml
<!-- 配置SpringMVC中负责处理请求的核心Servlet，也被称为SpringMVC的前端控制器 -->
<servlet>
		<servlet-name>ds</servlet-name>
     	<!-- DispatcherServlet的全类名 -->
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<!-- 配置名称给servletConfig对象 -》 ds-init-读取-创建ioc容器 -->
  
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:spring-web.xml</param-value>
		</init-param>
		<!-- ds提前启动-->
		<load-on-startup>5</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>ds</servlet-name>
		<!-- /拦截所有请求 -->
         <!-- 对DispatcherServlet来说，url-pattern有两种方式配置 -->
    <!-- 配置“/”，表示匹配整个Web应用范围内所有请求。这里有一个硬性规定：不能写成“/*”。
      只有这一个地方有这个特殊要求，以后我们再配置Filter还是可以正常写“/*”。 -->
		<url-pattern>/</url-pattern>
	</servlet-mapping>
```

## SpringMVC  Request Data
### **RequestMapping()**
```java
/**
     * @RequestMapping
     *    作用： 将方法和对应的地址注册到秘书中（handlerMapping）
     *    原则： 地址不能重复 【地址和请求方式都重复】 /a get | /a post | /a put  不重复
     * 细节1： 细化地址【精准地址】 /x/x/x/x
     * 细节2： 可以省略前面的/和后面的/
     * 细节3： 模糊地址 * 任意一层字符串   **  任意层 任意字符串
     *          /user/* <- /user/a /user/aaaa  /user/a/a[不能]
     *          /user/** <- /user/a /user/a/a
     * 细节4： 注解位置的问题
     *         类和方法
     *         方法： [必须添加]
     *         类： [选择添加] 提取通用的地址而已
     * 细节5： 限制方法的请求方式
     *        默认： @RequestMapping所有请求方式都可以访问
     *        限制： method = {RequestMethod.POST,RequestMethod.GET}
     *        违背： 405
     *        进阶注解：@PutMapping [@PostMapping @GetMapping ] @DeleteMapping... [只支持一个注解！ 第一个生效！]
     *
     */
```
### 接收param参数
```java
/**
 * param参数接收
 * 格式： key = value
 * 细节： param是默认Javaee支持的参数类型
 * 方案1： handler(声明对应类型和命名的形参即可)
 *        login(String account,String password)
 *        要求：形参的名字 = 请求的参数的key 否者拿不到
 * 方案2：@RequestParam
 *       2.1 形参名和请求参数名不一致  @RequestParam(name|value="对应的请求参数名")
 *       2.2 要求某个参数必须传递  @RequestParam(name|value) 违背400 bda request
 *       2.3 不传递，可以给与一个默认值 @RequestParam(defaultValue = "ergouzi")
 * 方案3： 一名多值  爱好： hbs=1&hbs=2&hbs=3
 *        (@RequestParam List<String> hbs)
 * 方案4： 使用实体类接收
 *        实体类的属性名 = 请求参数的key
 *        有对应的参数就接收，没有就走属性的默认值
 */
@PostMapping("login")
public String login(@RequestParam(name = "account") String username,
                    @RequestParam String password,
                    @RequestParam(defaultValue = "ergouzi") String nickname){

    System.out.println("username = " + username + ", password = " + password + ", nickname = " + nickname);
    System.out.println("UserController.login");
    return "login success!!";
}
```

### 接收路径参数

```java
/**
 * 路径传递参数：
 *    1. 设计动态的路径
 *       * 可以让一位动起来，* 无法在形参列表接到值！
 *       {key} == * | 形参列表根据key获取对应的动态路径值
 *    2. 接收路径的参数
 *       handler(形参 -》 param key = value)
 *       (@PathVariable Integer id)
 *       @PathVariable(name||value="{key的值，默认，形参名查找}",requeired=true)
 */

@RequestMapping("{type}/{id}")
public String docId(@PathVariable Integer id,
                    @PathVariable String type,
                    @RequestParam(defaultValue = "xxx") String info){
    System.out.println("PathController.docId");
    System.out.println("id = " + id + ", type = " + type + ", info = " + info);
    return "success!!";
}
```

### 接收json参数
import denpency
```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.15.0</version>
</dependency>
```
springMvc.xml
```xml
<mvc:annotation-driven /> 配置高级经理和秘书
```
```java
/**    
 *
 * json数据的接收：
 *  param [springmvc的首选]
 *        handler(实体类 | map | 变量 没有添加注解) 默认就是 param 不会接收其他数据
 *  path @PathVariable
 *  json @RequestBody
 *       @RequestBody： 获取请求体的数据
 *       RequestBody String json -》 直接将请求体的json字符串无需转化赋值给json形参
 *       (@RequestBody Map data @RequestBody Student student -》 接收到请求体的json字符串-》
 *       handlerAdapter-》调用json处理器（ObjectMapper - jackson） -》 转成对应的数据类型！
 *  415： 经理无法进行数据类型转化！ 【jackson第三方】
 */

@PostMapping("save1")
public String save1(@RequestBody String json){
    System.out.println("json = " + json);
    System.out.println("JsonController.save1");
    return "save1!!";
}

@PostMapping("save2")
public String save2(@RequestBody Map data){
    System.out.println("data = " + data);
    System.out.println("JsonController.save2");
    return "save2!!";
}

@PostMapping("save3")
public String save3(@RequestBody Student student){
    System.out.println("student = " + student);
    System.out.println("JsonController.save3");
    return "save3!!";
}
```
### 

## SpringMVC  Response Data

### handler

```java
/**
 * TODO: 一个controller的方法是控制层的一个处理器,我们称为handler
 * TODO: handler需要使用@RequestMapping/@GetMapping系列,声明路径,在HandlerMapping中注册,供DS查找!
 * TODO: handler作用总结:
 *       1.接收请求参数(param,json,pathVariable,共享域等) 
 *       2.调用业务逻辑 
 *       3.响应前端数据(页面（不讲解模版页面跳转）,json,转发和重定向等)
 * TODO: handler如何处理呢
 *       1.接收参数: handler(形参列表: 主要的作用就是用来接收参数)
 *       2.调用业务: { 方法体  可以向后调用业务方法 service.xx() }
 *       3.响应数据: return 返回结果,可以快速响应前端数据
 */
@GetMapping
public Object handler(简化请求参数接收){
    调用业务方法
    return 简化响应前端数据;
}
```

### json  config

```xml
<!-- jsp需要依赖! jstl-->
<dependency>
    <groupId>jakarta.servlet.jsp.jstl</groupId>
    <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
    <version>3.0.0</version>
</dependency>
```

jsp页面创建

建议位置：/WEB-INF/下，避免外部直接访问！

位置：/WEB-INF/views/home.jsp

```xml
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
        <!-- 可以获取共享域的数据,动态展示! jsp== 后台vue -->
        ${msg}
  </body>
</html>
```

快速响应模版页面

1.  配置jsp视图解析器
springmvc.xml 
```xml
<!-- 配置动态页面语言jsp的视图解析器,快速查找jsp-->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```
 

2.  handler返回视图 
```xml
/**
 *  跳转到提交文件页面  /save/jump
 *  
 *  如果要返回jsp页面!
 *     1.方法返回值改成字符串类型
 *     2.返回逻辑视图名即可    
 *         <property name="prefix" value="/WEB-INF/views/"/>
 *            + 逻辑视图名 +
 *         <property name="suffix" value=".jsp"/>
 */
@GetMapping("jump")
public String jumpJsp(Model model){
    System.out.println("FileController.jumpJsp");
    model.addAttribute("msg","request data!!");
    return "home";
}
```
 

### 转发和重定向

```java
//转发和重定向
/**
 * 前提： [方法和类不能添加@ResponseBody修饰 【不走视图解析器】]
 * 1. handler返回值String
 * 2. handler return "forward:/转发地址"  "redirect:/重定向的地址"
 * 地址问题： （之前）
 *    request  /项目下的地址 【不要写项目根地址】
 *    response /项目根地址/项目下的地址
 * springmvc地址：
 *    转发|重定向： /项目下地址  【springmvc】
 */

// jsp/forward ->转发——》jsp/jump
@RequestMapping("forward")
public String forward(){
    System.out.println("JspController.forward");
    return "forward:/jsp/jump";
}

// jsp/redirect ->重定向-》 jsp/jump | http://
@RequestMapping("redirect")
public String redirect(){
    System.out.println("JspController.redirect");
    return "redirect:/jsp/jump";
}
```

### 返回json数据

导入jackson依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.0</version>
</dependency>
```

json 数据转化器

```xml
 <!-- 
   注意: 导入mvc命名空间!
   mvc:annotation-driven 是一个整合标签
                         他会导入handlerMapping和handlerAdapter
                         他会导入json数据格式转化器等等!
-->
<mvc:annotation-driven />
```
[@ResponseBody ](/ResponseBody ) 
如果类中每个方法上都标记了 [@ResponseBody ](/ResponseBody ) 注解，那么这些注解就可以提取到类上 

可以在方法上使用 `@ResponseBody`注解，用于将方法返回的对象序列化为 JSON 或 XML 格式的数据，并发送给客户端。在前后端分离的项目中使用！

```java
/**
 * @RequestBody handler(@RequestBody 字符串 | Map | 实体类) 将请求体（前端）转递的json数据转成我们需要的Java数据
 * @ResponseBody   handler() 上 -》将handler方法返回的无数据转成json数据装到响应体中直接返回 【1、数据转成json(字符串) 2.放到响应体 3.不走视图解析器】
 * 位置： 方法 | 类 所有的方法都返回json
 *        一旦你加到类上，你的方法只能返回json字符串，转发 重定向视图解析也好都不生效！
 *        @RestController = @Controller + @ResponseBody
 */
@RequestMapping("show")
public List<User> show(){
    User user = new User();
    user.setAge(18);
    user.setName("哈哈");
    List<User> list = new ArrayList<>();
    list.add(user);  // [{}]
    return list;
}
```

## springMVC ohter extension

### 异常处理机制

-  编程式异常处理：是指在代码中显式地编写处理异常的逻辑。它通常涉及到对异常类型的检测及其处理，例如使用 try-catch 块来捕获异常，然后在 catch 块中编写特定的处理代码，或者在 finally 块中执行一些清理操作。在编程式异常处理中，开发人员需要显式地进行异常处理，异常处理代码混杂在业务代码中，导致代码可读性较差。 
-  声明式异常处理：则是将异常处理的逻辑从具体的业务逻辑中分离出来，通过配置等方式进行统一的管理和处理。在声明式异常处理中，开发人员只需要为方法或类标注相应的注解（如 `@Throws` 或 `@ExceptionHandler`），就可以处理特定类型的异常。相较于编程式异常处理，声明式异常处理可以使代码更加简洁、易于维护和扩展。 
-  使用声明式代替编程式来实现异常管理 
   - 让异常控制和核心业务解耦，二者各自维护，结构性更好
-  整个项目层面使用同一套规则来管理异常 
   - 整个项目代码风格更加统一、简洁
   - 便于团队成员之间的彼此协作



1. 声明异常处理控制器类
```java
/**
 * @RestControllerAdvice = @ControllerAdvice + @ResponseBody
 * @ControllerAdvice 代表当前类的异常处理controller! 
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
}
```

2. 声明异常处理hander方法

异常处理handler方法和普通的handler方法参数接收和响应都一致！
只不过异常处理handler方法要映射异常，发生对应的异常会调用！
普通的handler方法要使用@RequestMapping注解映射路径，发生对应的路径调用！
```java
/**
 * 异常处理handler 
 * @ExceptionHandler(HttpMessageNotReadableException.class) 
 * 该注解标记异常处理Handler,并且指定发生异常调用该方法!
 * 
 * 
 * @param e 获取异常对象!
 * @return 返回handler处理结果!
 */
@ExceptionHandler(HttpMessageNotReadableException.class)
public Object handlerJsonDateException(HttpMessageNotReadableException e){
    
    return null;
}

/**
 * 当发生空指针异常会触发此方法!
 * @param e
 * @return
 */
@ExceptionHandler(NullPointerException.class)
public Object handlerNullException(NullPointerException e){

    return null;
}

/**
 * 所有异常都会触发此方法!但是如果有具体的异常处理Handler! 
 * 具体异常处理Handler优先级更高!
 * 例如: 发生NullPointerException异常!
 *       会触发handlerNullException方法,不会触发handlerException方法!
 * @param e
 * @return
 */
@ExceptionHandler(Exception.class)
public Object handlerException(Exception e){

    return null;
}
```
xml configuration 
```xml
 <!-- 扫描controller对应的包,将handler加入到ioc-->
 <context:component-scan base-package="com.spring.controller,
    com.spring.exceptionhandler" />
```

### 拦截器
拦截器 VS 过滤器：

- 相似点 
   - 拦截：必须先把请求拦住，才能执行后续操作
   - 过滤：拦截器或过滤器存在的意义就是对请求进行统一处理
   - 放行：对请求执行了必要操作后，放请求过去，让它访问原本想要访问的资源
- 不同点 
   - 工作平台不同 
      - 过滤器工作在 Servlet 容器中
      - 拦截器工作在 SpringMVC 的基础上
   - 拦截的范围 
      - 过滤器：能够拦截到的最大范围是整个 Web 应用
      - 拦截器：能够拦截到的最大范围是整个 SpringMVC 负责的请求
   - IOC 容器支持 
      - 过滤器：想得到 IOC 容器需要调用专门的工具方法，是间接的
      - 拦截器：它自己就在 IOC 容器中，所以可以直接从 IOC 容器中装配组件，也就是可以直接得到 IOC 容器的支持

```java
public class Process01Interceptor implements HandlerInterceptor {

    // 在处理请求的目标 handler 方法前执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("request = " + request + ", response = " + response + ", handler = " + handler);
        System.out.println("Process01Interceptor.preHandle");
         
        // 返回true：放行
        // 返回false：不放行
        return true;
    }
 
    // 在目标 handler 方法之后，handler报错不执行!
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("request = " + request + ", response = " + response + ", handler = " + handler + ", modelAndView = " + modelAndView);
        System.out.println("Process01Interceptor.postHandle");
    }
 
    // 渲染视图之后执行(最后),一定执行!
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("request = " + request + ", response = " + response + ", handler = " + handler + ", ex = " + ex);
        System.out.println("Process01Interceptor.afterCompletion");
    }
}
```

springmvc.xml

```xml
<!-- 具体配置拦截器可以指定拦截的请求地址 -->
<mvc:interceptor>
    <!-- 精确匹配 -->
    <mvc:mapping path="/common/request/one"/>
    <bean class="com.spring.mvc.interceptor.Process03Interceptor"/>
</mvc:interceptor>



<!-- 具体配置拦截器可以指定拦截的请求地址 -->
<mvc:interceptor>
    <!-- 精确匹配 -->
    <mvc:mapping path="/common/request/one"/>
    <bean class="com.spring.mvc.interceptor.Process03Interceptor"/>
</mvc:interceptor>

<mvc:interceptor>
    <!-- /*匹配路径中的一层 -->
    <mvc:mapping path="/common/request/*"/>
    <bean class="com.spring.mvc.interceptor.Process04Interceptor"/>
</mvc:interceptor>

<mvc:interceptor>
    <!-- /**匹配路径中的多层 -->
    <mvc:mapping path="/common/request/**"/>
    <bean class="com.spring.mvc.interceptor.Process05Interceptor"/>
</mvc:interceptor>




3 排除配置
<mvc:interceptor>
    <!-- /**匹配路径中的多层 -->
    <mvc:mapping path="/common/request/**"/>

    <!-- 使用 mvc:exclude-mapping 标签配置不拦截的地址 -->
    <mvc:exclude-mapping path="/common/request/two/bbb"/>

    <bean class="com.spring.mvc.interceptor.Process05Interceptor"/>
</mvc:interceptor>


<!-- 多个拦截器执行顺序

1.  preHandle() 方法：SpringMVC 会把所有拦截器收集到一起，然后按照配置顺序调用各个 preHandle() 方法。
2.  postHandle() 方法：SpringMVC 会把所有拦截器收集到一起，然后按照配置相反的顺序调用各个 postHandle() 方法。
3.  afterCompletion() 方法：SpringMVC 会把所有拦截器收集到一起，然后按照配置相反的顺序调用各个 afterCompletion() 方法。-->
```
图解
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716631855877-3521d8ce-2ca4-4d55-9638-7ec7c70a61cd.png#averageHue=%23f8f4f1&clientId=uc23fda7e-3529-4&from=paste&height=729&id=u31e0e5da&originHeight=729&originWidth=1578&originalType=binary&ratio=1&rotation=0&showTitle=false&size=130857&status=done&style=none&taskId=u6a5756bd-69c8-4417-aad8-d4d5cc76d2f&title=&width=1578)

### 参数校验
| 注解 | 规则 |
| --- | --- |
| [@Null ](/Null ) | 标注值必须为 null |
| [@NotNull ](/NotNull ) | 标注值不可为 null |
| [@AssertTrue ](/AssertTrue ) | 标注值必须为 true |
| [@AssertFalse ](/AssertFalse ) | 标注值必须为 false |
| [@Min(value) ](/value) | 标注值必须大于或等于 value |
| [@Max(value) ](/value) | 标注值必须小于或等于 value |
| [@DecimalMin(value) ](/value) | 标注值必须大于或等于 value |
| [@DecimalMax(value) ](/value) | 标注值必须小于或等于 value |
| @Size(max,min) | 标注值大小必须在 max 和 min 限定的范围内 |
| @Digits(integer,fratction) | 标注值值必须是一个数字，且必须在可接受的范围内 |
| [@Past ](/Past ) | 标注值只能用于日期型，且必须是过去的日期 |
| [@Future ](/Future ) | 标注值只能用于日期型，且必须是将来的日期 |
| [@Pattern(value) ](/value) | 标注值必须符合指定的正则表达式 |
| JSR 303 只是一套标准，需要提供其实现才可以使用。Hibernate Validator 是 JSR 303 的一个参考实现，除支持所有标准的校验注解外，它还支持以下的扩展注解： |  |

| 注解 | 规则 |
| --- | --- |
| [@Email ](/Email ) | 标注值必须是格式正确的 Email 地址 |
| [@Length ](/Length ) | 标注值字符串大小必须在指定的范围内 |
| [@NotEmpty ](/NotEmpty ) | 标注值字符串不能是空字符串 |
| [@Range ](/Range ) | 标注值必须在指定的范围内 |

import dependence
```xml
<!-- 校验注解 -->
<dependency>
    <groupId>jakarta.platform</groupId>
    <artifactId>jakarta.jakartaee-web-api</artifactId>
    <version>9.1.0</version>
    <scope>provided</scope>
</dependency>
        
<!-- 校验注解实现-->        
<!-- https://mvnrepository.com/artifact/org.hibernate.validator/hibernate-validator -->
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>8.0.0.Final</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.hibernate.validator/hibernate-validator-annotation-processor -->
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator-annotation-processor</artifactId>
    <version>8.0.0.Final</version>
</dependency>
```
**易混总结**
@NotNull、@NotEmpty、[@NotBlank ](/NotBlank ) 都是用于在数据校验中检查字段值是否为空的注解，但是它们的用法和校验规则有所不同。 

1.  [@NotNull ](/NotNull )  (包装类型不为null) 
[@NotNull ](/NotNull ) 注解是 JSR 303 规范中定义的注解，当被标注的字段值为 null 时，会认为校验失败而抛出异常。该注解不能用于字符串类型的校验，若要对字符串进行校验，应该使用 [@NotBlank ](/NotBlank ) 或 [@NotEmpty ](/NotEmpty ) 注解。  
2.  [@NotEmpty ](/NotEmpty ) (集合类型长度大于0) 
[@NotEmpty ](/NotEmpty ) 注解同样是 JSR 303 规范中定义的注解，对于 CharSequence、Collection、Map 或者数组对象类型的属性进行校验，校验时会检查该属性是否为 Null 或者 size()==0，如果是的话就会校验失败。但是对于其他类型的属性，该注解无效。需要注意的是只校验空格前后的字符串，如果该字符串中间只有空格，不会被认为是空字符串，校验不会失败。  
3.  [@NotBlank ](/NotBlank ) （字符串，不为null，切不为"  "字符串） 
[@NotBlank ](/NotBlank ) 注解是 Hibernate Validator 附加的注解，对于字符串类型的属性进行校验，校验时会检查该属性是否为 Null 或 “” 或者只包含空格，如果是的话就会校验失败。需要注意的是，[@NotBlank ](/NotBlank ) 注解只能用于字符串类型的校验。 
总之，这三种注解都是用于校验字段值是否为空的注解，但是其校验规则和用法有所不同。在进行数据校验时，需要根据具体情况选择合适的注解进行校验。 
### 文件上传
位置：index.html

- 第一点：请求方式必须是 POST
- 第二点：请求体的编码方式必须是 multipart/form-data（通过 form 标签的 enctype 属性设置）
- 第三点：使用 input 标签、type 属性设置为 file 来生成文件上传框

import denpendence
```xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
```
springMvc config
```xml
<!-- 文件上传处理器,可处理 multipart/* 请求并将其转换为 MultipartFile 对象-->
<bean id="multipartResolver"
      class="org.springframework.web.multipart.support.StandardServletMultipartResolver">
</bean>
```
web.xml
CommonsMultipartResolver的bean的id，必须是：multipartResolver如果不是这个值，会在上传文件时报错在 web.xml 文件中添加 Multipart 配置
```xml
<servlet>
		<servlet-name>ds</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<multipart-config>
			<!-- 定义文件上传时所需的最大值，单位为字节 -->
			<max-file-size>10485760</max-file-size>
			<!-- 定义单个上传文件的最大值，单位为字节 -->
			<max-request-size>20971520</max-request-size>
			<!-- 定义内存中存储文件的最大值，超过此大小的文件会写入到硬盘中 -->
			<file-size-threshold>5242880</file-size-threshold>
		</multipart-config>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:spring.xml</param-value>
		</init-param>
		<load-on-startup>10</load-on-startup>
	</servlet>

```

1.  **handler方法接收数据** 
```java
/**
 * 上传的文件使用 MultipartFile 类型接收其相关数据
 * @param nickName
 * @param picture
 * @param backgroundPicture
 * @return
 * @throws IOException
 */
@PostMapping ("picture")
public String upload(String nickName, @RequestParam("headPicture") MultipartFile picture, @RequestParam("backgroundPicture")MultipartFile backgroundPicture) throws IOException {
    System.out.println(nickName);
     String inputName = picture.getName();
    System.out.println("文件上传表单项的 name 属性值：" + inputName);

    // 获取这个数据通常都是为了获取文件本身的扩展名
    String originalFilename = picture.getOriginalFilename();
    System.out.println("文件在用户本地原始的文件名：" + originalFilename);

    String contentType = picture.getContentType();
    System.out.println("文件的内容类型：" + contentType);

    boolean empty = picture.isEmpty();
    System.out.println("文件是否为空：" + empty);

    long size = picture.getSize();
    System.out.println("文件大小：" + size);

    byte[] bytes = picture.getBytes();
    System.out.println("文件二进制数据的字节数组：" + Arrays.asList(bytes));

    InputStream inputStream = picture.getInputStream();
    System.out.println("读取文件数据的输入流对象：" + inputStream);

    Resource resource = picture.getResource();
    System.out.println("代表当前 MultiPartFile 对象的资源对象" + resource);
    return "home";
}
```
 

2.  **MultipartFile接口**
![](image/img014_ciD7FfevEJ.png#id=yim8t&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) ![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716632674751-2c593b65-b736-4c5e-9f66-d8081b2746d2.png#averageHue=%23f3f2f1&clientId=uc23fda7e-3529-4&from=paste&height=288&id=u445f4532&originHeight=288&originWidth=317&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12962&status=done&style=none&taskId=ud61e5b47-1aa4-42db-9fed-18a7855b8ac&title=&width=317)
3.  **文件转存** 
   1.  底层机制
![](image/img015_U98i7AFmF-.png#id=Taulh&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) ![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716632684766-497f9531-7660-48e9-b1a2-571a30c7f362.png#averageHue=%23f7f7f7&clientId=uc23fda7e-3529-4&from=paste&height=304&id=u02a61b2a&originHeight=304&originWidth=752&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16829&status=done&style=none&taskId=u76b5e610-d789-4ad5-93d4-9e946c96b20&title=&width=752)
   2.  本地转存
![](image/img016_NDUl5QE_QR.png#id=DCgX2&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716632707905-7e8642a0-159a-479e-a273-10f040ac2289.png#averageHue=%23f5f5f5&clientId=uc23fda7e-3529-4&from=paste&height=289&id=u1136a73f&originHeight=289&originWidth=658&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17201&status=done&style=none&taskId=ue8ff24b2-b1d5-403c-b37e-e7357390e47&title=&width=658)
转存代码演示： 
```java
……
 
// 1、准备好保存文件的目标目录
// ①File 对象要求目标路径是一个物理路径（在硬盘空间里能够直接找到文件的路径）
// ②项目在不同系统平台上运行，要求能够自动兼容、适配不同系统平台的路径格式
//      例如：Window系统平台的路径是 D:/aaa/bbb 格式
//      例如：Linux系统平台的路径是 /ttt/uuu/vvv 格式
//      所以我们需要根据『不会变的虚拟路径』作为基准动态获取『跨平台的物理路径』
// ③虚拟路径：浏览器通过 Tomcat 服务器访问 Web 应用中的资源时使用的路径
String destFileFolderVirtualPath = "/head-picture";
 
// ④调用 ServletContext 对象的方法将虚拟路径转换为真实物理路径
String destFileFolderRealPath = servletContext.getRealPath(destFileFolderVirtualPath);
 
// 2、生成保存文件的文件名
// ①为了避免同名的文件覆盖已有文件，不使用 originalFilename，所以需要我们生成文件名
// ②我们生成文件名包含两部分：文件名本身和扩展名
// ③声明变量生成文件名本身
String generatedFileName = UUID.randomUUID().toString().replace("-","");
 
// ④根据 originalFilename 获取文件的扩展名
String fileExtname = originalFilename.substring(originalFilename.lastIndexOf("."));
 
// ⑤拼装起来就是我们生成的整体文件名
String destFileName = generatedFileName + "" + fileExtname;
 
// 3、拼接保存文件的路径，由两部分组成
//      第一部分：文件所在目录
//      第二部分：文件名
String destFilePath = destFileFolderRealPath + "/" + destFileName;
 
// 4、创建 File 对象，对应文件具体保存的位置
File destFile = new File(destFilePath);
 
// 5、执行转存
picture.transferTo(destFile);
 
……
```

缺陷 
Web 应用重新部署时通常都会清理旧的构建结果，此时用户以前上传的文件会被删除，导致数据丢失。
项目运行很长时间后，会导致上传的文件积累非常多，体积非常大，从而拖慢 Tomcat 运行速度。
当服务器以集群模式运行时，文件上传到集群中的某一个实例，其他实例中没有这个文件，就会造成数据不一致。
不支持动态扩容，一旦系统增加了新的硬盘或新的服务器实例，那么上传、下载时使用的路径都需要跟着变化，导致 Java 代码需要重新编写、重新编译，进而导致整个项目重新部署。
![](image/img018_Fd9zEfZjJZ.png#id=UEQ3X&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716632838925-eace77f8-7c9a-4483-b7ec-da35ea01c5a4.png#averageHue=%23f6f6f6&clientId=uc23fda7e-3529-4&from=paste&height=229&id=u31aeaf79&originHeight=229&originWidth=743&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11453&status=done&style=none&taskId=u675e3a7f-4ab2-4315-a209-8dc8d1c77d7&title=&width=743)
文件服务器转存（推荐）
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716632850512-352b7b5c-9d97-4c5e-96ea-1661c650bd28.png#averageHue=%23f7f7f7&clientId=uc23fda7e-3529-4&from=paste&height=304&id=u666f7ae2&originHeight=304&originWidth=847&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19561&status=done&style=none&taskId=u422fdc80-f071-402e-928b-63c17ba6c65&title=&width=847)
好处 
不受 Web 应用重新部署影响
在应用服务器集群环境下不会导致数据不一致
针对文件读写进行专门的优化，性能有保障
能够实现动态扩容
![](image/img020_TUZbWX5oA6.png#id=vpGpd&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716632866971-2b1ad39c-f066-4400-b438-036f482cee89.png#averageHue=%23f7f7f7&clientId=uc23fda7e-3529-4&from=paste&height=275&id=u20a56aab&originHeight=275&originWidth=743&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12416&status=done&style=none&taskId=u3a9bd197-5297-4bd3-8c94-575e826d0d7&title=&width=743)
**文件服务器类型**
第三方平台： 
阿里的 OSS 对象存储服务
七牛云
自己搭建服务器：FastDFS 等
上传到其他模块
这种情况肯定出现在分布式架构中，常规业务功能不会这么做，采用这个方案的一定是特殊情况，这种情况极其少见。
![](image/img021_GYdAmeWInU.png#id=qi2eL&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1716632913810-4fea1e2a-a4ad-43b7-a592-2e2cf973c828.png#averageHue=%23f8f8f8&clientId=uc23fda7e-3529-4&from=paste&height=304&id=ub9882633&originHeight=304&originWidth=847&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18664&status=done&style=none&taskId=ue30332e0-b51a-46d8-a711-366b9d18646&title=&width=847)
在 MultipartFile 接口中有一个对应的方法： 
```java
/**
 * Return a Resource representation of this MultipartFile. This can be used
 * as input to the {@code RestTemplate} or the {@code WebClient} to expose
 * content length and the filename along with the InputStream.
 * @return this MultipartFile adapted to the Resource contract
 * @since 5.1
 */
default Resource getResource() {
  return new MultipartFileResource(this);
}
```

注释中说：这个 Resource 对象代表当前 MultipartFile 对象，输入给 RestTemplate 或 WebClient。而 RestTemplate 或 WebClient 就是用来在 Java 程序中向服务器端发出请求的组件。 

### 文件下载
```java
@Autowired
private ServletContext servletContext;

//文件下载
@RequestMapping("download")
public void download(HttpServletResponse response) throws IOException {

    //1.文件读取到程序中 文件输入流
    InputStream ips = servletContext.getResourceAsStream("/imgs/xx.png");
    //2.设置响应头进行下载
    response.setHeader("content-disposition","attachment;filename=xx.png");
    //3.使用字节输出流进行下载
    ServletOutputStream outputStream = response.getOutputStream();

    int len = -1;
    byte [] buffer = new byte[8*1024];

    while ( (len = ips.read(buffer))  != -1){
        outputStream.write(buffer,0,len);
    }
}

```

## SpringMVC底层原理

## Mvc注解总结

@RestController    response+controller  
@RequestMapping()  作用： 将方法和对应的地址注册到秘书中（handlerMapping）
@RequestParam  从请求的查询字符串中接受参数
@PathVariable  从url中提取变量 并将其作为参数传递给控制器方法
@RequestBody      request json data
@ResponseBody    return json data
@RequestHeader   request header data
@CookieValue	request cookie data
@RestControllerAdvice = @ControllerAdvice + @ResponseBody   代表当前类是异常处理controller
@CrossOrigin
@ControllerAdvice
@ExceptionHandler


# SSM
## 什么是SSM整合？

**本质**：Spring接管一切（将框架核心组件交给Spring进行IoC管理），代码更加简洁。

- SpringMVC管理web相关组件
- Spring管理业务层、持久层、以及数据库相关（DataSource,MyBatis）的组件
- SSM整合最终就是编写IoC配置文件

## SSM整合核心理解五连问！

### SSM整合涉及几个IoC容器？

我们提到过SpringMVC/DispatcherServlet 加载 spring-mvc.xml，此时整个 Web 应用中只创建一个 IoC 容器。如果将Mybatis、配置声明式事务，全部在 spring-mvc.xml 配置文件中配置也是可以的。可是这样会导致配置文件太长，不容易维护。

通常情况下，SSM整合我们会创建两个IoC容器，分开管理SSM下的核心组件！
### 每个IoC容器盛放哪些组件？
| **容器名** | **创建类** | **盛放组件** |
| --- | --- | --- |
| web容器 | DispatcherServlet | web相关组件（controller,springmvc核心组件） |
| root容器 | ContextLoaderListener | 业务和持久层相关组件（service,aop,tx,dataSource,mybatis,mapper等） |

### IoC容器之间是什么关系？
结论：两个组件分别创建的 IOC 容器是**父子**关系。

- 父容器：ContextLoaderListener 创建的 IOC 容器（root容器)
- 子容器：DispatcherServlet 创建的 IOC 容器（web容器）
### 需要几个配置文件和对应IoC容器关系？

文件的数量不是固定的，但是至少要两个，为了方便编写，我们可以三层架构每层对应一个配置文件，分别指定两个容器加载即可！

建议配置文件：

| 配置名 | 对应内容 | 对应容器 |
| --- | --- | --- |
| spring-mvc.xml | controller,springmvc相关 | web容器 |
| spring-service.xml | service,aop,tx相关 | root容器 |
| spring-mapper.xml | mapper,datasource,mybatis相关 | root容器 |


### IoC容器初始化方式？

在一个 Web 应用中就会出现两个 IOC 容器

- DispatcherServlet 创建一个 IOC 容器
- ContextLoaderListener 创建一个 IOC 容器

```xml
<!-- 通过全局初始化参数指定 Spring 配置文件的位置  root ioc容器配置-->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:spring-service.xml,classpath:spring-mapper.xml</param-value>
</context-param>
 
<listener>
    <!-- 指定全类名，配置监听器 -->
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>

<!-- web容器配置-->
<!-- 配置SpringMVC中负责处理请求的核心Servlet，也被称为SpringMVC的前端控制器 -->
<servlet>
  <servlet-name>DispatcherServlet</servlet-name>
  <!-- DispatcherServlet的全类名 -->
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  <!-- 通过初始化参数指定SpringMVC配置文件位置 -->
  <init-param>
    <!-- 如果不记得contextConfigLocation配置项的名称，可以到DispatcherServlet的父类FrameworkServlet中查找 -->
    <param-name>contextConfigLocation</param-name>
    <!-- 使用classpath:说明这个路径从类路径的根目录开始才查找 -->
    <param-value>classpath:spring-mvc.xml</param-value>
  </init-param>
  <!-- 作为框架的核心组件，在启动过程中有大量的初始化操作要做，这些操作放在第一次请求时才执行非常不恰当 -->
  <!-- 我们应该将DispatcherServlet设置为随Web应用一起启动 -->
  <load-on-startup>1</load-on-startup>

</servlet>

<servlet-mapping>
  <servlet-name>DispatcherServlet</servlet-name>
  <!-- 对DispatcherServlet来说，url-pattern有两种方式配置 -->
  <!-- 方式一：配置“/”，表示匹配整个Web应用范围内所有请求。这里有一个硬性规定：不能写成“/*”。
    只有这一个地方有这个特殊要求，以后我们再配置Filter还是可以正常写“/*”。 -->
  <!-- 方式二：配置“*.扩展名”，表示匹配整个Web应用范围内部分请求 -->
  <url-pattern>/</url-pattern>
</servlet-mapping>
```
