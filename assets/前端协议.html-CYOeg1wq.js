import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,d as i}from"./app-DwrsGkNU.js";const o={},n=i('<h1 id="前端基础概念" tabindex="-1"><a class="header-anchor" href="#前端基础概念"><span>前端基础概念</span></a></h1><h1 id="javaweb的cs和bs模式" tabindex="-1"><a class="header-anchor" href="#javaweb的cs和bs模式"><span>JAVAWEB的CS和BS模式</span></a></h1><blockquote><p>CS模式：  Client-Server模式/客户端-服务端模式，该模式特点如下。</p></blockquote><ol><li>程序分两部分，一部分是客户端需要安装的程序，一部分是要部署在服务器上的程序；</li><li>用户需要在硬件设备或者操作系统中，下载安装特定的客户端程序才可以使用；</li><li>程序运行的压力由客户端和服务端共同承担；</li><li>可以借助客户端运算资源，对数据继续处理，一般可以有较好的画质和展现效果；</li><li>程序更新时，往往需要同时更新客户端和服务端两部分；</li><li>跨平台性能一般，不同的平台未必都有对应的客户端程序；</li><li>开发成本较高，要开发服务端和客户端程序，要为不同的客户端开发不同客户端程序；</li></ol><blockquote><p>BS模式 Browser-Server模式：</p></blockquote><p>1 程序就一部分，只要部署在服务器上即可； 2 无论用户使用什么设备和操作系统，只要有一个安装任意一款浏览器即可； 3 程序运行的压力主要由服务端承担； 4 客户端承担的计算压力小，可以对数据进行简单的继续处理，但是不像CS模式那些可以获得较好的画质和展现效果； 5 程序更新时，只需要同时服务端部分； 6 跨平台性能优秀，只要有一个浏览器，到处都可以使用； 7 开发成本略低，不必为不同的客户端开发不同客户端程序；</p><blockquote><p>模式选择：对于JAVA程序员来说，开发的是服务端代码，所有无论前端是何种类型的客户端，只要按照接口文档要求开发后端功能即可，前后端分离模式下，我们可以在几乎不接触前端的状态下完成开发。</p></blockquote><h1 id="javaweb实现前后端分离" tabindex="-1"><a class="header-anchor" href="#javaweb实现前后端分离"><span>JAVAWEB实现前后端分离</span></a></h1><blockquote><p>非前后端分离：</p></blockquote><ul><li>1 开发不分离： 程序员既要编写后端代码，又要去修改甚至编写前端代码，程序员的工作压力较大。</li><li>2 部署不分离：使用了后端动态页面技术(JSP,Thymeleaf等)，前端代码不能脱离后端服务器环境，必须部署在一起。</li></ul><blockquote><p>前后端分离：</p></blockquote><ul><li>1 开发分离：后端程序员只要按照接口文档去编写后端代码，无需编写或者关系前端代码，前后端程序员压力都降低。</li><li>2 部署分离：前端使用单独的页面动态技术，通过VUE等框架，工程化项目，前端项目可以部署到独立的服务器上。</li></ul><h1 id="xml" tabindex="-1"><a class="header-anchor" href="#xml"><span>xml</span></a></h1><blockquote><p>XML是EXtensible Markup Language的缩写，翻译过来就是可扩展标记语言。所以很明显，XML和HTML一样都是标记语言，也就是说它们的基本语法都是标签。</p></blockquote><ul><li><strong>可扩展</strong>：三个字表面上的意思是XML允许自定义格式。但这不代表你可以随便写；</li><li>在XML基本语法规范的基础上，你使用的那些第三方应用程序、框架会通过XML约束的方式强制规定配置文件中可以写什么和怎么写；</li><li>XML基本语法这个知识点的定位是：<code>**我们不需要从零开始，从头到尾的一行一行编写XML文档，而是在第三方应用程序、框架已提供的配置文件的基础上修改。**</code>要改成什么样取决于你的需求，而怎么改取决XML基本语法和具体的XML约束；</li></ul><h1 id="tomcat服务器" tabindex="-1"><a class="header-anchor" href="#tomcat服务器"><span>Tomcat服务器</span></a></h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><blockquote><p>Tomcat是Apache 软件基金会（Apache Software Foundation）的Jakarta 项目中的一个核心项目，由Apache、Sun 和其他一些公司及个人共同开发而成。最新的Servlet 和JSP 规范总是能在Tomcat 中得到体现，<code>**因为Tomcat 技术先进、性能稳定，而且免费，因而深受Java 爱好者的喜爱并得到了部分软件开发商的认可，成为目前比较流行的Web 应用服务器**</code>。</p></blockquote><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><ul><li>Tomcat官方网站：<a href="http://tomcat.apache.org/" target="_blank" rel="noopener noreferrer">http://tomcat.apache.org/</a>；</li></ul><blockquote><p>安装：</p></blockquote><ol><li>正确安装JDK并配置JAVA_HOME。</li><li>解压Tomcat到非中文无空格目录。</li><li>点击bin/startup.bat启动。</li><li>打开浏览器输入 http://localhost:8080访问测试。</li><li>直接关闭窗口或者运行 bin/shutdown.bat关闭tomcat。</li><li>处理dos窗口日志中文乱码问题：修改conf/logging.properties，ConsoleHandler.encoding的UTF-8修改为GBK。</li></ol><h1 id="http协议" tabindex="-1"><a class="header-anchor" href="#http协议"><span>HTTP协议</span></a></h1><p><img src="https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448328295-9490f15b-4ae3-4ee3-a191-117bf236908f.png#averageHue=%23e6e4c6&amp;clientId=u5437c1ab-ed6d-4&amp;from=paste&amp;id=u2ee25a6d&amp;originHeight=218&amp;originWidth=673&amp;originalType=url&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;taskId=u89571991-f097-4f50-b70b-5fddffad0af&amp;title=" alt="" loading="lazy"><strong>HTTP 超文本传输协议</strong> (HTTP-Hyper Text transfer protocol)，是一个属于应用层的面向对象的协议，由于其简捷、快速的方式，适用于分布式超媒体信息系统。它于1990年提出，经过十几年的使用与发展，得到不断地完善和扩展。<strong>它是一种详细规定了浏览器和万维网服务器之间互相通信的规则</strong>，通过因特网传送万维网文档的数据传送协议。客户端与服务端通信时传输的内容我们称之为<strong>报文</strong>。**HTTP协议规定了报文的格式。**HTTP就是一个通信规则，这个规则规定了客户端发送给服务器的报文格式，也规定了服务器发送给客户端的报文格式。实际我们要学习的就是这两种报文。<strong>客户端发送给服务器的称为&quot;请求报文&quot;</strong>，<strong>服务器发送给客户端的称为&quot;响应报文&quot;</strong>。</p><h2 id="http协议的会话方式" tabindex="-1"><a class="header-anchor" href="#http协议的会话方式"><span>HTTP协议的会话方式</span></a></h2><ul><li>在浏览器中输入指定网页的 URL。</li><li>浏览器通过 DNS 协议，获取域名对应的 IP 地址。</li><li>浏览器根据 IP 地址和端口号，向目标服务器发起一个 TCP 连接请求。</li><li>浏览器在 TCP 连接上，向服务器发送一个 HTTP 请求报文，请求获取网页的内容。</li><li>服务器收到 HTTP 请求报文后，处理请求，并返回 HTTP 响应报文给浏览器。</li><li>浏览器收到 HTTP 响应报文后，解析响应体中的 HTML 代码，渲染网页的结构和样式，同时根据 HTML 中的其他资源的 URL（如图片、CSS、JS 等），再次发起 HTTP 请求，获取这些资源的内容，直到网页完全加载显示。</li><li>浏览器在不需要和服务器通信时，可以主动关闭 TCP 连接，或者等待服务器的关闭请求。</li></ul><h3 id="tcp-三次握手-四次挥手" tabindex="-1"><a class="header-anchor" href="#tcp-三次握手-四次挥手"><span>tcp 三次握手 四次挥手</span></a></h3><p>得到服务器的IP地址后，浏览器与服务器之间需要通过TCP协议建立连接。 三次握手过程 TCP连接通过三次握手建立： <strong>SYN</strong>: 客户端发送一个SYN包请求连接。 <strong>SYN-ACK</strong>: 服务器收到后返回SYN-ACK包确认连接请求。 <strong>ACK</strong>: 客户端发送ACK包确认，连接建立。 四次挥手断开连接 数据传输完毕后，通过四次挥手断开连接： <strong>FIN</strong>: 客户端发送FIN包请求断开。 <strong>ACK</strong>: 服务器确认，返回ACK包。 <strong>FIN</strong>: 服务器发送FIN包请求断开。 <strong>ACK</strong>: 客户端确认，返回ACK包，连接断开。</p><p>浏览器与WEB服务器的连接过程是短暂的，每次连接只处理一个请求和响应。对每一个页面的访问，浏览器与WEB服务器都要建立一次单独的连接。 浏览器到WEB服务器之间的所有通讯都是完全独立分开的请求和响应对。</p><h2 id="请求和响应报文" tabindex="-1"><a class="header-anchor" href="#请求和响应报文"><span>请求和响应报文</span></a></h2><h3 id="请求报文" tabindex="-1"><a class="header-anchor" href="#请求报文"><span>请求报文</span></a></h3><figure><img src="https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448422796-cdb1debb-2f14-4cc4-95a4-0564125688ab.png#averageHue=%23eeefca&amp;clientId=u5437c1ab-ed6d-4&amp;from=paste&amp;id=u64a72177&amp;originHeight=558&amp;originWidth=908&amp;originalType=url&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;taskId=u4aa1696b-bfcf-425e-928f-73d7b4e8b45&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448521174-1f6c2271-450b-4757-852c-90f9e071396a.png#averageHue=%23e5e4de&amp;clientId=u5437c1ab-ed6d-4&amp;from=paste&amp;id=ud8c32a7c&amp;originHeight=714&amp;originWidth=1339&amp;originalType=url&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=920448&amp;status=done&amp;style=none&amp;taskId=uad8e0342-bca6-421f-bfe4-64941ef2c46&amp;title=" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="响应报文" tabindex="-1"><a class="header-anchor" href="#响应报文"><span>响应报文</span></a></h3><figure><img src="https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448449155-a95a3f8f-7e27-4108-b99a-decda40409de.png#averageHue=%23f0f1ce&amp;clientId=u5437c1ab-ed6d-4&amp;from=paste&amp;id=u3f35836b&amp;originHeight=518&amp;originWidth=854&amp;originalType=url&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;taskId=u286eacf5-4a4a-4819-a4ed-76376f0f1b7&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448540232-17f33867-cb58-4275-aaac-0ce063eb0978.png#averageHue=%23efefef&amp;clientId=u5437c1ab-ed6d-4&amp;from=paste&amp;id=u30e22ec8&amp;originHeight=295&amp;originWidth=629&amp;originalType=url&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=87508&amp;status=done&amp;style=none&amp;taskId=u5fa87804-ee2a-4161-8976-6c1b9a184b0&amp;title=" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h2 id="常见状态码" tabindex="-1"><a class="header-anchor" href="#常见状态码"><span>常见状态码</span></a></h2><p><img src="https://cdn.nlark.com/yuque/0/2024/png/43928099/1720572702026-62eed6e0-8741-488b-b705-589d16f1cac5.png#averageHue=%23e6e8d9&amp;clientId=ud9f65b91-4df0-4&amp;from=paste&amp;id=u86b58544&amp;originHeight=264&amp;originWidth=822&amp;originalType=url&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;taskId=u8de69ad7-ce20-4be6-b7ff-27836b69c68&amp;title=" alt="" loading="lazy"> 200 201 已创建。成功请求并创建了新的资源 202 已接受 ,但未完成处理</p><p>301 move permanently （永久性重定向） 302 found （临时性重定向） 303 see other （示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源） 304 not modified （表示在客户端采用带条件的访问某资源时，服务端找到了资源，但是这个请求的条件不符合。跟重定向无关） 307 temporary redirect （跟302一个意思）</p><p>401 请求要求用户的身份认证 403 服务器理解请求客户端的请求，但是拒绝执行此请求 405 客户端请求中的方法被禁止</p><p><strong>501 服务器不支持请求的功能，无法完成请求</strong><strong>502 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应</strong> 503 由于超载或系统维护，服务器暂时的无法处理客户端的请求。 504 充当网关或代理的服务器，未及时从远端服务器获取请求 505 服务器不支持请求的HTTP协议的版本，无法完成处理</p>',41),l=[n];function r(p,s){return t(),a("div",null,l)}const g=e(o,[["render",r],["__file","前端协议.html.vue"]]),m=JSON.parse('{"path":"/frontend/%E5%89%8D%E7%AB%AF%E5%8D%8F%E8%AE%AE.html","title":"前端基础概念","lang":"zh-CN","frontmatter":{"description":"前端基础概念 JAVAWEB的CS和BS模式 CS模式： Client-Server模式/客户端-服务端模式，该模式特点如下。 程序分两部分，一部分是客户端需要安装的程序，一部分是要部署在服务器上的程序； 用户需要在硬件设备或者操作系统中，下载安装特定的客户端程序才可以使用； 程序运行的压力由客户端和服务端共同承担； 可以借助客户端运算资源，对数据继续...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/impower-blogs/frontend/%E5%89%8D%E7%AB%AF%E5%8D%8F%E8%AE%AE.html"}],["meta",{"property":"og:site_name","content":"impower"}],["meta",{"property":"og:title","content":"前端基础概念"}],["meta",{"property":"og:description","content":"前端基础概念 JAVAWEB的CS和BS模式 CS模式： Client-Server模式/客户端-服务端模式，该模式特点如下。 程序分两部分，一部分是客户端需要安装的程序，一部分是要部署在服务器上的程序； 用户需要在硬件设备或者操作系统中，下载安装特定的客户端程序才可以使用； 程序运行的压力由客户端和服务端共同承担； 可以借助客户端运算资源，对数据继续..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448328295-9490f15b-4ae3-4ee3-a191-117bf236908f.png#averageHue=%23e6e4c6&clientId=u5437c1ab-ed6d-4&from=paste&id=u2ee25a6d&originHeight=218&originWidth=673&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u89571991-f097-4f50-b70b-5fddffad0af&title="}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T12:58:14.000Z"}],["meta",{"property":"article:author","content":"luke.lewis"}],["meta",{"property":"article:modified_time","content":"2024-07-15T12:58:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端基础概念\\",\\"image\\":[\\"https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448328295-9490f15b-4ae3-4ee3-a191-117bf236908f.png#averageHue=%23e6e4c6&clientId=u5437c1ab-ed6d-4&from=paste&id=u2ee25a6d&originHeight=218&originWidth=673&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u89571991-f097-4f50-b70b-5fddffad0af&title=\\",\\"https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448422796-cdb1debb-2f14-4cc4-95a4-0564125688ab.png#averageHue=%23eeefca&clientId=u5437c1ab-ed6d-4&from=paste&id=u64a72177&originHeight=558&originWidth=908&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4aa1696b-bfcf-425e-928f-73d7b4e8b45&title=\\",\\"https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448521174-1f6c2271-450b-4757-852c-90f9e071396a.png#averageHue=%23e5e4de&clientId=u5437c1ab-ed6d-4&from=paste&id=ud8c32a7c&originHeight=714&originWidth=1339&originalType=url&ratio=1&rotation=0&showTitle=false&size=920448&status=done&style=none&taskId=uad8e0342-bca6-421f-bfe4-64941ef2c46&title=\\",\\"https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448449155-a95a3f8f-7e27-4108-b99a-decda40409de.png#averageHue=%23f0f1ce&clientId=u5437c1ab-ed6d-4&from=paste&id=u3f35836b&originHeight=518&originWidth=854&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u286eacf5-4a4a-4819-a4ed-76376f0f1b7&title=\\",\\"https://cdn.nlark.com/yuque/0/2024/png/43928099/1718448540232-17f33867-cb58-4275-aaac-0ce063eb0978.png#averageHue=%23efefef&clientId=u5437c1ab-ed6d-4&from=paste&id=u30e22ec8&originHeight=295&originWidth=629&originalType=url&ratio=1&rotation=0&showTitle=false&size=87508&status=done&style=none&taskId=u5fa87804-ee2a-4161-8976-6c1b9a184b0&title=\\",\\"https://cdn.nlark.com/yuque/0/2024/png/43928099/1720572702026-62eed6e0-8741-488b-b705-589d16f1cac5.png#averageHue=%23e6e8d9&clientId=ud9f65b91-4df0-4&from=paste&id=u86b58544&originHeight=264&originWidth=822&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8de69ad7-ce20-4be6-b7ff-27836b69c68&title=\\"],\\"dateModified\\":\\"2024-07-15T12:58:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"luke.lewis\\",\\"url\\":\\"https://github.com/d3Lap1ace\\",\\"email\\":\\"aegonk@163.com\\"}]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"HTTP协议的会话方式","slug":"http协议的会话方式","link":"#http协议的会话方式","children":[{"level":3,"title":"tcp 三次握手 四次挥手","slug":"tcp-三次握手-四次挥手","link":"#tcp-三次握手-四次挥手","children":[]}]},{"level":2,"title":"请求和响应报文","slug":"请求和响应报文","link":"#请求和响应报文","children":[{"level":3,"title":"请求报文","slug":"请求报文","link":"#请求报文","children":[]},{"level":3,"title":"响应报文","slug":"响应报文","link":"#响应报文","children":[]}]},{"level":2,"title":"常见状态码","slug":"常见状态码","link":"#常见状态码","children":[]}],"git":{"createdTime":1720960541000,"updatedTime":1721048294000,"contributors":[{"name":"d3lap1ace L.Lewis","email":"ap1cem@163.com","commits":1},{"name":"d3lap1ace L.Lyu","email":"ap1cem@163.com","commits":1}]},"readingTime":{"minutes":8.31,"words":2493},"filePathRelative":"frontend/前端协议.md","localizedDate":"2024年7月14日","autoDesc":true}');export{g as comp,m as data};
