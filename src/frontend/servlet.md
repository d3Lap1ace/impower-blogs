# servlet

```html
a.  servlet就是动态资源

b.  所有的动态资源都有固定的方法，待服务器软件调用

c.  javaee的api提供了一个Servlet接口，规定动态资源调用的方法

d.  创建动态资源都需要实现Servlet接口
```

# web项目中静态和动态资源

```
c.  静态资源，不需要服务器执行，直接返回即可， 由浏览器解析执行

d.  静态资源，它需要根据他的文件地址直接访问

e.  动态资源，需要服务器执行，将执行的结果，返回给浏览器显示

f.  动态资源，不能根据他的文件地址进行访问，需要设定特定的地址，访问特定地址，tomcat会执行动态资源
```


## 生命周期
1. 通过生命周期测试发现Servlet对象在容器中是单例的；
2. 容器是可以处理并发的用户请求的，每个请求在容器中都会开启一个线程；
3. 多个线程可能会使用相同的Servlet对象，所以在Servlet中，我们不要轻易定义一些需要经常修改的成员变量；
4. load-on-startup中定义的正整数表示实例化顺序，如果数字重复了，容器会自行解决实例化顺序问题，但是应该避免重复；
5. Tomcat容器中，已经定义了一些随系统启动实例化的Servlet，自定义的Servlet的load-on-startup尽量不要占用数字1-5；

## **Servlet的继承结构和优化**
*  问题:
*      1.如何保证service方法必须重写,servlet必须有service方法
*           servlet -> 接口 -> service()
*           genericServlet -> 抽象类 -> 抽象service() | 硬刀子 语法: 接口 | 抽象方法
*           httpServlet -> 抽象类 -> 非抽象的service() | 软刀子 不靠语法: 父类的方法中抛异常 405

总结: servlet的最终使用
*      1.创建一个类,继承httpServlet
*      2.必须重写service方法(http)
*      3.可以选择重写init | destroy
*      4.使用注解@WebServlet配置访问地址即可




## ServletConfig和ServletContext
**ServletConfig使用**
介绍
```
ServletConfig放一些不能修改的配置参数
替代全局变量
避免了线程安全
ServletConfig存储一个servlet对应的变量参数
```
**声明**
方式一  web.xml
```xml
<servlet>

<servlet-name>configServlet</servlet-name>

<servlet-class>com.atguigu.servlet.ConfigServlet</servlet-class>

<!-- 参数变量,servlet读取,但是不能修改! 避免线程安全问题-->

<init-param>

<param-name>encoding</param-name>

<param-value>utf-8</param-value>

</init-param>

<init-param>

<param-name>key</param-name>

<param-value>value</param-value>

</init-param>

<load-on-startup>6</load-on-startup>

</servlet>

<servlet-mapping>

<servlet-name>configServlet</servlet-name>

<url-pattern>/config</url-pattern>

</servlet-mapping>
```

方式二  注解

```java
@WebServlet(value = "/config",loadOnStartup = 6,
initParams = {@WebInitParam(name = "encoding",value="utf-8"), 
              @WebInitParam(name = "key",value = "value")})
```

**ServletContext使用**
```java
i.  比ServletConfig更大的变量参数
ii.  不属于某一个Servlet
iii.  在配置的时候,只支持web.xml,且不在servlet标签中
iv.  多个servlet共有的参数变量,使用ServletContext 
```
b.  声明
```xml
<context-param>    
  <param-name>key</param-name>   
  <param-value>context</param-value>
</context-param>

<context-param>   
  <param-name>encoding</param-name>    
  <param-value>gbk</param-value>
</context-param>
```

c.  读取
```java
ServletContext servletContext = getServletContext();
String key = servletContext.getInitParameter("key");
System.out.println("key = " + key);
```

3.  ServletContext其他的API

```java
//根据在项目下的相对地址,获取绝对地址!

String realPath = servletContext.getRealPath("/imgs/gyy.png");

System.out.println("realPath = " + realPath);
```

## HttpServletRequest api
> HttpServletRequest是什么？

- HttpServletRequest是一个接口，其父接口是ServletRequest；
- HttpServletRequest是Tomcat将请求报文转换封装而来的对象，在Tomcat调用service方法时传入；
- HttpServletRequest代表客户端发来的请求，请求中的所有信息都可以通过该对象获得；
```java
@WebServlet("/request")
public class Requset extends HttpServlet {

    @Override
    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取请求行
        String method = req.getMethod();
        System.out.println("method = " + method);

        //获取url
        StringBuffer requestURL = req.getRequestURL();
        System.out.println("requestURL = " + requestURL);

        //获取端口号后的地址
        String requestURI = req.getRequestURI();
        System.out.println("requestURI = " + requestURI);

        //获取项目的跟地址
        String contextPath = req.getContextPath();
        System.out.println("contextPath = " + contextPath);

        //获取网络协议
        String protocol = req.getProtocol();
        System.out.println("protocol = " + protocol);

        //获取请求头的参数
        String header = req.getHeader("user-agent");
        System.out.println("header = " + header);
        //获取多个请求头的参数
        Enumeration<String> headers = req.getHeaders("user-agent");
        while (headers.hasMoreElements()){
            String s = headers.nextElement();
            System.out.println("s = " + s);
        }
        //todo: tomcat 10+版本已经解决全部的请求参数乱码问题! 请求url参数和请求体的字符参数 编码格式默认设置为utf-8
        //todo: tomcat 8 + 默认将请求体的字符串参数设置为utf-8 将url地址默认的编码格式iso-8859-1(单字符的编码格式 abcdef 博大精深)  (apache)
        //String key = req.getParameter("key");

        req.setCharacterEncoding("utf-8");

        String key1 = req.getParameter("key1");
        System.out.println("key1 = " + key1);
        //key=value | key=1 | key2  form 多选框  爱好
        String[] keys = req.getParameterValues("key");
        System.out.println(" = " + Arrays.toString(keys));

        //一次获取所有的参数 参数-> map的键 [key key1] 参数的值 -> map的值 [因为一个key可能有多个值]
        Map<String, String[]> parameterMap = req.getParameterMap();
        System.out.println("--------------------");
        for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
            System.out.println(entry.getKey() + "::" + Arrays.toString(entry.getValue()));
        }


        //todo: 前端利用请求体,传递json字符串或者文件类型的时候如何获取
        //1. 获取请求体的数据内容流 [字节输入流] 2. 流转成json字符串  3.利用第三方技术将json字符串转成java实体对象
        //ServletInputStream inputStream = req.getInputStream(); //请求体字节输入流
        //BufferedReader reader = req.getReader(); //请求体的字符输入流

    }
}
```

## HttpServletResponse api
> HttpServletResponse是什么？


- HttpServletResponse是一个接口，其父接口是ServletResponse；
- HttpServletResponse是Tomcat预先创建的，在Tomcat调用service方法时传入；
- HttpServletResponse代表对客户端的响应，该对象会被转换成响应的报文发送给客户端，通过该对象我们可以设置响应信息；
```java
@WebServlet("/response")
public class
HttpResponseServlet extends HttpServlet {

    @Override
    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //响应数据: 状态行 [协议版本 状态码] 默认设置 响应头[key:value]  响应空行 响应体 [ 字符串(json)|字节(图片 文件)| xxx.html ]
        //状态行问题
        //协议版本不需要设置,请求来的是啥返回就是啥!
        //状态不需要主动设置,会根据tomcat处理结果自动判断 200 500 404 | 如果要[[重定向]]需要额外设置
        resp.setStatus(200);

        //设置响应头
        resp.setHeader("key","value");

        //响应体 [字符 | 字节] 你想响应数据,需要获取字符或者字节输出流! 把数据写到流中即可! 就代表写到前端!
        //todo: 两个流二选一 (字符串resp.getWriter(); | 字节resp.getOutputStream(); | 字符串+字节  resp.getOutputStream();)
        //hello servlet!!
        PrintWriter writer = resp.getWriter();

        //todo:我们返回的字符串,其实浏览器也是生成一个html进行展示,只不过他忘了设置meta charset=utf-8标签了 所以乱码了!
        //text/html -> 返回的内容其实是html展示 [文件类型的规范: mimetype 前面是大类型/小类型]
        //charset=utf-8 html展示的时候,使用meta charset=utf-8
        resp.setContentType("text/html;charset=utf-8");
        writer.print("你好,中国!!!");
//        writer.print("<html><head><meta charset='utf-8'> <title>xxx</title></head><body>hello servlet!!<br>你好,蛇窝类特!!</body>");

        //ServletOutputStream outputStream = resp.getOutputStream();
    }
}


//响应字节数据
@WebServlet("/response1")
public class HttpResponseServlet2 extends HttpServlet {

    @Override
    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //1. 使用文件输入流读取字节文件
        //ServletContext |  getRealPath(/)
        ServletContext servletContext = getServletContext();
        String realPath = servletContext.getRealPath("/imgs/ynh.jpg");
        FileInputStream fileInputStream = new FileInputStream(realPath);
        //2. 保密
        //  content-disposition 文件定位
        //  attachment 附件 下载
        resp.setHeader("content-disposition","attachment;filename=ynh.jpg");

        //3. 将字节数据写到响应的字节输出流即可
        ServletOutputStream outputStream = resp.getOutputStream();

        int len = -1;
        byte[] buffer = new byte[8*1024];
        while( (len = fileInputStream.read(buffer)) != -1 ){
            outputStream.write(buffer,0,len);
        }

        if (fileInputStream != null) {
            fileInputStream.close();
        }
        if (outputStream != null){
            outputStream.close();
        }
    }
}

```
## **转发和重定向**
            1.     资源跳转需求
            a.     servlet -> html -> 返回 注册业务处理完毕以后,跳转到等登录页面
            b.     servlet -> servlet -> 返回 业务的继续和补充
            c.     作用: 完成资源之间的串联
            d.     实现: 转发 | 重定向
            2.     转发
            a.     转发只能是项目下的资源
            b.     转发对于客户端来说是一次请求,浏览器的展示地址是第一个资源地址(小红)
            c.     转发返回的状态码是200
            d.     转发的地址是项目下的相对地址(和realPath)
            e.     转发发起的对象是request对象
            3.     重定向
            a.     响应可以是项目下或者项目外的资源
            b.     重定向对于客户端来说是多次请求,浏览器展示地址是最后一个资源地址(马云)
            c.     重定向返回的状态码是302
            d.     重定向的地址必须是绝对地址或者绝对地址对应的简化地址
            e.     重定向发起的对象是response
```java
@WebServlet("/forward")
public class ForwardServlet extends HttpServlet {

    @Override
    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ForwardServlet.service");
        //转发地址 项目下的资源地址  /request  = servletContext.realPath(/xxx)
        req.getRequestDispatcher("/html/login.html").forward(req,resp);
    }
}


@WebServlet("/redirect")
public class RedirectServlet extends HttpServlet {

    @Override
    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("RedirectServlet.service");
        //重定向 response发起, 地址: 绝对地址
        resp.sendRedirect("http://localhost:8080/request_response/html/login.html");
    }
}

```

![AgAABUZq3y0fmz8I8jVDRLZQuHOVRZQP.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1714483390504-2273f36f-e57d-4831-a6f7-1d906f247a01.png#averageHue=%23fbf8f7&clientId=u3a880177-c13c-4&from=ui&id=u3b8b7f0c&originHeight=852&originWidth=1322&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79666&status=done&style=none&taskId=u0dd046f5-2efe-4053-94bf-d42c9e5e0ec&title=)


## mvc框架
MVC框架的三个主要组成部分：

1. **Model（模型）**：代表应用程序的数据结构和业务逻辑。它负责处理应用程序的数据，比如数据库的读写操作。
2. **View（视图）**：是应用程序的用户界面，负责显示数据（从Model中获取）并且收集用户输入。视图可以直接与用户交互，但视图不处理用户输入的数据，它只是简单地显示数据。
3. **Controller（控制器）**：是协调Model和View之间的交互的中间人。它接收来自View的用户输入，将相应的数据请求传递给Model处理，并将Model返回的数据传递给View显示。

MVC的工作原理通常如下：

- 用户与视图层（View）进行交互，比如点击一个按钮或提交一个表单。
- 控制器层（Controller）捕获这些事件，并根据事件类型调用模型层（Model）中的方法。
- 模型层（Model）处理数据后，将结果返回给控制器层。
- 控制器层将处理结果传递回视图层，视图层根据这些数据更新显示内容。
# **会话管理概述**

**为什么需要[会话管理]?**
HTTP协议是无状态, 无法识别哪些请求是一个会话的! 无法做会话级别的数据共享
HTTP的请求变成有状态,能识别请求是哪个会话的! 根据会话级别进行数据共享,例如: 登录账号信息
无状态: 不会记录请求和响应的数据,
有状态: 利用某些存储技术,记录请求之间的状态,分析捋顺请求是否来自于一个会话

**会话管理实现手段**
            a.     cookie : cookie存储到客户端(浏览器) ,优势: 跨会话 	缺点: 	客户端数据不安全
            b.     session : session存储到服务端(tomcat), 优势: 数据安全 	缺点: 	不能跨会话
            c.     session底层需要依赖cookie
            d.     特点: 记录会话级别的数据,区分请求属于哪个会话,可以进行会话级别的数据共享

## **Cookie**

**cookie概述**
           cookie能实现会话级别的数据`共享`,存储客户端的技术
           当服务器想要存储数据,先创建一个cookie,放在响应头中带回到客户端
           客户端接收到响应以后,检查响应头(set-cookie)有cookie,将cookie存储到当前浏览器的**运行内存**中
           每次从当前浏览器发起请求,都会主动携带cookie,放在请求头中cookies ,带到服务端,服务端可以通过请求头获取cookie数据
            cookie不建议存储敏感数据,会话级别的数据存储建议session! 跨会话存储使用cookie

**cookie使用**

```java
存储cookie
Cookie cookie = new Cookie(name,value)
cookie.setMaxAge(秒)
response.addCookie(cookie)
```

**读取cookie**

```java
Cookie [] cookies = request.getCookies();
循环
cookie.getName() cookie.getValue();
```

**cookie的时效性**
![AgAABUZq3y1aNu_V-n5F2r9P0TmvyZHs.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1714483821965-c4f18541-7f6d-4638-8cea-100f60d89d46.png#averageHue=%23fefefe&clientId=u3a880177-c13c-4&from=ui&id=udcb373b9&originHeight=666&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=342915&status=done&style=none&taskId=ue364890c-a3be-4d83-9a03-5225c051d02&title=)
**修改时效**
```java
setMaxAge(单位秒,0,删除同名的cookie);
response.addCookie(cookie);
```

**cookie的path属性**

cookie有一个path属性
path的作用,标识cookie会跟着哪个请求走
每次发起项目下的请求,对比你的请求地址和path, 如果你请求地址是path相同路径或者子路径cookie才会跟着你走
cookie path的默认值: 保存cookiecontroller地址的上一级 /**day06/cookies**/save

```java
//如何确保cookie整个项目都会被访问到! 要主动设置cookiepath值
//request对象:  /项目的跟地址 /day06 
cookie1.setPath(req.getContextPath());
```
## **Session**
1. HttpSession概念
a. HttpSession是一种会话级别的数据存储技术,和cookie不同,存储到服务端
b. HttpSession底层需要cookie来记录是哪个浏览器的会话请求
c. 存储	
i. 服务端创建一个session对象,每个session对象都有一个id属性
ii. 可以向session存储数据
iii. 服务端同时也会创建一个cookie: JSESSIONID  = 当前sessionid
iv. 将cookie传递到客户端存储(session的标识存储到对应的客户端)
d. 获取
i. 每次先检查请求中是否保存JSESSIONIDcookie
ii. 获取JSESSIONID的sessionid值
iii. 给你返回对应id session对象
iv. 在原session对象存储或者读取数据
2. HttpSession使用
a. session存储数据
```
HttpSession  session  = request.getSession();
session.setAttribute(String key , Object value);
```
b. session读取数据
```
HttpSession  session  = request.getSession();
session.getAttribute(String key );
```
3. HttpSession的时效性
a. session永远不能跨会话
b. 方向1: session对应的cookie(一次会话)消失,将无法查找原有的session
c. 方向2: session本身也是有存活时间(服务器不会永久的给你保留)
i. 默认session有效期30分钟
ii. 如何修改session有效期
```
session.setMaxInactiveInterval(5*60); //单位是秒 负值,永远不超时!
<session-config>
   <session-timeout>5</session-timeout> //单位分钟
</session-config>
// 直接让session失效
session.invalidate();
//session.removeAttribute("key");
//session.invalidate(); //箱子删除了
```
## **共享域使用**
1. 三大共享域对象概述和作用
a. 共享域对象数据共享
b. 实现数据的间接传递
c. 发送数据方:将数据存储到合适的共享域对象
d. 接收数据方:从共享域中获取数据
e. 转发: request 
f. 重定向: session
2. 共享域对象对应范围
a. request(请求域) : 一次请求或者转发
b. session(会话域) : 一次会话(一个浏览器的多次请求)
c. servletContext(应用域) : 一个项目的所有请求
3. 共享域对象获取和方法
a. 获取共享域对象
i. request ->  service(request)
ii. session ->  request.getSession();
iii. servletContext -> getServletContext(); | 小共享域.getServletContext();
b. 共享域对象方法
i. 存 setAttribute(String key , Object value);
ii. 取 Object value = getAttribute(String key);
iii. 更 setAttribute(String key , Object value);
iv. 删 removeAttribute(String key);

存储数据
```java
@WebServlet("/a")
public class AController extends HttpServlet {

    @Override
    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("key","request data!!");
        req.getSession().setAttribute("key","session data!!");
        req.getServletContext().setAttribute("key","application data!!");
        resp.sendRedirect(req.getContextPath() + "/b");
    }
}

```
获取数据
```java
@WebServlet("/b")
public class BController extends HttpServlet {

    @Override
    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Object key = req.getAttribute("key");
        System.out.println("key = " + key);
        Object key1 = req.getSession().getAttribute("key");
        System.out.println("key1 = " + key1);
        Object key2 = req.getServletContext().getAttribute("key");
        System.out.println("key2 = " + key2);

        //TODO: 转发 request 重定向 session
    }
}

```
## **JSP**
1. jsp技术概述
a. jsp介绍
i. java server page java的动态页面展示语言
ii. jsp可以用于展示动态数据(页面+共享域数据的结合)
iii. html用于展示静态数据
iv. jsp会变成servlet最终输出html页面
b. jsp作用
i. 根据数据动态修改页面的展示效果
c. jsp基本使用
```
html自己写
<%java%>
<%=输出%>
```
2. el表达式
a. el表达式作用 : 替代<%=%>快速输出共享域的数据
b. el表达式是使用
```
<%
  request.setAttribute("key","data");
  session.setAttribute("key","session");
%>

<p> <%=request.getAttribute("key")%> </p>
<p> <%out.print(request.getAttribute("key"));%></p>
<hr>
el表达式怎么输出: ${key} -> 1. 获取共享域指定key的数据输出!
                          2. 从小到大范围共享域获取,有了就停止!   request session application(servletContext)
                          3. 指定共享域  requestScope sessionScope applicationScope  . key
<hr>
<p>${key}</p>
<p>${sessionScope.key}</p>
```
3. jstl标签库
a. jstl标签库介绍
i. jsp的扩展标签
ii. 提供一些遍历和判断等功能
iii. 简化原有的jsp代码实现
b. jstl标签使用流程
i. 导入对应的依赖
ii. jsp中引入jstl标签库
```json
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.atguigu.pojo.SysUser" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<%--   输出 1 - 100 的值  1
                         2
                         3
             for(int item = 1 ; item <= 100 ; i++){

             }

             奇数 -> 红色
             偶数 -> 绿色
        --%>

    <%
        List<SysUser> list = new ArrayList<SysUser>();
        SysUser sysUser = new SysUser(1,"root","123456");
        SysUser sysUser1 = new SysUser(2,"root","123456");
        SysUser sysUser2 = new SysUser(3,"root","123456");
        SysUser sysUser3 = new SysUser(4,"root","123456");
        list.add(sysUser);
        list.add(sysUser1);
        list.add(sysUser2);
        list.add(sysUser3);
        request.setAttribute("list",list);
    %>


    <table border="1px" bordercolor="red">
        <tr>
            <th>id</th>
            <th>username</th>
            <th>password</th>
        </tr>
        <c:forEach items="${list}" var="user">
            <tr>
                <td>${user.uid}</td>
                <td>${user.username}</td>
                <td>${user.userPwd}</td>
            </tr>
        </c:forEach>

        <c:forEach begin="0" end="${list.size()-1}" var="i" step="1">
            <tr>
                <td>${list.get(i).uid}</td>
                <td>${list.get(i).username}</td>
                <td>${list.get(i).userPwd}</td>
            </tr>
        </c:forEach>

    </table>
    <c:forEach begin="1" end="100" step="1" var="item">
        <c:if test="${item%2==1}">
            <p><font color="red">${item}</font></p>
        </c:if>
        <c:if test="${item%2==0}">
            <p><font color="green">${item}</font></p>
        </c:if>
    </c:forEach>

</body>
</html>

```
## **过滤器**
1. 过滤器概述
a. 过滤所有客户端的请求信息
b. 根据我们的要求进行资源的放行或者资源的拦截
c. 过滤器可以前置进行数据检查工作
d. 例如: 检查是否登录 (学校门口的大爷)
2. 过滤器使用
a. 创建一个过滤器类实现Filter接口
b. 重写过滤器的三个方法
i. init : 会在Tomcat启动的时候,调用一次,用于初始化工作
ii. doFilter : **每次访问过滤器过滤资源**的时候触发,用于执行过滤任务!
iii. destroy : tomcat关闭或者移除项目的时候,调用一次,用户销毁工作
c. 配置过滤器要过滤的资源地址
i. web.xml
```
<filter
<filter-mapping
```
ii. 注解配置
```
@WebFilter({"/html/info.html","/html/show.html","/controller/*"})
```
3. 过滤器生命周期
a. init : tomcat启动就会调用一次! 做初始化工作
b. doFilter : 每次访问过滤器资源的时候都会调用,做具体的过滤工作,可以决定拦截或者放行
c. destroy : tomcat关闭或者移除项目的时候,会触发一次,进行资源释放工作
4. 过滤器链介绍
a. 同一个资源可以被多个过滤器过滤
b. 多个过滤器形成过滤链
c. 站在单个过滤器的角度来说,我们正常处理业务,放行或者拦截即可!
d. 放行:调用下一个过滤器,如果是最后一个过滤器,调用链尾的资源
e. 拦截:不会继续向后调用,会直接跳转到其他目标资源
f. 链中过滤器优先级问题: web.xml > 注解 | web.xml filter-mapping先后顺序  | 注解的类命名的排序
5. 注解方式配置过滤器
```java
@WebFilter({"/html/info.html","/html/show.html","/controller/*"})
```
## **AJAX**
1. ajax概述
a. ajax是一种js的异步通信技术
b. 可以在不切换页面的情况下,完成局部内容的更新
c. 浏览器页面不动,但是需要向后台发起请求,使用ajax技术
d. 异步: ajax
e. 同步: form a location 
## **监听器**
1. 监听器概述
a. Listener和Filter以及Servlet称为Javaee三大组件
b. 他们三者都需要交给tomcat管理
c. Listener监控共享域对象的创建和销毁以及属性的操作
2. 常见监听器介绍
a. 共享域对象Listener -> 创建和销毁
b. 共享域对象AttributeListener -> 属性操作
c. ServletContextListener -> 项目周期一致 | 监控项目启动和终止以及配置初始化工作(ssm整合的时候使用)

