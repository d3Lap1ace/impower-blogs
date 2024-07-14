# Mybatis

## 持久层框架对比

- JDBC 
   - SQL 夹杂在Java代码中耦合度高，导致硬编码内伤
   - 维护不易且实际开发需求中 SQL 有变化，频繁修改的情况多见
   - 代码冗长，开发效率低
- Hibernate 和 JPA 
   - 操作简便，开发效率高
   - 程序中的长难复杂 SQL 需要绕过框架
   - 内部自动生成的 SQL，不容易做特殊优化
   - 基于全映射的全自动框架，大量字段的 POJO 进行部分映射时比较困难。
   - 反射操作太多，导致数据库性能下降
- MyBatis 
   - 轻量级，性能出色
   - SQL 和 Java 编码分开，功能边界清晰。Java代码专注业务、SQL语句专注数据
   - 开发效率稍逊于 Hibernate，但是完全能够接收

开发效率：Hibernate>Mybatis>JDBC

运行效率：JDBC>Mybatis>Hibernate
## mybatis配置文件设计标签和顶层结构：

- configuration（配置） 
   - [properties（属性）](https://mybatis.org/mybatis-3/zh/configuration.html#properties)
   - [settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)
   - [typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)
   - [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
   - [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
   - [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
   - [environments（环境配置）](https://mybatis.org/mybatis-3/zh/configuration.html#environments) 
      - environment（环境变量） 
         - transactionManager（事务管理器）
         - dataSource（数据源）
   - [databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider)
   - [mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

### settings设置项：
| 设置名 | 描述 | 有效值 | 默认值 |
| --- | --- | --- | --- |
| cacheEnabled | 全局性地开启或关闭所有映射器配置文件中已配置的任何缓存。 | true &#124; false | true |
| lazyLoadingEnabled | 延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。 特定关联关系中可通过设置 `fetchType`
 属性来覆盖该项的开关状态。 | true &#124; false | false |
| aggressiveLazyLoading | 开启时，任一方法的调用都会加载该对象的所有延迟加载属性。 否则，每个延迟加载属性会按需加载（参考 `lazyLoadTriggerMethods`
)。 | true &#124;false | false |
| autoMappingBehavior | 指定 MyBatis 应如何自动映射列到字段或属性。 NONE 表示关闭自动映射；PARTIAL 只会自动映射没有定义嵌套结果映射的字段。 FULL 会自动映射任何复杂的结果集（无论是否嵌套）。 | NONE, PARTIAL, FULL | PARTIAL |
| safeRowBoundsEnabled | 是否允许在嵌套语句中使用分页（RowBounds）。如果允许使用则设置为 false。 | 指定发现自动映射目标未知列（或未知属性类型）的行为。 |  |
| mapUnderscoreToCamelCase | 是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。 |  |  |


### ★ **#{}  ${}形式的区别**

Mybatis会将SQL语句中的#{}转换为问号占位符。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717927915658-caf7821f-6e8b-4427-99d1-6d6bf482fc9a.png#averageHue=%23f5f3f0&clientId=u7b96606c-6268-4&from=paste&height=486&id=ub9c59b48&originHeight=486&originWidth=1021&originalType=binary&ratio=1&rotation=0&showTitle=false&size=52952&status=done&style=none&taskId=u57441c86-9616-4a3c-a578-e08cdbd8ad1&title=&width=1021)
${}形式传参，底层Mybatis做的是字符串拼接操作。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717927920432-90ff64cc-0c42-483b-be43-fdcdea76bc10.png#averageHue=%23f6f4f0&clientId=u7b96606c-6268-4&from=paste&height=501&id=ud52b2753&originHeight=501&originWidth=1121&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46691&status=done&style=none&taskId=u39e6ed53-c639-4d22-a0e1-04e38e6e955&title=&width=1121)
结论：实际开发中，能用#{}实现的，肯定不用${}。

特殊情况： 动态的不是值，是列名或者关键字，需要使用${}拼接

### resultType

指定查询返回值类型！

resultType = "全限定符 ｜ 别名 ｜ 如果是返回集合类型，写范型类型即可"

别名通过xml配置进行设置

```xml
<typeAliases> <package name="xxx"/> </typeAliases>
```

### resultMap

```xml
<!-- 专门声明一个resultMap设定column到property之间的对应关系 -->
<resultMap id="selectEmployeeByRMResultMap" type="com.mybatis.mybatis.entity.Employee">

  <!-- 使用id标签设置主键列和主键属性之间的对应关系 -->
  <!-- column属性用于指定字段名；property属性用于指定Java实体类属性名 -->
  <id column="emp_id" property="empId"/>

  <!-- 使用result标签设置普通字段和Java实体类属性之间的关系 -->
  <result column="emp_name" property="empName"/>

  <result column="emp_salary" property="empSalary"/>

</resultMap>

<!-- Employee selectEmployeeByRM(Integer empId); -->
<select id="selectEmployeeByRM" resultMap="selectEmployeeByRMResultMap">

  select emp_id,emp_name,emp_salary from t_emp where emp_id=#{empId}

</select>
```

## 单表查询

声明pojo实体类

mapper 接口规范

```java
public interface UserMapper {
    List<User> queryScore();
    User queryById(Integer id);
    int insertUser(User user);
    int deleteUser(User user);
    int updataUser(User user);
}
```

utils 单例sql连接

```java
public class SqlSessionUtils {
    private static SqlSessionFactory sqlSessionFactory;

    static {
        InputStream ips = null;
        try {
            ips = Resources.getResourceAsStream("mybatis-config.xml");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(ips);
    }
    public static SqlSession openSession(){
        return sqlSessionFactory.openSession();
    }
    public static SqlSession openAutoSession(){
        return sqlSessionFactory.openSession(true);
    }
    public static void closeSession(SqlSession sqlSession){
        sqlSession.close();
    }
}
```

mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
<!--        <setting name="logimpl" value="STDOUT_LOGGING"/>-->
<!--        <setting name="autoMappingBehavior" value="FULL"/>-->
<!--        <setting name="lazyLoadingEnabled" value="true"/>-->
<!--        <setting name="aggressiveLazyLoading" value="true"/>-->
    </settings>
    <typeAliases>
        <package name="com.xxx"/>
    </typeAliases>
    <!-- 数据库链接 -->
    <environments default="dev">
        <environment id="dev">
            <transactionManager type="jdbc"></transactionManager>
            <!-- 配置数据源 -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://192.168.1.2:3306/demo"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mappers/xxx.xml"/>
    </mappers>
</configuration>
```

resources/mappers/xxxMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.mybatisx.mapper.UserMapper">

    <insert id="insertUser">
        insert into user(u_name,u_age,u_gender,u_hooby)
        values(#{uname},#{uage},#{ugender},#{uhooby})
    </insert>

    <update id="updateUserByid">
        update user set u_gender=#{ugender} where u_id=#{uid}
    </update>
    <delete id="deleteByid">
        delete from user where u_id = #{uid}
    </delete>

    <select id="queryById" resultType="user">
        select u_id ,u_name ,u_age ,u_gender ,u_hooby  from user where u_id =#{uid}
    </select>
    <select id="queryHooby" resultType="com.mybatisx.pojo.User">
        select u_hooby from user where u_id = #{uid}
    </select>
    
    <!-- int insertEmployee(Employee employee); -->
<!-- useGeneratedKeys属性字面意思就是“使用生成的主键” -->
<!-- keyProperty属性可以指定主键在实体类对象中对应的属性名，Mybatis会将拿到的主键值存入这个属性 -->
<insert id="insertEmployee" useGeneratedKeys="true" keyProperty="empId">
  insert into t_emp(emp_name,emp_salary)
  values(#{empName},#{empSalary})
</insert>
    
</mapper>
```

## 多表映射查询
技巧:
对一  类属性中包含对方对象

对多  类属性中包含对方对象集合

只有真实发生多表查询是2,才会需要设计修改实体类,否则不提前和修改实体类

无论多少张表联查  实体类设计都是两两考虑

在查询映射的时候,只需要关注本次查询相关的属性

### 对一映射

需求说明

根据ID查询订单，以及订单关联的用户的信息！

OrderMapper接口

```java
public interface OrderMapper {
  Order selectOrderWithCustomer(Integer orderId);
}
```

OrderMapper.xml配置文件

```xml
<!-- 创建resultMap实现“对一”关联关系映射 -->
<!-- id属性：通常设置为这个resultMap所服务的那条SQL语句的id加上“ResultMap” -->
<!-- type属性：要设置为这个resultMap所服务的那条SQL语句最终要返回的类型 -->
<resultMap id="selectOrderWithCustomerResultMap" type="order">

  <!-- 先设置Order自身属性和字段的对应关系 -->
  <id column="order_id" property="orderId"/>

  <result column="order_name" property="orderName"/>

  <!-- 使用association标签配置“对一”关联关系 -->
  <!-- property属性：在Order类中对一的一端进行引用时使用的属性名 -->
  <!-- javaType属性：一的一端类的全类名 -->
  <association property="customer" javaType="customer">

    <!-- 配置Customer类的属性和字段名之间的对应关系 -->
    <id column="customer_id" property="customerId"/>
    <result column="customer_name" property="customerName"/>

  </association>

</resultMap>

<!-- Order selectOrderWithCustomer(Integer orderId); -->
<select id="selectOrderWithCustomer" resultMap="selectOrderWithCustomerResultMap">

  SELECT order_id,order_name,c.customer_id,customer_name
  FROM t_order o
  LEFT JOIN t_customer c
  ON o.customer_id=c.customer_id
  WHERE o.order_id=#{orderId}

</select>
```

### 对多映射

需求说明

查询客户和客户关联的订单信息！

CustomerMapper接口

```java
public interface CustomerMapper {

  Customer selectCustomerWithOrderList(Integer customerId);

}
```

CustomerMapper.xml文件

```java
<!-- 配置resultMap实现从Customer到OrderList的“对多”关联关系 -->
<resultMap id="selectCustomerWithOrderListResultMap"

  type="customer">

  <!-- 映射Customer本身的属性 -->
  <id column="customer_id" property="customerId"/>

  <result column="customer_name" property="customerName"/>

  <!-- collection标签：映射“对多”的关联关系 -->
  <!-- property属性：在Customer类中，关联“多”的一端的属性名 -->
  <!-- ofType属性：集合属性中元素的类型 -->
  <collection property="orderList" ofType="order">

    <!-- 映射Order的属性 -->
    <id column="order_id" property="orderId"/>

    <result column="order_name" property="orderName"/>

  </collection>

</resultMap>

<!-- Customer selectCustomerWithOrderList(Integer customerId); -->
<select id="selectCustomerWithOrderList" resultMap="selectCustomerWithOrderListResultMap">
  SELECT c.customer_id,c.customer_name,o.order_id,o.order_name
  FROM t_customer c
  LEFT JOIN t_order o
  ON c.customer_id=o.customer_id
  WHERE c.customer_id=#{customerId}
</select>
```

## 多表分步查询

mybatis的多表操作有两种形式： 1. 多表结果映射（上一章节讲解） 2. 多表分步查询

**二者区别：**

- `多表结果映射`: 利用多表查询语句，一次将所有结果查到，利用resultMap直接将结果映射到实体类
- `多表分步查询`: 将多表查询分成若干个单表查询，在利用resultMap一一进行触发

**二者特点：**

- `多表结果映射` 
   - 一次多表查询
   - 结果一次映射
   - resultMap起到多表结果映射作用
   - sql语句相对复杂
   - sql语句执行一次
   - 不能配合延迟加载
   - 配合分页插件多表映射出现结果异常【分页数据不匹配】
- `多表分步查询` 
   - 多次单表查询
   - 结果多次映射
   - resultMap起到触发其余单表查询作用
   - sql语句相对简单
   - sql语句执行存在N+1问题： 可能会导致 N+1 查询问题，即在获取主对象时，需要额外执行 N 次查询来获取关联对象。
   - 可以配合延迟加载
   - 配合分页插件多表查询结果确保正确【对主查询分页，不影响子查询触发】

### 对一

需求

根据ID查询订单，以及订单关联的用户的信息！

Mapper接口实现
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717928652037-f1244d80-c9bf-4316-8d41-abbd033b483f.png#averageHue=%23ededed&clientId=u301388c8-742e-4&from=paste&height=433&id=u32f9436a&originHeight=433&originWidth=824&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39661&status=done&style=none&taskId=udaa0734d-ed3e-4841-97ce-44115247018&title=&width=824)
OrderMapper接口

```java
public interface OrderMapper {
    /**
     * 根据orderId查询订单和订单关联的客户信息
     * @param orderId
     * @return
     */
    Order queryById(Integer orderId);
}
```

CustomerMapper接口

```java
public interface CustomerMapper {
    /**
     * 根据客户id,查询客户对象
     * @param customerId
     * @return
     */
    Customer queryById(Integer customerId);
}
```

OrderMapperXML文件

```xml
<!-- 发起方：  Order queryById(Integer orderId); -->
    <resultMap id="orderMap" type="com.mybatis.pojo.Order">
        <id column="order_id" property="orderId" />
        <result column="order_name" property="orderName" />
        <result column="customer_id" property="customerId" />
        <!-- 触发分步查询依然使用 association collection，只不过属性不同而已！
             解释：
                association本次用来触发对一的分步查询
                property触发对一测试，查询结果装配到当前对象的属性名
                select只的是触发对一查询的标签id(namespace.id值)
                column触发分步查询要传入的参数列名（当前实体对象要将哪个参数传入到第二次查询，根据需求判定）
        -->
        <association property="customer" select="com.mybatis.mapper.CustomerMapper.queryById" column="customer_id" />
    </resultMap>

    <select id="queryById" resultMap="orderMap">
        SELECT * FROM t_order WHERE order_id  = #{orderId};
    </select>

    <!-- 触发方法： 分步查询被触发查询-->
    <select id="queryById" resultType="com.mybatis.pojo.Customer">
        SELECT * FROM t_customer
                    WHERE customer_id = #{id};
    </select>
```
### 对多

需求

查询所有客户，以及客户对应的订单集合信息
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717928775531-0d8bfe59-1aaf-40fb-9f89-feaa5de42739.png#averageHue=%23efeeee&clientId=u301388c8-742e-4&from=paste&height=826&id=ua679a845&originHeight=826&originWidth=1622&originalType=binary&ratio=1&rotation=0&showTitle=false&size=102030&status=done&style=none&taskId=u2b4f4d1c-097a-450d-933e-2632b5fdf64&title=&width=1622)
CustomerMapper接口

```java
public interface CustomerMapper {

    /**
     * 查询所有客户信息 【对多的发起方】
     * @return
     */
    List<Customer> queryAll();

}
```

OrderMapper接口

```xml
public interface OrderMapper {

    /**
     * 根据客户id查询对应的订单集合 【对多的触发方】
     * @param customerId
     * @return
     */
    List<Order> queryByCustomerId(Integer customerId);

}
```

CustomerMapperXML实现

```xml
<!-- 发起方-->
    <resultMap id="customerMap" type="com.mybatis.pojo.Customer">
        <id column="customer_id" property="customerId" />
        <result column="customer_name" property="customerName"/>
        <!-- 触发分步查询依然使用 association collection，只不过属性不同而已！
             解释：
                collection本次用来触发对多的分步查询（返回集合属性）
                property触发对一测试，查询结果装配到当前对象的属性名
                select只的是触发对一查询的标签id(namespace.id值)
                column触发分步查询要传入的参数列名（当前实体对象要将哪个参数传入到第二次查询，根据需求判定）
        -->
        <collection property="orderList" select="com.mybatis.mapper.OrderMapper.queryByCustomerId" column="customer_id" />
    </resultMap>

    <select id="queryAll" resultMap="customerMap">
        SELECT * FROM t_customer ;
    </select>

    <!-- 触发方：根据客户id,查询订单集合 -->
    <select id="queryByCustomerId" resultType="com.mybatis.pojo.Order">
        SELECT * FROM t_order WHERE customer_id  = #{customerId};
    </select>
```

### 延迟加载介绍
MyBatis 中的延迟加载（Lazy Loading）是一种性能优化策略，它允许在需要访问关联对象时才执行查询，而不是在执行主查询时就立即加载所有关联对象。这可以有效地减少不必要的数据库查询，提高系统性能。
需要注意以下两点：

- 延迟加载只对分步多表查询才有效果
- 延迟加载可能会导致数据回显不完全

 延迟加载属性设置:

| **设置名** | **描述** | **有效值** | **默认值** |
| --- | --- | --- | --- |
| lazyLoadingEnabled | 延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。 特定关联关系中可通过设置 fetchType 属性来覆盖该项的开关状态。 | true &#124; false | false |
| aggressiveLazyLoading | 开启时，任一方法的调用都会加载该对象的所有延迟加载属性。 否则，每个延迟加载属性会按需加载（参考 lazyLoadTriggerMethods)。 | true &#124; false | false （在 3.4.1 及之前的版本中默认为 true） |

## MyBatis动态语句

### where  / if

```xml
select emp_id,emp_name,emp_salary from t_emp
    <!-- where标签会自动去掉“标签体内前面多余的and/or” -->
    <where>
        <!-- 使用if标签，让我们可以有选择的加入SQL语句的片段。这个SQL语句片段是否要加入整个SQL语句，就看if标签判断的结果是否为true -->
        <!-- 在if标签的test属性中，可以访问实体类的属性，不可以访问数据库表的字段 -->
        <if test="empName != null">
            <!-- 在if标签内部，需要访问接口的参数时还是正常写#{} -->
            or emp_name=#{empName}
        </if>
        <if test="empSalary &gt; 2000">
            or emp_salary>#{empSalary}
        </if>
        <!--
         第一种情况：所有条件都满足 WHERE emp_name=? or emp_salary>?
         第二种情况：部分条件满足 WHERE emp_salary=?
         第三种情况：所有条件都不满足 没有where子句
         -->
    </where>
```

### set标签

```xml
 update t_emp
    <!-- set emp_name=#{empName},emp_salary=#{empSalary} -->
    <!-- 使用set标签动态管理set子句，并且动态去掉两端多余的逗号 -->
    <set>
        <if test="empName != null">
            emp_name=#{empName},
        </if>
        <if test="empSalary &lt; 3000">
            emp_salary=#{empSalary},
        </if>
    </set>
    where emp_id=#{empId}
    <!--
         第一种情况：所有条件都满足 SET emp_name=?, emp_salary=?
         第二种情况：部分条件满足 SET emp_salary=?
         第三种情况：所有条件都不满足 update t_emp where emp_id=?
            没有set子句的update语句会导致SQL语法错误
     -->
```

### trim标签

使用trim标签控制条件部分两端是否包含某些字符

- prefix属性：指定要动态添加的前缀
- suffix属性：指定要动态添加的后缀
- prefixOverrides属性：指定要动态去掉的前缀，使用“|”分隔有可能的多个值
- suffixOverrides属性：指定要动态去掉的后缀，使用“|”分隔有可能的多个值

```xml
<!-- List<Employee> selectEmployeeByConditionByTrim(Employee employee) -->
<select id="selectEmployeeByConditionByTrim" resultType="com.mybatis.mybatis.entity.Employee">
    select emp_id,emp_name,emp_age,emp_salary,emp_gender
    from t_emp
    
    <!-- prefix属性指定要动态添加的前缀 -->
    <!-- suffix属性指定要动态添加的后缀 -->
    <!-- prefixOverrides属性指定要动态去掉的前缀，使用“|”分隔有可能的多个值 -->
    <!-- suffixOverrides属性指定要动态去掉的后缀，使用“|”分隔有可能的多个值 -->
    <!-- 当前例子用where标签实现更简洁，但是trim标签更灵活，可以用在任何有需要的地方 -->
    <trim prefix="where" suffixOverrides="and|or">
        <if test="empName != null">
            emp_name=#{empName} and
        </if>
        <if test="empSalary &gt; 3000">
            emp_salary>#{empSalary} and
        </if>
        <if test="empAge &lt;= 20">
            emp_age=#{empAge} or
        </if>
        <if test="empGender=='male'">
            emp_gender=#{empGender}
        </if>
    </trim>
</select>
```

### choose/when/otherwise标签

在多个分支条件中，仅执行一个。

- 从上到下依次执行条件判断
- 遇到的第一个满足条件的分支会被采纳
- 被采纳分支后面的分支都将不被考虑
- 如果所有的when分支都不满足，那么就执行otherwise分支

```xml
<select id="selectEmployeeByConditionByChoose" resultType="com.mybatis.mybatis.entity.Employee">
    select emp_id,emp_name,emp_salary from t_emp
    where
    <choose>
        <when test="empName != null">emp_name=#{empName}</when>
        <when test="empSalary &lt; 3000">emp_salary &lt; 3000</when>
        <otherwise>1=1</otherwise>
    </choose>
    
    <!--
     第一种情况：第一个when满足条件 where emp_name=?
     第二种情况：第二个when满足条件 where emp_salary < 3000
     第三种情况：两个when都不满足 where 1=1 执行了otherwise
     -->
</select>
```

### foreach标签

```xml
<!--
    collection属性：要遍历的集合
    item属性：遍历集合的过程中能得到每一个具体对象，在item属性中设置一个名字，将来通过这个名字引用遍历出来的对象
    separator属性：指定当foreach标签的标签体重复拼接字符串时，各个标签体字符串之间的分隔符
    open属性：指定整个循环把字符串拼好后，字符串整体的前面要添加的字符串
    close属性：指定整个循环把字符串拼好后，字符串整体的后面要添加的字符串
    index属性：这里起一个名字，便于后面引用
        遍历List集合，这里能够得到List集合的索引值
        遍历Map集合，这里能够得到Map集合的key
 -->
<foreach collection="empList" item="emp" separator="," open="values" index="myIndex">
    <!-- 在foreach标签内部如果需要引用遍历得到的具体的一个对象，需要使用item属性声明的名称 -->
    (#{emp.empName},#{myIndex},#{emp.empSalary},#{emp.empGender})
</foreach>
```

**批量更新时需要注意**

上面批量插入的例子本质上是一条SQL语句，而实现批量更新则需要多条SQL语句拼起来，用分号分开。也就是一次性发送多条SQL语句让数据库执行。此时需要在数据库连接信息的URL地址中设置：

```
mybatis.dev.url=jdbc:mysql:///mybatis-example?allowMultiQueries=true
```

对应的foreach标签如下：

```xml
<!-- int updateEmployeeBatch(@Param("empList") List<Employee> empList) -->
<update id="updateEmployeeBatch">
    <foreach collection="empList" item="emp" separator=";">
        update t_emp set emp_name=#{emp.empName} where emp_id=#{emp.empId}
    </foreach>
</update>
```

**关于foreach标签的collection属性**

如果没有给接口中List类型的参数使用@Param注解指定一个具体的名字，那么在collection属性中默认可以使用collection或list来引用这个list集合。这一点可以通过异常信息看出来：

```xml
Parameter 'empList' not found. Available parameters are [arg0, collection, list]
```

在实际开发中，为了避免隐晦的表达造成一定的误会，建议使用@Param注解明确声明变量的名称，然后在foreach标签的collection属性中按照@Param注解指定的名称来引用传入的参数。

### sql片段

**抽取重复的SQL片段**

```xml
<!-- 使用sql标签抽取重复出现的SQL片段 -->
<sql id="mySelectSql">
    select emp_id,emp_name,emp_age,emp_salary,emp_gender from t_emp
</sql>
```

引用已抽取的SQL片段

```xml
<!-- 使用include标签引用声明的SQL片段 -->
<include refid="mySelectSql"/>
```
## mybatis高级拓展
### Mapper批量映射优化

1. 需求

Mapper 配置文件很多时，在全局配置文件中一个一个注册太麻烦，希望有一个办法能够一劳永逸。

2. 配置方式

Mybatis 允许在指定 Mapper 映射文件时，只指定其所在的包：
```xml
<mappers>
  <package name="com.mybatis.mapper"/>
</mappers>
```
此时这个包下的所有 Mapper 配置文件将被自动加载、注册，比较方便。

3. 资源创建要求
- Mapper 接口和 Mapper 配置文件名称一致
   - Mapper 接口：EmployeeMapper.java
   - Mapper 配置文件：EmployeeMapper.xml
   - ![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717929351397-09730dde-abe9-462e-8dbf-296c68c5fb87.png#averageHue=%23e7e6e5&clientId=u301388c8-742e-4&from=paste&height=441&id=ua84d300e&originHeight=441&originWidth=697&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33937&status=done&style=none&taskId=u6f1e00e6-d040-4019-ac0e-395d86ddd45&title=&width=697)
- Mapper 配置文件放在 Mapper 接口所在的包内
   - 可以将mapperxml文件放在mapper接口所在的包！
   - 可以在sources下创建mapper接口包一致的文件夹结构存放mapperxml文件

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1717929363000-caa2be0d-7882-4a21-bdf0-bfe08ddec816.png#averageHue=%23eeeceb&clientId=u301388c8-742e-4&from=paste&height=398&id=u864c9fb1&originHeight=398&originWidth=534&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28126&status=done&style=none&taskId=u29556e52-2fee-4682-9c1f-8171e02b614&title=&width=534)
### 插件和分页插件PageHelper
#### 插件机制和PageHelper插件介绍MyBatis 对插件进行了标准化的设计，并提供了一套可扩展的插件机制。插件可以在用于语句执行过程中进行拦截，并允许通过自定义处理程序来拦截和修改 SQL 语句、映射语句的结果等。

具体来说，MyBatis 的插件机制包括以下三个组件：

1. `Interceptor`（拦截器）：定义一个拦截方法 `intercept`，该方法在执行 SQL 语句、执行查询、查询结果的映射时会被调用。
2. `Invocation`（调用）：实际上是对被拦截的方法的封装，封装了 `Object target`、`Method method` 和 `Object[] args` 这三个字段。
3. `InterceptorChain`（拦截器链）：对所有的拦截器进行管理，包括将所有的 Interceptor 链接成一条链，并在执行 SQL 语句时按顺序调用。

插件的开发非常简单，只需要实现 Interceptor 接口，并使用注解 `@Intercepts` 来标注需要拦截的对象和方法，然后在 MyBatis 的配置文件中添加插件即可。

PageHelper 是 MyBatis 中比较著名的分页插件，它提供了多种分页方式（例如 MySQL 和 Oracle 分页方式），支持多种数据库，并且使用非常简单。下面就介绍一下 PageHelper 的使用方式。

#### PageHelper插件使用

1.  pom.xml引入依赖 
```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.11</version>
</dependency>
```
 

2.  mybatis-config.xml配置分页插件
在 MyBatis 的配置文件中添加 PageHelper 的插件： 
```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
        <property name="helperDialect" value="mysql"/>
    </plugin>
</plugins>
```

其中，`com.github.pagehelper.PageInterceptor` 是 PageHelper 插件的名称，`dialect` 属性用于指定数据库类型（支持多种数据库） 

3.  页插件使用
在查询方法中使用分页： 
```java
@Test
public void testTeacherRelationshipToMulti() {

    TeacherMapper teacherMapper = session.getMapper(TeacherMapper.class);

    PageHelper.startPage(1,2);
    // 查询Customer对象同时将关联的Order集合查询出来
    List<Teacher> allTeachers = teacherMapper.findAllTeachers();
//
    PageInfo<Teacher> pageInfo = new PageInfo<>(allTeachers);

    System.out.println("pageInfo = " + pageInfo);
    long total = pageInfo.getTotal(); // 获取总记录数
    System.out.println("total = " + total);
    int pages = pageInfo.getPages();  // 获取总页数
    System.out.println("pages = " + pages);
    int pageNum = pageInfo.getPageNum(); // 获取当前页码
    System.out.println("pageNum = " + pageNum);
    int pageSize = pageInfo.getPageSize(); // 获取每页显示记录数
    System.out.println("pageSize = " + pageSize);
    List<Teacher> teachers = pageInfo.getList(); //获取查询页的数据集合
    System.out.println("teachers = " + teachers);
    teachers.forEach(System.out::println);

}
```
  
# 原理
## Dao 接口的工作原理是什么？Dao 接口里的方法，参数不同时，方法能重载吗？
 通常一个 xml 映射文件，都会写一个 Dao 接口与之对应。Dao 接口就是人们常说的 Mapper 接口，接口的全限名，就是映射文件中的 namespace 的值(Dao实体类)，接口的方法名，就是映射文件中 MappedStatement 的 id 值(方法名)，接口方法内的参数，就是传递给 sql 的参数。 Mapper 接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为 key 值，可唯一定位一个 MappedStatement ，

举例：com.mybatis3.mappers. StudentDao.findStudentById ，可以唯一找到 namespace 为 com.mybatis3.mappers. StudentDao 下面 id = findStudentById 的 MappedStatement 每一个 <select>、 //\<insert>、\<update>、 \<delete> 标签，都会被解析为一个 MappedStatement 对象。

Dao 接口里的方法可以重载，但是 Mybatis 的 xml 里面的 ID 不允许重复。
Dao 接口方法可以重载，但是需要满足以下条件：

1. 仅有一个无参方法和一个有参方法
2. 多个有参方法时，参数数量必须一致

## MyBatis 是如何进行分页的？分页插件的原理是什么？

答：**(1)** MyBatis 使用 RowBounds 对象进行分页，它是针对 ResultSet 结果集执行的内存分页，而非物理分页；**(2)** 可以在 sql 内直接书写带有物理分页的参数来完成物理分页功能，**(3)** 也可以使用分页插件来完成物理分页。
分页插件的基本原理是使用 MyBatis 提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的 sql，然后重写 sql，根据 dialect 方言，添加对应的物理分页语句和物理分页参数。
举例：select _ from student ，拦截 sql 后重写为：select t._ from （select \* from student）t limit 0，10

## MyBatis 是如何将 sql 执行结果封装为目标对象并返回的？都有哪些映射形式？

答：第一种是使用 <resultMap> 标签，逐一定义列名和对象属性名之间的映射关系。第二种是使用 sql 列的别名功能，将列别名书写为对象属性名，比如 T_NAME AS NAME，对象属性名一般是 name，小写，但是列名不区分大小写，MyBatis 会忽略列名大小写，智能找到与之对应对象属性名，你甚至可以写成 T_NAME AS NaMe，MyBatis 一样可以正常工作。
有了列名与属性名的映射关系后，MyBatis 通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，那些找不到映射关系的属性，是无法完成赋值的。

## MyBatis 能执行一对一、一对多的关联查询吗？都有哪些实现方式，以及它们之间的区别
答：能，MyBatis 不仅可以执行一对一、一对多的关联查询，还可以执行多对一，多对多的关联查询，多对一查询，其实就是一对一查询，只需要把 selectOne() 修改为 selectList() 即可；多对多查询，其实就是一对多查询，只需要把 selectOne() 修改为 selectList() 即可。
关联对象查询，有两种实现方式，一种是单独发送一个 sql 去查询关联对象，赋给主对象，然后返回主对象。另一种是使用嵌套查询，嵌套查询的含义为使用 join 查询，一部分列是 A 对象的属性值，另外一部分列是关联对象 B 的属性值，好处是只发一个 sql 查询，就可以把主对象和其关联对象查出来。
那么问题来了，join 查询出来 100 条记录，如何确定主对象是 5 个，而不是 100 个？其去重复的原理是 <resultMap> 标签内的 <id> 子标签，指定了唯一确定一条记录的 id 列，MyBatis 根据 <id> 列值来完成 100 条记录的去重复功能， <id> 可以有多个，代表了联合主键的语意。
同样主对象的关联对象，也是根据这个原理去重复的，尽管一般情况下，只有主对象会有重复记录，关联对象一般不会重复。
举例：下面 join 查询出来 6 条记录，一、二列是 Teacher 对象列，第三列为 Student 对象列，MyBatis 去重复处理后，结果为 1 个老师 6 个学生，而不是 6 个老师 6 个学生。

| t_id | t_name | s_id |
| --- | --- | --- |
| 1 | teacher | 38 |
| 1 | teacher | 39 |
| 1 | teacher | 40 |
| 1 | teacher | 41 |
| 1 | teacher | 42 |
| 1 | teacher | 43 |

## MyBatis 是否支持延迟加载？如果支持，它的实现原理是什么？

答：MyBatis 仅支持 association 关联对象和 collection 关联集合对象的延迟加载，association 指的就是一对一，collection 指的就是一对多查询。在 MyBatis 配置文件中，可以配置是否启用延迟加载 lazyLoadingEnabled=true|false。
它的原理是，使用 CGLIB 创建目标对象的代理对象，当调用目标方法时，进入拦截器方法，比如调用 a.getB().getName() ，拦截器 invoke() 方法发现 a.getB() 是 null 值，那么就会单独发送事先保存好的查询关联 B 对象的 sql，把 B 查询上来，然后调用 a.setB(b)，于是 a 的对象 b 属性就有值了，接着完成 a.getB().getName() 方法的调用。这就是延迟加载的基本原理。
当然了，不光是 MyBatis，几乎所有的包括 Hibernate，支持延迟加载的原理都是一样的。
### 
