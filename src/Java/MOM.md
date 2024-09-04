# 消息中间件
消息队列(message queue)简称MQ，是一种以“**先进先出**”的数据结构为基础的消息服务器。
消息：在两个系统要传输的数据
作用：实现消息的传递

原始的数据传递方式
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648641001-ff5469ce-b24d-46e7-b2d3-5583dfa456f0.png#averageHue=%23f6f6f5&clientId=ueb21480b-fd9b-4&from=paste&height=95&id=u98fa11d4&originHeight=95&originWidth=1124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9595&status=done&style=none&taskId=u38247954-ca1c-4761-9bbd-bad755569ca&title=&width=1124)
为同步传输存在的弊端：**传输效率较低**。

基于MQ实现消息的传输
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648649126-302b19ec-0a1d-4161-87a2-f8c71e44088d.png#averageHue=%23faf6f0&clientId=ueb21480b-fd9b-4&from=paste&height=139&id=ua8e3f910&originHeight=139&originWidth=1248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60781&status=done&style=none&taskId=ude9c6aee-a9a4-4401-8f73-74f3c103fba&title=&width=1248)
属于异步传输    数据传输的消息较高。
## 消息中间件的主要的作用
**[1]系统解耦**
**[2]流量消锋**
**[3]数据分发**
## MQ的优缺点
优点：
1、应用解耦提高了系统的容错性
2、异步通讯提高了系统的响应速度
3、流量消锋提高了系统的并发能力
缺点：
1、系统可用性降低：系统引入的外部依赖越多，系统稳定性越差。一旦MQ宕机，就会对业务造成影响。
2、系统复杂度提高：MQ的加入大大增加了系统的复杂度。
MQ的选择依据是什么? 调用方是否需要获取到被调用方的执行结果，如果需要获取到结果，那么就需要使用同步通讯，如果不需要就可以使用异步通讯。
# Rabbitmq架构
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648667712-1a4a7549-f642-4a41-b280-ee62c396dec6.png#averageHue=%23b8b854&clientId=ueb21480b-fd9b-4&from=paste&height=404&id=u00deea60&originHeight=404&originWidth=1273&originalType=binary&ratio=1&rotation=0&showTitle=false&size=142007&status=done&style=none&taskId=u118cf3d5-50f7-4702-9f68-9c931e8e1c3&title=&width=1273)
**Broker**：接收和分发消息的应用，RabbitMQ Server就是 Message Broker
**Virtual host**:出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似于网络中的 namespace 概念。当多个不同的用户使用同一个 
RabbitMQ server 提供的服务时，可以划分出多个vhost，每个用户在自己的 vhost 创建 exchange／queue 等
**Connection**：publisher／consumer 和 broker 之间的 TCP 连接
**Channel**：如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP Connection的开销将是巨大的，效率也较低。Channel 是在 connection 
内部建立的逻辑连接，如果应用程序支持多线程，通常每个thread创建单独的 channel 进行通讯，AMQP method 包含了channel id 帮助客户端和message broker 
识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的 Connection 极大减少了操作系统建立 TCP connection 的开销
**Exchange**：message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发消息到queue 中去。常用的类型有：direct (point-to-point)， 
topic (publish-subscribe) and fanout (multicast)
**Queue**：存储消息的容器，消息最终被送到这里，等待 consumer 取走
**Binding**：exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key。Binding 信息被保存到 exchange 中的查询表中，用于 message 的分发依据
# Rabbitmq环境搭建

1. docker部署
```shell
# 拉取rabbitmq的镜像
docker pull rabbitmq:3.8-management

# 创建容器
docker run -d --name rabbit01 -e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=admin \
-p 15672:15672 -p 5672:5672 \
--hostname rabbit01 --restart=always \
-v rabbit01_data:/var/lib/rabbitmq \
-v rabbit01_conf:/etc/rabbitmq \
rabbitmq:3.8-management
```

2. 依赖导入
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>

    <!-- spring boot和rabbitmq整合的时候所需要的起步依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>

    <!-- spring boot和junit整合的起步依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>

</dependencies>


   <!-- 类似于指定父工程 上述继承了父工程之后，这里就可以不用这个dependencyManagement这一项了,这两项选择一项即可。-->
    <dependencyManagement>
        <dependencies>
            <!-- Spring Boot Dependencies -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>3.2.0</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

3. application.yml
```yaml
spring:
  rabbitmq:
    host: 192.168.1.1
    port: 5672
    username: admin
    password: admin
    virtual-host: /
```
# Rabbitmq消息模型
## 简单队列模型
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648679807-f573fc8d-5c4a-4bdc-a252-9a6f133cb1eb.png#averageHue=%23fdf8f7&clientId=ueb21480b-fd9b-4&from=paste&height=183&id=u51212e29&originHeight=183&originWidth=1109&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22172&status=done&style=none&taskId=u0a5760b5-0046-441b-97e2-c5cb9af7572&title=&width=1109)
一个生产者对应一个消费者，这一个消费者从这个队列中消费所有的消息。

生产者
```java
@SpringBootApplication
public class ProducerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProducerApplication.class , args) ;
    }

}
```
测试类
```java
@SpringBootTest(classes = ProducerApplication.class)
public class Producer01 {

    @Autowired
    private RabbitTemplate rabbitTemplate ;

    @Test
    public void test01() {
        rabbitTemplate.convertAndSend("simple_queue" , "hello rabbitmq...");		// 第一个参数表示的就是队列名称
    }

}
```
消费者
```java
@SpringBootApplication
public class ConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class , args) ;
    }

}
```
监听方法
```java
@Component
public class Consumer01Listener {

    @RabbitListener(queues = "simple_queue")
    public void consumer01(Message message) {
        byte[] body = message.getBody();
        String msg = new String(body);
        System.out.println("msg ----> " + msg);
    }

}
```
## 工作队列模型
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648621992-8818ebe5-c386-48a1-bcba-bcbe5339f3f7.png#averageHue=%23fdf6f5&clientId=ueb21480b-fd9b-4&from=paste&height=387&id=udd89cf8c&originHeight=387&originWidth=1310&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79559&status=done&style=none&taskId=ubdbc8560-6297-4a0e-8e93-e8b7846d8aa&title=&width=1310)
Work Queues与入门程序的简单模式相比，多了一个或一些消费端，**多个消费者共同消费同一个队列**中的消息。
**应用场景**：对于任务过重或任务较多情况使用工作队列可以**提高任务处理的速度**。

## 发布订阅模型
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648629759-2a48f174-1d30-4b9a-8f15-bf784f19820b.png#averageHue=%23f8d8d8&clientId=ueb21480b-fd9b-4&from=paste&height=208&id=u2afec4b2&originHeight=208&originWidth=1334&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48529&status=done&style=none&taskId=u024538e9-d6dc-49b2-9018-23392cb6142&title=&width=1334)
消息的传输过程如下所示：
1、生产者发送消息给交换机
2、交换机获取到消息将消息转发给指定的队列
3、消费者监听指定的队列，一旦队列中存在消息，消费者监听方法执行
交换机接收到消息以后到底需要将消息转发给哪一个队列，取决于交换机的类型，常见的交换机的类型：
1、**Fanout**：广播，将将消息交给所有与之绑定队列
2、**Direct**：路由，把消息交给符合指定routing key 的队列
3、**Topic**：主题，把消息交给符合routing pattern（路由规则） 的队列
**Exchange（交换机）只负责转发消息，不具备存储消息的能力**，因此如果没有任何队列与Exchange绑定，或者没有符合路由规则的队列，那么消息会丢失！
### Fanout
简介：fanout类型的交换机会将将消息交给所有与之绑定队列
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648761902-def890d3-37ab-43c0-8246-a2f9bceaa355.png#averageHue=%23f8d7d7&clientId=ueb21480b-fd9b-4&from=paste&height=208&id=u4a91e509&originHeight=208&originWidth=1322&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53141&status=done&style=none&taskId=ucaf16f2b-2be9-4a81-9364-a5946858ce0&title=&width=1322)
### Direct
路由模式特点：
1、队列与交换机的绑定的时候需要指定一个或者多个bindingKey(routingKey)
2、生产者发送消息的时候需要指定一个消息的routingKey
3、交换机获取到消息以后需要使用消息的routingKey和bindingKey比对，如果相等就会把消息转发给对应的队列
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648789423-15813bc6-4952-45f5-9fbf-a318ef002bfa.png#averageHue=%23f7eeee&clientId=ueb21480b-fd9b-4&from=paste&height=629&id=u954919ec&originHeight=629&originWidth=1468&originalType=binary&ratio=1&rotation=0&showTitle=false&size=192263&status=done&style=none&taskId=u6dcbef30-f176-4f7d-a551-4e36d78be86&title=&width=1468)

### Topic
主题模式特点：
1、队列与交换机的绑定的时候需要指定一个或者多个bindingKey(routingKey) ， **在bindingKey可以使用通配符**
2、生产者发送消息的时候需要指定一个消息的routingKey
3、交换机获取到消息以后需要使用消息的routingKey和bindingKey规则进行比对，如果routingKey满足bindingKey的规则就会把消息转发给对应的队列
通配符介绍：
**#**：匹配零个或多个词
*****：匹配不多不少**恰好1**个词

 ![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719648811515-6abc7ba2-972a-4233-82ed-d19e798b22b0.png#averageHue=%23f7eeee&clientId=ueb21480b-fd9b-4&from=paste&height=550&id=u8e584576&originHeight=550&originWidth=1389&originalType=binary&ratio=1&rotation=0&showTitle=false&size=161651&status=done&style=none&taskId=ue088edf9-3b99-4bec-920b-996bf801400&title=&width=1389)

# @RabbitListener注解
RabbitListener注解用来声明消费者监听器，可以监听指定的队列，同时也可以声明队列、交换机、队列和交换机绑定信息。

```java
@Component
public class Consumer02Listener {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "direct_queue_02" , durable = "true") ,
            exchange = @Exchange(value = "direct_exchange" , durable = "true" , type = ExchangeTypes.DIRECT) ,
            key = { "error" , "info"}
    ))
    public void consumer01(Message message) {
        byte[] body = message.getBody();
        String msg = new String(body);
        System.out.println("consumer02Listener....msg ----> " + msg);
    }

}
```
