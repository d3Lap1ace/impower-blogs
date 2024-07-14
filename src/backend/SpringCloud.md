# SpringCloud
# 系统架构演进
## 单体架构
早期的软件系统通常是基于单体应用架构设计的，也就是将整个系统作为一个单一的、可执行的应用程序来构建和维护。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719388728764-b506f80f-db1f-4134-af39-ab62914a43d3.png#averageHue=%23f8f8f8&clientId=u03e7ac88-2341-4&from=paste&height=281&id=u982f91bc&originHeight=281&originWidth=1024&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26029&status=done&style=none&taskId=u10d5825f-1485-4497-adb0-a44c355d071&title=&width=1024)
单体架构具有以下优点：
1、简单：单体架构模式相对于其他复杂的架构来说，其结构简单易用，便于新手学习和应用。
2、易于维护：由于整个应用程序都在一个代码库中，因此很容易对其进行维护和更新。
3、易于部署：单个可执行文件可以在任何支持运行该语言的环境中运行，并且部署也相对轻松。
然而，单体架构也存在一些缺点：
1、扩展性差：单体应用程序所有功能都在一个程序中实现，因此扩展功能时需要新增或修改源代码，并重新部署整个应用程序，这可能会导致系统不稳定和长时间停机。
2、可靠性低：由于单体应用程序集成了所有的逻辑和组件，因此如果其中有一个非常重要的组件出现故障，则可能导致从整个系统崩溃。
3、风险高：单体应用程序中的错误往往比较难以调试，因为代码复杂度高且耦合度强。 综上所述，单体架构适用于小型、简单的软件系统，但是对于大型、复杂的系统来说，单体架构面临诸多挑战，需要采用其他更加灵活和可扩展的架构模式。
## 分布式和集群
分布式：由多台服务器构成的网络环境，在分布式环境下每一台服务器的功能是不一样的。
集群： 由多台服务器构成的网络环境，在集群环境下每一台服务器的功能是一样的。
分布式环境中每一台服务器都可以做集群，如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719388802752-3582dda1-69ff-4215-942a-9a69fd4513fa.png#averageHue=%23f9f7f7&clientId=u03e7ac88-2341-4&from=paste&height=465&id=u64f2d1ec&originHeight=465&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56727&status=done&style=none&taskId=uc631c65c-26fe-461a-8c3c-afb6e8df301&title=&width=1080)

## 微服务架构
**分布式系统架构**是指将一个软件系统分割成多个独立的服务，并且这些服务可以在不同的计算机或服务器上运行，并通过网络进行通信。
**微服务系统架构**：本质上也属于分布式系统架构，在微服务系统架构中，更加重视的是服务拆分粒度。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719388765412-68920410-22b0-4bb6-8b36-718d62ab58e8.png#averageHue=%23f8f7f7&clientId=u03e7ac88-2341-4&from=paste&height=332&id=u19dab78a&originHeight=332&originWidth=1068&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38681&status=done&style=none&taskId=u8d292ed0-700b-4f5d-9ade-9d3e8603884&title=&width=1068)
微服务架构的特点：
1、单一职责：微服务拆分粒度更小，每一个服务都对应唯一的业务能力，做到单一职责
2、自治：团队独立、技术独立、数据独立，独立部署和交付
3、面向服务：服务提供统一标准的接口，与语言和技术无关
微服务系统架构的优点：
1、可扩展性好：由于系统中的不同组件可以独立地进行扩展和升级，从而提高了整个系统的扩展性和可靠性。
2、容错性高：由于系统中的组件可以在不同的计算机或服务器上运行，因此即使某些节点出现故障也不会影响整个系统的运行。
3、高效性强：分布式系统可以将负载和任务分配到不同的节点上，从而提高系统的并发能力和处理速度。
4、灵活性强：分布式系统可以支持多种编程语言和应用程序框架，并且可以利用各种云计算技术，如Docker、Kubernetes等。
微服务系统架构的存在的问题：
1、微服务的管理：这些微服务如果没有进行统一的管理，那么维护性就会极差。
2、服务间的通讯：微服务之间肯定是需要进行通讯，比如购物车微服务需要访问商品微服务。
3、前端访问问题：由于每一个微服务都是部署在独立的一台服务器的，每一个微服务都存在一个对应的端口号，前端在访问指定微服务的时候肯定需要指定微服务的ip地址和端口号，难道需要在前端维护每一个微服务的ip地址和端口号?
4、配置文件管理：当构建服务集群的时候，如果每一个微服务的配置文件还是和微服务进行绑定，那么维护性就极差。


# 注册中心

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719389509818-dc6679cc-fc26-478b-818f-072f4ff635ee.png#averageHue=%23f6f6f5&clientId=u03e7ac88-2341-4&from=paste&height=191&id=u6f67c9f9&originHeight=191&originWidth=974&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41706&status=done&style=none&taskId=u5f6db5dc-df1c-4de7-b3cf-7b7fddd7e6e&title=&width=974)
工作流程说明：
1、服务提供方在启动的时候，会向注册中心注册自己服务的详情信息(ip、端口号等)。在注册中心中会维护一张服务清单，保存这些注册信息，注册中心需要以心跳的方式去监测清单中的服务是否可用，如果不可用，需要在服务清单中剔除不可用的服务。
2、服务消费方向服务注册中心咨询服务，并获取所有服务的实例清单，然后按照指定的负载均衡算法从服务清单中选择一个服务实例进行访问。

exp:
在查询订单时候需要将订单所属用户的信息也一并查询出来。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719396399903-6a3e5130-d36c-4112-990b-d4247c5a27e2.png#averageHue=%23f9f7f6&clientId=u03e7ac88-2341-4&from=paste&height=400&id=ua146d095&originHeight=400&originWidth=1065&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45588&status=done&style=none&taskId=uaa5758fc-09a5-4abd-a9f2-2bc000d2167&title=&width=1065)
## 传统调用
编写pojo类
在order微服务的Spring容器中注册一个**RestTemplate**
```java
// com.atguigu.spzx.cloud.order.config;
@Configuration
public class RestTemplateConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate() ;
    }

}
```
修改order服务中的OrderService类中的findOrderByOrderId方法，根据Order对象中的userId查询User
```java
@Data
public class Order {

    private Long id ;
    private Long userId ;
    private String name ;
    private BigDecimal price ;
    private Integer num ;

    private User user;
}
```
具体实现
```java
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired          // 注入RestTemplate远程调用工具
    private RestTemplate restTemplate ;

    @Autowired
    private OrderMapper orderMapper ;

    @Override
    public Order findOrderByOrderId(Long orderId) {

        // 根据id查询订单数据
        Order order = orderMapper.findOrderByOrderId(orderId);

        // 发起远程调用
        User user = restTemplate.getForObject("http://localhost:10100/api/user/findUserByUserId/" + order.getUserId(), User.class);
        order.setUser(user);

        // 返回订单数据
        return order;
    }

}
```
### 问题说明
1、维护性差：服务提供方的ip地址发生了改变，那么此时服务的消费方就需要更改代码
2、缺少负载均衡机制：负载均衡就是负载【请求】通过多台服务器进行处理

没有负载均衡机制的调用流程图：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719396663496-24fec2d7-02c6-4a6a-8610-8a34d97ba083.png#averageHue=%23f7f1f0&clientId=u03e7ac88-2341-4&from=paste&height=133&id=u7c7c34b6&originHeight=133&originWidth=1042&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13617&status=done&style=none&taskId=u5565a2fb-cbd6-4178-92cd-1696f7df151&title=&width=1042)
用户发送了3次请求，3次请求是通过一个用户微服务进行处理的，在高并发访问的情况下，用户微服务很有可能出现宕机。
有负载均衡机制的调用流程图：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719396682490-31e7ab6f-e6f0-455e-807f-9a9e81c7acc4.png#averageHue=%23f8f1f0&clientId=u03e7ac88-2341-4&from=paste&height=212&id=u99c63ed2&originHeight=212&originWidth=1041&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19630&status=done&style=none&taskId=u1deb72f9-f87e-4b52-9744-8fec7850504&title=&width=1041)
用户发送了3次请求，3次请求是通过多个用户微服务进行处理的，在高并发访问的情况下，每一个用户微服务只需要承担一小部分的请求即可

## Nacos
### docker - Nacos
```powershell
# 拉取镜像
docker pull nacos/nacos-server:v2.2.2

# 创建容器
docker run --name nacos -e MODE=standalone -p 8848:8848 -p 9848:9848 -d nacos/nacos-server:v2.2.2

# nacos2.x的版本新增了一个客户端与服务端的gRpc的通讯端口号9848
```

依赖以及配置
```java
<!-- nacos作为注册中心的依赖 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>


spring:
  # 配置nacos注册中心的地址
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
  application:
    name: spzx-cloud-user   # 每一个服务注册到nacos注册中心都需要提供一个服务名称,order微服务注册的时候需要更改微服务名称
```

## 高级特性
### 服务集群
在实际生产环境中，为了保证每一个服务的高可用，那么此时就需要去构建服务集群，但是并不是说把所有的服务都部署在一个机房里。而是将多个服务分散的部署到不同的机房中，每一个机房的服务可以看做成是一个集群。如下所示：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719405563773-1dac5e05-6ea5-41d6-938b-121430c0edce.png#averageHue=%23f9f2f0&clientId=u774ecf7d-127d-4&from=paste&height=499&id=uca5b4439&originHeight=499&originWidth=972&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50404&status=done&style=none&taskId=u04fa62c2-b0d5-473f-90dc-b634386a964&title=&width=972)
微服务互相访问时，应该尽可能访问同集群实例，因为本地访问速度更快。当本集群内不可用时，才访问其它集群。例如：上海机房内的order微服务应该优先访问同机房的user微服务。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719405566042-5de2b161-17d0-4f28-8280-16ed43148bfb.png#averageHue=%23f6e4e2&clientId=u774ecf7d-127d-4&from=paste&height=232&id=u7b9bd723&originHeight=232&originWidth=996&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17902&status=done&style=none&taskId=u9b6d4ff1-1eba-4334-b953-444e888f455&title=&width=996)
#### 集群配置

- 修改spzx-cloud-user的application.yml文件，添加集群配置：
```yaml
spring:
  cloud:
    nacos:
      discovery:
        cluster-name: SH		# 配置服务所属集群
```
#### 集群访问
order微服务在loadbalancer组件中集成nacos
```yaml
spring:
  # 配置nacos注册中心的地址
  cloud:
    loadbalancer:
      nacos:    # 集成nacos的负载均衡算法
        enabled: true
```
### 权重配置
权重取值范围：0~100

- 在配置文件中进行权重配置：
```yaml
spring:
  cloud:
    nacos:
      discovery:
        weight: 0.1
```
**注意**：如果权重修改为0，则该实例永远不会被访问
### 环境隔离
在nacos是通过**namespace**来实现多环境的隔离。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719405768127-9e10996c-1d2a-4f9c-a31c-acc89ee7c1de.png#averageHue=%23f8f8f8&clientId=u774ecf7d-127d-4&from=paste&height=487&id=u1b0ea4b7&originHeight=487&originWidth=1209&originalType=binary&ratio=1&rotation=0&showTitle=false&size=87376&status=done&style=none&taskId=ucb7cdcc1-2453-45ae-852c-f3622d3ca5b&title=&width=1209)
namespace + group 才可以确定具体的微服务实例。默认情况下，所有service、group都在同一个namespace，名为public。
#### 微服务配置名称空间
给微服务添加名称空间的配置，来指定该微服务所属环境。
例如，修改spzx-cloud-order的application.yml文件：
```yaml
spring:
  # 配置nacos注册中心的地址
  cloud:
    nacos:
      discovery:
        namespace: 4a88035e-acf3-45a9-924f-2421acbff67a  # 配置服务实例所属名称空间
```
此时order微服务所对应的服务实例就属于新的名称空间，user微服务所对应的服务实例属于public的名称空间，那么此时在进行远程调用的时候，就会出现如下的错误：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719405842118-20f478a4-0cd5-4904-a7bc-41c189bc008f.png#averageHue=%23f4eeea&clientId=u774ecf7d-127d-4&from=paste&height=219&id=ucb0ac77c&originHeight=219&originWidth=1140&originalType=binary&ratio=1&rotation=0&showTitle=false&size=81710&status=done&style=none&taskId=ubf9d2224-a1db-4a83-9dba-bd4f2daccb9&title=&width=1140)
### 实例类型
Nacos中的服务实例存在两种类型：
1、临时实例：如果实例宕机超过一定时间，会从服务列表剔除，并且实例会定时上报自身的健康状态给Nacos注册中心，默认的类型。
2、非临时实例：如果实例宕机，不会从服务列表剔除，Nacos注册中心会主动询问实例的健康状态，也可以叫永久实例。
配置一个服务实例为永久实例：
```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false  # 配置该实例为非临时实例
```
# LoadBalancer
Spring Cloud LoadBalancer是Spring Cloud中负责客户端负载均衡的模块，其主要原理是通过选择合适的服务实例来实现负载均衡。
客户端负载均衡：就是负载均衡算法由客户端提供
如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719405963686-0c3e4dc1-6051-48ca-90ef-0c65825160ca.png#averageHue=%23f8ea9e&clientId=u774ecf7d-127d-4&from=paste&height=465&id=u23e16c66&originHeight=465&originWidth=1034&originalType=binary&ratio=1&rotation=0&showTitle=false&size=57014&status=done&style=none&taskId=u16ae6bca-448d-47af-8f45-b48932cd38b&title=&width=1034)
## LoadBalancer原理
Spring Cloud LoadBalancer的底层采用了一个拦截器【LoadBalancerInterceptor】，拦截了RestTemplate发出的请求，对地址做了修改。用一幅图来总结一下：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719405990299-7248ff4e-a793-46d6-ada3-94fa6d366c27.png#averageHue=%23f8f7f7&clientId=u774ecf7d-127d-4&from=paste&height=429&id=u1e966329&originHeight=429&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43928&status=done&style=none&taskId=u3f007712-2845-40c2-8d43-d31c6970647&title=&width=1080)
执行流程说明：
1、通过LoadBalancerInterceptor请求拦截器拦截我们的RestTemplate请求：[http://spzx-cloud-user/api/user/findUserByUserId/1](http://spzx-cloud-user/api/user/findUserByUserId/1)
2、获取请求的url，然后从请求的url中获取服务提供方的主机名称
3、然后调用LoadBalancerClient中的execute方法，将服务提供方的名称传递过去
4、在LoadBalancerClient的choose方法中通过ReactiveLoadBalancer.Factory从Nacos注册中心中获取服务列表以及负载均衡算法实例对象
5、通过ReactiveLoadBalancer从服务列表中选择一个服务实例地址，然后发起远程调用
## 更改负载均衡算法

1. 在spring容器中注册一个bean
```java
public class CustomLoadBalancerConfiguration {

    /**
     * @param environment: 用于获取环境属性配置，其中LoadBalancerClientFactory.PROPERTY_NAME表示该负载均衡器要应用的服务名称。
     * @param loadBalancerClientFactory: 是Spring Cloud中用于创建负载均衡器的工厂类，通过getLazyProvider方法获取ServiceInstanceListSupplier对象，以提供可用的服务列表。
     * ServiceInstanceListSupplier：用于提供ServiceInstance列表的接口，可以从DiscoveryClient或者其他注册中心中获取可用的服务实例列表。
     * @return
     */
    @Bean
    ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(Environment environment, LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class), name);
    }
}
```
2、配置负载均衡算法的使用者
```java
@Configuration
@LoadBalancerClients(value = {
        @LoadBalancerClient(name = "spzx-cloud-user" , configuration = CustomLoadBalancerConfiguration.class)      // 将负载均衡算法应用到指定的服务提供方中
})
public class RestTemplateConfiguration {

    @Bean
    @LoadBalanced       // 让RestTemplate具有负载均衡的能力
    public RestTemplate restTemplate() {
        return new RestTemplate() ;
    }

}
```
# OpenFeign组件
feign是一个声明式的http客户端
使用RestTemplate 传参不太方便
## 使用步骤

1. 导入依赖
```xml
<!-- 加入OpenFeign的依赖 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

2. 在启动类加上注解enableFeignClients  扫描FeiginClinet
3. 编写OpenFeign的客户端
```java
@FeignClient(value = "spzx-cloud-user")		// 声明当前接口是一个访问user-service的feign的客户端
public interface UserFeignClient {

    @GetMapping("/api/user/findUserByUserId/{userId}")
    public abstract User queryById(@PathVariable("userId") Long userId) ;	// 根据userId查询用户信息的接口方法

}
```

4. 修改OrderService中的远程调用代码，使用Feign客户端代替RestTemplate：
```java
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper ;

    @Autowired
    private UserFeignClient userFeignClient ;

    @Override
    public Order findOrderByOrderId(Long orderId) {
        Order order = orderMapper.findOrderByOrderId(orderId);

		// 远程调用
        User user = userFeignClient.queryById(order.getUserId());
        order.setUser(user);
        return order ;
    }
}
```
## OpenFeign自定义配置
### 日志配置
| 类型 | 作用 | 说明 |
| --- | --- | --- |
| **feign.Logger.Level** | 修改日志级别 | 包含四种不同的级别：NONE、BASIC、HEADERS、FULL |
| feign.codec.Decoder | 响应结果的解析器 | http远程调用的结果做解析，例如解析json字符串为java对象 |
| feign.codec.Encoder | 请求参数编码 | 将请求参数编码，便于通过http请求发送 |
| feign.Contract | 支持的注解格式 | 默认是SpringMVC的注解 |
| feign.Retryer | 失败重试机制 | 请求失败的重试机制，默认是没有，不过会使用Ribbon的重试 |

一般情况下，默认值就能满足我们使用，如果要自定义时，只需要创建自定义的@Bean覆盖默认Bean即可。
#### 基于配置文件的方式
```yaml
# 将feign包下产生的日志的级别设置为debug
logging:
  level:
    com.impower.spzx.cloud.order.feign: debug
    
# openfeign日志级别配置
spring:
  cloud:
    openfeign:
      client:
        config: 
          default:  # 这里用default就是全局配置，如果是写服务名称，则是针对某个微服务的配置
            loggerLevel: full
```
而日志的级别分为四种：
① NONE：不记录任何日志信息，这是默认值。
② BASIC：仅记录请求的方法，URL以及响应状态码和执行时间
③ HEADERS：在BASIC的基础上，额外记录了请求和响应的头信息
④ FULL：记录所有请求和响应的明细，包括头信息、请求体、元数据。
#### Java代码的方式
```java
public class DefaultFeignConfiguration  {
    @Bean
    public Logger.Level feignLogLevel(){
        return Logger.Level.BASIC; // 日志级别为BASIC
    }
}
// 如果要全局生效，将其放到启动类的@EnableFeignClients这个注解中：
@EnableFeignClients(defaultConfiguration = DefaultFeignConfiguration .class) 
// 如果是局部生效，则把它放到对应的@FeignClient这个注解中：
@FeignClient(value = "spzx-cloud-user", configuration = DefaultFeignConfiguration .class)

```
### 超时配置

**超时机制概述**：Feign 的超时机制是指在使用 Feign 进行服务间的 HTTP 调用时，设置请求的超时时间。当请求超过设定的超时时间后，Feign 将会中断该请求并抛出相应的异常。
**超时机制的意义**：
1、防止长时间等待：通过设置适当的超时时间，可以避免客户端在请求服务时长时间等待响应而导致的性能问题。如果没有超时机制，客户端可能会一直等待，从而影响整个系统的吞吐量和响应时间。
2、避免资源浪费：超时机制可以帮助及时释放占用的资源，例如连接、线程等。如果请求一直处于等待状态而不超时，将导致资源的浪费和系统的负载增加。
3、优化用户体验：超时机制可以防止用户长时间等待无响应的情况发生，提供更好的用户体验。当请求超时时，可以及时给出错误提示或进行相应的处理，以提醒用户或采取其他措施。


超时时间越长，资源浪费的时间就越长，系统的稳定性就越差，因此需要设置为一个较为合理的超时时间，设置防止如下所示：
```yaml
spring:
  cloud:
    openfeign:
      client:
        config:
          default:
            loggerLevel: full	
            read-timeout: 2000			# 读取数据的超时时间设置为2s
            connect-timeout: 2000		# 建立连接的超时时间设置为2s
```
### 重试配置

1. 自定义重试器
```java
public class FeignClientRetryer implements Retryer {

    // 定义两个成员变量来决定重试次数
    private int start = 1 ;
    private int end = 3 ;

    @Override
    public void continueOrPropagate(RetryableException e) {     // 是否需要进行重试取决于该方法是否抛出异常，如果抛出异常重试结束
        if(start >= end) {
            throw new RuntimeException(e) ;
        }
        start++ ;
    }

    @Override
    public Retryer clone() {    // 框架底层调用该方法得到一个重试器
        return new FeignClientRetryer();
    }
}
```
2、配置重试器
```yaml
spring:
  cloud:
    openfeign:
      client:
        config:
          default:
            loggerLevel: full
            read-timeout: 2000
            connect-timeout: 2000
            retryer: com.atguigu.spzx.cloud.order.feign.FeignClientRetryer		# 配置自定义重试器
```
# Gateway
网关主要做了两件事情：**请求转发** + **请求过滤**
## 架构图
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719408009348-0a780993-cba8-45f3-a29c-86ed9f5c1376.png#averageHue=%23fbf7f7&clientId=u774ecf7d-127d-4&from=paste&height=572&id=u682ce92d&originHeight=572&originWidth=1410&originalType=binary&ratio=1&rotation=0&showTitle=false&size=147803&status=done&style=none&taskId=ub5391347-e416-4c9c-9db2-f80a850784c&title=&width=1410)
## 三大核心概念
### Route(路由)
路由是构建网关的基本模块，它由ID，目标URI，一系列的断言和过滤器组成，如果断言为true则匹配该路由
![](assets\image-20230721091801547.png#id=M1mzd&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719408099163-73b18274-26c6-4dd1-90af-e365083fe339.png#averageHue=%23faf8f6&clientId=u774ecf7d-127d-4&from=paste&height=92&id=u0d907cbe&originHeight=92&originWidth=1151&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18824&status=done&style=none&taskId=u7670e1fd-61d2-4d03-8a9c-109e89b5bdf&title=&width=1151)

### Predicate（断言）
参考的是java8的java.util.function.Predicate开发人员可以匹配HTTP请求中的所有内容（例如请求头或请求参数），如果请求与断言相匹配则进行路由
![](assets\image-20230721091835236.png#id=ylzYX&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719408104345-9de49092-e09a-4216-94f8-79bd50e75e84.png#averageHue=%23fcfaf8&clientId=u774ecf7d-127d-4&from=paste&height=88&id=uf8fdca6b&originHeight=88&originWidth=1193&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21149&status=done&style=none&taskId=uade5a4a5-5218-47b7-a326-1c496e3227b&title=&width=1193)

### Filter（过滤）
指的是Spring框架中GatewayFilter的实例，使用过滤器，可以在请求被路由前或者之后对请求进行修改。
![](assets\image-20230721091858141.png#id=ywXkJ&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none)![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719408110376-f234b83d-3fcd-452b-b575-21464d898e4e.png#averageHue=%23faf8f6&clientId=u774ecf7d-127d-4&from=paste&height=83&id=u6f10bfe7&originHeight=83&originWidth=1198&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18469&status=done&style=none&taskId=u71f1de43-ea7b-44c8-887d-8a9ae6af97d&title=&width=1198)
## 工作流程
![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719572822074-329e9e61-23f9-4e50-af62-85ca9a92a233.png#averageHue=%23fdfdfd&clientId=u3fced059-84ec-4&from=paste&id=ub446f7ee&originHeight=384&originWidth=1001&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6d1c8af1-eab8-4d5e-98bc-82a7f4d5f6d&title=)

具体的流程分析：

1. **路由判断**：客户端的请求到达网关后，先经过 Gateway Handler Mapping 处理，这里面会做断言（Predicate）判断，看下符合哪个路由规则，这个路由映射后端的某个服务。
2. **请求过滤**：然后请求到达 Gateway Web Handler，这里面有很多过滤器，组成过滤器链（Filter Chain），这些过滤器可以对请求进行拦截和修改，比如添加请求头、参数校验等等，有点像净化污水。然后将请求转发到实际的后端服务。这些过滤器逻辑上可以称作 Pre-Filters，Pre 可以理解为“在...之前”。
3. **服务处理**：后端服务会对请求进行处理。
4. **响应过滤**：后端处理完结果后，返回给 Gateway 的过滤器再次做处理，逻辑上可以称作 Post-Filters，Post 可以理解为“在...之后”。
5. **响应返回**：响应经过过滤处理后，返回给客户端。

总结：客户端的请求先通过匹配规则找到合适的路由，就能映射到具体的服务。然后请求经过过滤器处理后转发给具体的服务，服务处理后，再次经过过滤器处理，最后返回给客户端。

## Gateway快速入门

1. 导入依赖：
```xml
<!--网关-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

<!--nacos服务发现依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>

<!-- 负载均衡组件 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-loadbalancer</artifactId>
</dependency>
```

2. 编写启动类
```java
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
}
```

3. 在application.yml配置文件中编写基础配置和路由规则
```yaml
server:
  port: 8222
spring:
  application:
    name: spzx-cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
      routes:
        - id: spzx-cloud-user  # 路由id，可以自定义，只要唯一即可
          uri: lb://spzx-cloud-user  # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates:
            - Path=/*/user/** # 路径匹配
        - id: spzx-cloud-order
          uri: lb://spzx-cloud-order
          predicates:
            - Path=/*/order/** # 路径匹配
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```

4. 重启测试
## Predicate的使用
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719570899815-0443ef26-aa49-43e8-bd53-349644d617a5.png#averageHue=%23fefefe&clientId=u3fced059-84ec-4&from=paste&height=443&id=ue6287e6a&originHeight=443&originWidth=407&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34517&status=done&style=none&taskId=ub46fb663-1581-4a52-83e9-c8261b92ef4&title=&width=407)
有12个
Path After的使用:
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: spzx-cloud-user
          uri: lb://spzx-cloud-user
          predicates:
            - Path=/api/user/**
            - After=2023-07-21T10:23:06.978038800+08:00[Asia/Shanghai]  # 系统时间在2023-07-21之后才可以进行访问
```
## 过滤器
过滤器，可以对进入网关的请求和微服务返回的响应做处理
过滤器 Filter 按照请求和响应可以分为两种：

- **Pre 类型**：在请求被转发到微服务之前，对请求进行拦截和修改，例如参数校验、权限校验、流量监控、日志输出以及协议转换等操作。
- **Post 类型**：微服务处理完请求后，返回响应给网关，网关可以再次进行处理，例如修改响应内容或响应头、日志输出、流量监控等。

另外一种分类是按照过滤器 Filter 作用的范围进行划分：

- **GatewayFilter**：局部过滤器，应用在单个路由或一组路由上的过滤器。标红色表示比较常用的过滤器。
- **GlobalFilter**：全局过滤器，应用在所有路由上的过滤器。
### 局部过滤器
![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719575122332-1d7c8015-f52f-4f72-8f1b-aa9e5f973c91.png#averageHue=%23dadada&clientId=u3fced059-84ec-4&from=paste&id=uba99bfc1&originHeight=603&originWidth=1080&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf1009b2f-659b-4eb5-874d-88cd342a0e0&title=)
```yaml
# 如果 URL 匹配成功，则去掉 URL 中的 “api”。
filters: #过滤器
  - RewritePath=/api/(?<segment>.*),/$\{segment} # 将跳转路径中包含的 “api” 替换成空

```
### 全局过滤器
![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719575337552-a75e5b00-4281-4a2d-8f25-e2c332b474a2.png#averageHue=%23aeadad&clientId=u3fced059-84ec-4&from=paste&id=u08bc3ac4&originHeight=528&originWidth=1042&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf39a3b6f-f783-4703-99fa-ca7959b6c89&title=)
全局过滤器最常见的用法是进行负载均衡。配置如下所示：
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: route_member # 第三方微服务路由规则
          uri: lb://passjava-member # 负载均衡，将请求转发到注册中心注册的 passjava-member 服务
          predicates: # 断言
            - Path=/api/member/** # 如果前端请求路径包含 api/member，则应用这条路由规则
          filters: #过滤器
            - RewritePath=/api/(?<segment>.*),/$\{segment} # 将跳转路径中包含的api替换成空

```
 这里有个关键字 lb，用到了全局过滤器 LoadBalancerClientFilter，当匹配到这个路由后，会将请求转发到 passjava-member 服务，且支持负载均衡转发，也就是先将 passjava-member 解析成实际的微服务的 host 和 port，然后再转发给实际的微服务
### 默认过滤器
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: spzx-cloud-user
          uri: lb://spzx-cloud-user
          predicates:
            - Path=/api/user/**
            - After=2017-01-20T17:42:47.789-07:00[America/Denver]
      default-filters:
        - AddRequestHeader=Truth, 
```
### 过滤器执行顺序
1、按照order的值进行排序，order的值越小，优先级越高，执行顺序越靠前。
2、路由过滤器和默认过滤器会按照order的值进行排序，这个值由spring进行指定，默认是按照声明顺序从1递增
3、当过滤器的order值一样时，会按照 globalFilter > defaultFilter > 路由过滤器的顺序执行

# Nacos配置中心
## nacos快速使用
先在nacos配置中心进行配置管理
1、在微服务中，引入spring-cloud-starter-alibaba-nacos-config依赖
```xml
<!-- nacos作为配置中心时所对应的依赖 -->
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```
2、在项目的 /src/main/resources/application.yml 配置文件中配置 Nacos Config 地址并引入服务配置
```yaml
# 配置数据库的连接信息
spring:
  cloud:
    nacos:
      config:
        server-addr: 192.168.136.142:8848
  config:
    import:
      - nacos:spzx-cloud-user-dev.yml
```
通过@Value注解读取自定义配置
```java
@Value("${pattern.dateformat}")
    private String pattern ;
```
## 配置热更新
方式一：在@Value注入的变量所在类上添加注解**@RefreshScope**
方式二：通过实体类，配合@ConfigurationProperties注解读取配置信息，**自动**支持热更新
## 配置优先级
优先级顺序：Nacos配置中心的配置(后导入的配置 > 先导入的配置) > application.yml

 
# Sentinel组件
## 雪崩效应
一个微服务往往依赖于多个其它微服务。一个服务的不可用导致整个系统的不可用的现象就被称之为雪崩效应。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576006383-d0e2d88f-2172-4f55-9ce9-b93dc4e45f7b.png#averageHue=%23fcf0ee&clientId=u3fced059-84ec-4&from=paste&height=490&id=uf9d68461&originHeight=490&originWidth=1196&originalType=binary&ratio=1&rotation=0&showTitle=false&size=115100&status=done&style=none&taskId=u757e5fbf-cfdf-408b-8a4f-cfdd8393a7f&title=&width=1196)
## 解决方案
#### 超时处理
设定超时时间，请求超过一定时间没有响应就返回错误信息，不会无休止等待
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576032770-cc7629cb-4a58-4253-99e1-0bad280cd426.png#averageHue=%23fdf8f7&clientId=u3fced059-84ec-4&from=paste&height=319&id=ud89931bf&originHeight=319&originWidth=1205&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35049&status=done&style=none&taskId=u2a52d9fb-ebcb-40c6-a70c-65765694a54&title=&width=1205)
#### 隔离处理
将错误隔离在可控的范围之内，不要让其影响到其他的程序的运行
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576073616-635630cc-3433-4d6b-b692-75cb7b892817.png#averageHue=%23f1f0f0&clientId=u3fced059-84ec-4&from=paste&height=244&id=uebb32fe7&originHeight=244&originWidth=1124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=99944&status=done&style=none&taskId=u456bb20f-5127-4722-996c-fa94a85d699&title=&width=1124)
船舱都会被隔板分离为多个独立空间，当船体破损时，只会导致部分空间进入，将故障控制在一定范围内，避免整个船体都被淹没。于此类似，我们业务系统也可以使用这种思想来防止出现雪崩效应，常见的隔离方式：线程隔离
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576073569-e506d325-3193-4d8c-bd9e-c9e01accb6bc.png#averageHue=%23fdf7f6&clientId=u3fced059-84ec-4&from=paste&height=351&id=uf0b6ee04&originHeight=351&originWidth=1153&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45922&status=done&style=none&taskId=u5e86bcad-6ff1-4c9c-95d2-686a8393958&title=&width=1153)
#### 熔断处理
熔断处理：由**断路器**统计业务执行的异常比例，如果超出阈值则会**熔断**该业务，拦截访问该业务的一切请求。
断路器会统计访问某个服务的请求数量
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576088450-897deeb9-1081-4c9e-9a1c-dd544af6846a.png#averageHue=%23fdf8f8&clientId=u3fced059-84ec-4&from=paste&height=517&id=uafd9b6fb&originHeight=517&originWidth=1230&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56742&status=done&style=none&taskId=u8f0735c6-f359-4ca3-b74f-e3b3d21bcba&title=&width=1230)
请求了三次，两次出现异常，一次成功。当发现访问服务D的请求异常比例过高时，认为服务D有导致雪崩的风险，会拦截访问服务D的一切请求，形成熔断：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576110561-6c9dbf69-6b5b-4a4f-a95b-5b9a8be0a7ce.png#averageHue=%23fdf7f6&clientId=u3fced059-84ec-4&from=paste&height=541&id=ua1e59606&originHeight=541&originWidth=1240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65573&status=done&style=none&taskId=u70123c7e-8713-4b7d-8b82-e670f0bd2a3&title=&width=1240)
触发熔断了以后，当在访问服务A的时候，就不会在通过服务A去访问服务D了，立马给用户进行返回，返回的是一种默认值，这种返回就是一种兜底方案。这种兜底方案也将其称之为降级逻辑。
#### 流量控制
限制业务访问的QPS(每秒的请求数)，避免服务因流量的突增而故障。 
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576137976-4b8cdfdc-ad74-47f9-9c65-71fb0846fe58.png#averageHue=%23f9f4ed&clientId=u3fced059-84ec-4&from=paste&height=187&id=ufa56e31e&originHeight=187&originWidth=1192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59304&status=done&style=none&taskId=u43a36616-d016-4f8e-97e1-9201300c646&title=&width=1192)
限流是一种**预防**措施，避免因瞬间高并发流量而导致服务故障，进而避免雪崩。其他的处理方式是一种**补救**措施，在部分服务故障时，将故障控制在一定范围，避免雪崩。
## sentinel快速入门

1. 下载sentinel [https://github.com/alibaba/Sentinel/releases](https://github.com/alibaba/Sentinel/releases)
2. 启动sentinel 
```java
java -jar xxxxxxxxxxxxxxxxx
```

- 如果要修改Sentinel的默认端口、账户、密码，可以通过下列配置：
| **配置项** | **默认值** | **说明** |
| --- | --- | --- |
| server.port | 8080 | 服务端口 |
| sentinel.dashboard.auth.username | sentinel | 默认用户名 |
| sentinel.dashboard.auth.password | sentinel | 默认密码 |

3. 访问sentinel
### 整合sentinel

1. 引入sentinel依赖
```xml
<!--sentinel-->
<dependency>
  <groupId>com.alibaba.cloud</groupId> 
  <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

2. 配置控制台
```yaml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080  # 配置sentinel控制台地址
```

3. 访问spzx-cloud-user的任意接口
## 流量控制
### 相关概念
**簇点链路**：当请求进入微服务时，首先会访问DispatcherServlet，然后进入Controller、Service、Mapper，这样的一个调用链就叫做簇点链路。
**资源**：簇点链路中被监控的每一个接口就是一个资源，流控、熔断等都是针对簇点链路中的资源来设置的。
默认情况下sentinel会监控spring mvc的每一个端点（Endpoint，也就是controller中的方法），因此spring mvc的每一个端点就是调用链路中的一个资源。
例如，我们刚才访问的spzx-cloud-user中的UserController中的端点：/api/user/findUserByUserId/{userId}
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576431110-1af16ca8-4268-4410-863a-31ceac843ec0.png#averageHue=%23faf9f9&clientId=u3fced059-84ec-4&from=paste&height=526&id=u23800f02&originHeight=526&originWidth=1870&originalType=binary&ratio=1&rotation=0&showTitle=false&size=64410&status=done&style=none&taskId=uc35b177c-da9e-4e36-9262-d5d93376e23&title=&width=1870)
我们可以点击对应资源后面的按钮来设置规则：
1、流控：流量控制
2、降级：降级熔断
3、热点：热点参数限流，是限流的一种
4、授权：请求的权限控制
### 快速入门
### 流控模式
在添加限流规则时，点击高级选项，可以选择三种**流控模式**：
1、直接：统计当前资源的请求，触发阈值时对当前资源直接限流，也是默认的模式
2、关联：统计与当前资源相关的另一个资源，触发阈值时，对当前资源限流
3、链路：统计从指定链路访问到本资源的请求，触发阈值时，对指定链路限流
#### 关联模式
关联模式：统计与当前资源相关的另一个资源，触发阈值时，对当前资源限流
配置方式：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576494630-8d9eba6e-818b-48dc-b187-59ac48c15800.png#averageHue=%23c5c4c4&clientId=u3fced059-84ec-4&from=paste&height=805&id=u0569664d&originHeight=805&originWidth=1588&originalType=binary&ratio=1&rotation=0&showTitle=false&size=89306&status=done&style=none&taskId=uc6a6a4c1-b205-4815-bd2d-3b63879c3e0&title=&width=1588)
使用场景：比如用户支付时需要修改订单状态，同时用户要查询订单。查询和修改操作会争抢数据库锁，产生竞争。业务需求是优先支付和更新订单的业务，因此当修改订单业务触发阈值时，需要对查询订单业务限流。
#### 链路模式
链路模式：只针对从指定链路访问到本资源的请求做统计，判断是否超过阈值，如果超过阈值对从该链路请求进行限流。
配置方式：
1、/api/user/save --> users
2、/api/user/query --> users
如果只希望统计从/api/user/query进入到users的请求，并进行限流操作，则可以这样配置：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576550236-3037711d-cee0-4136-96ce-86496d95970c.png#averageHue=%23c5c4c4&clientId=u3fced059-84ec-4&from=paste&height=801&id=ua9a826ca&originHeight=801&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84558&status=done&style=none&taskId=u25508788-c0d0-4191-b8fc-2b970c9592c&title=&width=1586)

### 流控效果
流控效果是指请求达到流控阈值时应该采取的措施，包括三种：
1、快速失败：达到阈值后，新的请求会被立即拒绝并抛出FlowException异常，是默认的处理方式
2、warm up：预热模式，对超出阈值的请求同样是拒绝并抛出异常，但这种模式阈值会动态变化，从一个较小值逐渐增加到最大阈值
3、排队等待：让所有的请求按照先后次序进入到一个队列中进行排队，当某一个请求最大的预期等待时间超过了所设定的超时时间时同样是拒绝并抛出异常
#### warm up
阈值一般是一个微服务能承担的最大QPS，但是一个服务刚刚启动时，一切资源尚未初始化（**冷启动**），如果直接将QPS跑到最大值，可能导致服务瞬间宕机。
warm up也叫**预热模式**，是应对服务冷启动的一种方案。**阈值会动态变化**，从一个较小值逐渐增加到最大阈值。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719576641492-75af605c-d9ca-4274-bd8c-f30154009b02.png#averageHue=%23fdfdfd&clientId=u3fced059-84ec-4&from=paste&height=543&id=u170d58ab&originHeight=543&originWidth=1237&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121365&status=done&style=none&taskId=ud98f2e12-fcf7-485e-b026-d3f52745ce3&title=&width=1237)
#### 排队等待
**排队等待**：让所有的请求按照先后次序进入到一个队列中进行排队，当某一个请求最大的预期等待时间超过了所设定的超时时间时同样是拒绝并抛出异常
例如：QPS = 5，意味着每200ms处理一个队列中的请求；timeout = 2000，意味着**预期等待时长**超过2000ms的请求会被拒绝并抛出异常。
那什么叫做预期等待时长呢？
比如现在一下子来了12 个请求，因为每200ms执行一个请求，那么：
1、第6个请求的**预期等待时长** = 200 * （6 - 1） = 1000ms
2、第12个请求的预期等待时长 = 200 * （12-1） = 2200ms
### 热点参数限流
#### 配置介绍
之前的限流是统计访问某个资源的所有请求，判断是否超过QPS阈值。而热点参数限流是**分别统计参数值相同的请求**，判断是否超过QPS阈值。

