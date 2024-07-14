# 环境搭建
## Nodejs的简介和安装
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718088061955-87ceb45c-c14f-4d17-827a-e443318938b9.png#averageHue=%23d8d8d8&clientId=u2b254a53-9fc8-4&from=paste&height=664&id=u05ae45d0&originHeight=664&originWidth=1092&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71208&status=done&style=none&taskId=uaf84a00d-bf05-4169-a46e-38cc95fc147&title=&width=1092)
### 什么是Nodejs
> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，可以使 JavaScript 运行在服务器端。使用 Node.js，可以方便地开发服务器端应用程序，如 Web 应用、API、后端服务，还可以通过 Node.js 构建命令行工具等。相比于传统的服务器端语言（如 PHP、Java、Python 等），Node.js 具有以下特点：

- 单线程，但是采用了事件驱动、异步 I/O 模型，可以处理高并发请求；
- 轻量级，使用 C++ 编写的 V8 引擎让 Node.js 的运行速度很快；
- 模块化，Node.js 内置了大量模块，同时也可以通过第三方模块扩展功能；
- 跨平台，可以在 Windows、Linux、Mac 等多种平台下运行；
> Node.js 的核心是其管理事件和异步 I/O 的能力。Node.js 的异步 I/O 使其能够处理大量并发请求，并且能够避免在等待 I/O 资源时造成的阻塞。此外，Node.js 还拥有高性能网络库和文件系统库，可用于搭建 WebSocket 服务器、上传文件等。`在 Node.js 中，我们可以使用 JavaScript 来编写服务器端程序，这也使得前端开发人员可以利用自己已经熟悉的技能来开发服务器端程序，同时也让 JavaScript 成为一种全栈语言。`Node.js 受到了广泛的应用，包括了大型企业级应用、云计算、物联网、游戏开发等领域。常用的 Node.js 框架包括 Express、Koa、Egg.js 等，它们能够显著提高开发效率和代码质量。

### 安装
office  select  LTS vserion     and    node -v   or  npm -v   check vserion

## npm 配置和使用
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718088290194-878cb375-a0fb-41b8-adbb-fa5e7b2a1013.png#averageHue=%23e79e9e&clientId=u2b254a53-9fc8-4&from=paste&height=328&id=ucb6a6bfd&originHeight=328&originWidth=792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23901&status=done&style=none&taskId=uaead7692-3235-4905-b2ae-9e8d916781e&title=&width=792)
### npm介绍
NPM全称Node Package Manager，是Node.js包管理工具，是全球最大的模块生态系统，里面所有的模块都是开源免费的；也是Node.js的包管理工具，相当于后端的Maven的部分功能 。
### npm 安装和配置
1、安装 ：安装Nodejs，自动安装npm包管理工具！
2、配置依赖下载使用阿里镜像：
npm config set registry https://registry.npmmirror.com
查看当前 registry 的配置
npm config get registry
如果需要恢复默认的官方源，可以执行以下命令：
npm config set registry https://registry.npmjs.org/
3、配置全局依赖下载后存储位置：

- 在 Windows 系统上，npm 的全局依赖默认安装在 <用户目录>\AppData\Roaming\npm 目录下。
- 如果需要修改全局依赖的安装路径，可以按照以下步骤操作：
   1. 创建一个新的全局依赖存储目录，例如D:\GlobalNodeModules。

打开命令行终端，执行以下命令来配置新的全局依赖存储路径：

   2. npm config set prefix "D:\GlobalNodeModules"

确认配置已生效，可以使用以下命令查看当前的全局依赖存储路径：

   3. npm config get prefix

4、升级npm版本：

- cmd 输入npm -v 查看版本，如果node中自带的npm版本过低！则需要升级至9.6.6！

npm install -g npm@9.6.6
### npm 常用命令
1、项目初始化：

- npm init
   - 进入一个vscode创建好的项目中，执行 npm init 命令后，npm 会引导您在命令行界面上回答一些问题，例如项目名称、版本号、作者、许可证等信息，并最终生成一个package.json 文件。package.json信息会包含项目基本信息！类似maven的pom.xml。
- npm init -y
   - 执行，-y yes的意思，所有信息使用当前文件夹的默认值！不用挨个填写！

2、安装依赖 (查看所有依赖地址 [https://www.npmjs.com](https://www.npmjs.com/) )：

- npm install 包名 或者 npm install 包名@版本号
   - 安装包或者指定版本的依赖包(安装到当前项目中)。
- npm install -g 包名
   - 安装全局依赖包(安装到d:/GlobalNodeModules)则可以在任何项目中使用它，而无需在每个项目中独立安装该包。
- npm install
   - 安装package.json中的所有记录的依赖。

3、升级依赖：

- npm update 包名
   - 将依赖升级到最新版本。

4、卸载依赖：

- npm uninstall 包名

5、查看依赖：

- npm ls
   - 查看项目依赖。
- npm list -g
   - 查看全局依赖。

6、运行命令：

- npm run 命令是在执行 npm 脚本时使用的命令。npm 脚本是一组在 package.json 文件中定义的可执行命令。npm 脚本可用于启动应用程序，运行测试，生成文档等，还可以自定义命令以及配置需要运行的脚本。
- 在 package.json 文件中，scripts 字段是一个对象，其中包含一组键值对，键是要运行的脚本的名称，值是要执行的命令。
# Vue3简介
## **Vue的两个核心功能：**

- **声明式渲染**：Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系；
- **响应性**：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM  ；
## Vue3通过Vite实现工程化
### Vite的介绍
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718101530104-ec61b724-6094-4e63-9e19-74712de597db.png#averageHue=%23c4ccf9&clientId=uae7c84f0-9f17-4&from=paste&height=471&id=uf7f2f7a0&originHeight=471&originWidth=613&originalType=binary&ratio=1&rotation=0&showTitle=false&size=290358&status=done&style=none&taskId=u093ca09a-faa8-49e4-bdb2-62c0d564a09&title=&width=613)

> 在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。这也正是我们对 “打包” 这个概念熟悉的原因：使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件。时过境迁，我们见证了诸如 [webpack](https://webpack.js.org/)、[Rollup](https://rollupjs.org/) 和 [Parcel](https://parceljs.org/) 等工具的变迁，它们极大地改善了前端开发者的开发体验。



1. 快速创建项目：使用脚手架可以快速搭建项目基本框架，避免从零开始搭建项目的重复劳动和繁琐操作，从而节省时间和精力；
2. 统一的工程化规范：前端脚手架可以预设项目目录结构、代码规范、git提交规范等统一的工程化规范，让不同开发者在同一个项目上编写出风格一致的代码，提高协作效率和质量；
3. 代码模板和组件库：前端脚手架可以包含一些常用的代码模板和组件库，使开发者在实现常见功能时不再重复造轮子，避免因为轮子质量不高带来的麻烦，能够更加专注于项目的业务逻辑；
4. 自动化构建和部署：前端脚手架可以自动进行代码打包、压缩、合并、编译等常见的构建工作，可以通过集成自动化部署脚本，自动将代码部署到测试、生产环境等；
### Vite+Vue3项目的创建、启动、停止
```powershell
npm create vite@latest
cd ./vue3-demo1
npm install
npm run dev
ctrl+c
```
### Vite+Vue3项目的目录结构
> ![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718101843988-0c07a3a8-6710-4dea-988b-4b9cef841aa3.png#averageHue=%23f0efed&clientId=uae7c84f0-9f17-4&from=paste&height=498&id=u4b3771b0&originHeight=498&originWidth=294&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19443&status=done&style=none&taskId=u1a3f937a-2707-43f1-b218-06484c7737d&title=&width=294)

- public/ 目录：用于存放一些公共资源，如 HTML 文件、图像、字体等，这些资源会被直接复制到构建出的目标目录中。
- src/ 目录：存放项目的源代码，包括 JavaScript、CSS、Vue 组件、图像和字体等资源。在开发过程中，这些文件会被 Vite 实时编译和处理，并在浏览器中进行实时预览和调试。以下是src内部划分建议： 
   1. `assets/` 目录：用于存放一些项目中用到的静态资源，如图片、字体、样式文件等。
   2. `components/` 目录：用于存放组件相关的文件。组件是代码复用的一种方式，用于抽象出一个可复用的 UI 部件，方便在不同的场景中进行重复使用。
   3. `layouts/` 目录：用于存放布局组件的文件。布局组件通常负责整个应用程序的整体布局，如头部、底部、导航菜单等。
   4. `pages/` 目录：用于存放页面级别的组件文件，通常是路由对应的组件文件。在这个目录下，可以创建对应的文件夹，用于存储不同的页面组件。
   5. `plugins/` 目录：用于存放 Vite 插件相关的文件，可以按需加载不同的插件来实现不同的功能，如自动化测试、代码压缩等。
   6. `router/` 目录：用于存放 Vue.js 的路由配置文件，负责管理视图和 URL 之间的映射关系，方便实现页面之间的跳转和数据传递。
   7. `store/` 目录：用于存放 Vuex 状态管理相关的文件，负责管理应用程序中的数据和状态，方便统一管理和共享数据，提高开发效率。
   8. `utils/` 目录：用于存放一些通用的工具函数，如日期处理函数、字符串操作函数等。
- vite.config.js 文件：Vite 的配置文件，可以通过该文件配置项目的参数、插件、打包优化等。该文件可以使用 CommonJS 或 ES6 模块的语法进行配置。
- package.json 文件：标准的 Node.js 项目配置文件，包含了项目的基本信息和依赖关系。其中可以通过 scripts 字段定义几个命令，如 dev、build、serve 等，用于启动开发、构建和启动本地服务器等操作。
- Vite 项目的入口为 src/main.js 文件，这是 Vue.js 应用程序的启动文件，也是整个前端应用程序的入口文件。在该文件中，通常会引入 Vue.js 及其相关插件和组件，同时会创建 Vue 实例，挂载到 HTML 页面上指定的 DOM 元素中。

### Vite+Vue3项目组件(SFC入门)

> 什么是VUE的组件?

- 一个页面作为整体，是由多个部分组成的，每个部分在这里就可以理解为一个组件；
- 每个.vue文件就可以理解为一个组件，多个.vue文件可以构成一个整体页面；
- 组件化给我们带来的另一个好处就是组件的复用和维护非常的方便；
> 什么是.vue文件?

-  传统的页面有html文件css文件和js文件三个文件组成(多文件组件) ； 
-  vue将这文件合并成一个vue文件(Single-File Component，简称 SFC，单文件组件)； 
-  vue文件对js/css/html统一封装，这是VUE中的概念，该文件由三个部分组成    `<script> <template> <style>`； 
   - template标签     代表组件的html部分代码，代替传统的html文件；
   - script标签           代表组件的js代码，代替传统的js文件；
   - style标签            代表组件的css样式代码，代替传统的css文件	；
> 工程化vue项目如何组织这些组件?

- index.html是项目的入口，其中 `<div id ='app'></div>`是用于挂载所有组建的元素；
- index.html中的script标签引入了一个main.js文件，具体的挂载过程在main.js中执行；
- main.js是vue工程中非常重要的文件，他决定这项目使用哪些依赖，导入的第一个组件；
- App.vue是vue中的核心组件，所有的其他组件都要通过该组件进行导入，该组件通过路由可以控制页面的切换；

![](images/1684912274904.png#id=Jf8Ca&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### Vite+Vue3响应式入门和setup函数
```html
<script>
    //存储vue页面逻辑js代码
</script>
<template>
    <!-- 页面的样式的是html代码-->
</template>
<style scoped>
    /** 存储的是css代码! <style scoped> 是 Vue.js 单文件组件中用于设置组件样式的一种方式。
    它的含义是将样式局限在当前组件中，不对全局样式造成影响。 */
</style>
```
> 2 Vue3响应式数据入门：

```html
<script type="module">
    //存储vue页面逻辑js代码
    import {ref} from 'vue'
    export default{
        setup(){
            //非响应式数据: 修改后VUE不会更新DOM
            //响应式数据:   修改后VUE会更新DOM
            //VUE2中数据默认是响应式的
            //VUE3中数据要经过ref或者reactive处理后才是响应式的
            //ref是VUE3框架提供的一个函数,需要导入
            //let counter = 1
            //ref处理的响应式数据在js编码修改的时候需要通过.value操作
            //ref响应式数据在绑定到html上时不需要.value
            let counter = ref(1)
            function increase(){
                // 通过.value修改响应式数据
                counter.value++
            }
            function decrease(){
                counter.value--
            }
            return {
                counter,
                increase,
                decrease
            }
        }
    }
</script>
<template>
    <div>
      <button @click="decrease()">-</button>
      {{ counter }}
      <button @click="increase()">+</button>
    </div>
</template>
<style scoped>
    button{
        border: 1px solid red;
    }
</style>
```

> 3 Vue3 setup函数和语法糖：


- 位置：src/App.vue。

```vue
<script type="module" setup>   
/* 通过setup关键字，可以省略 export default {setup(){   return{}}}这些冗余的语法结构 */
    import {ref} from 'vue'
    // 定义响应式数据
    let counter = ref(1)
    // 定义函数
    function increase(){
        counter.value++
    }
    function decrease(){
        counter.value--
    }  
</script>
<template>
    <div>
      <button @click="decrease()">-</button>
      {{ counter }}
      <button @click="increase()">+</button>
    </div>
</template>
<style scoped>
    button{
        border: 1px solid red;
    }
</style>
```

###  Vite+Vue3关于样式的导入方式

1.  全局引入main.js； 
```javascript
import './style/reset.css' //书写引入的资源的相对路径即可！
```
 

2.  vue文件script代码引入； 
```javascript
import './style/reset.css'
```
 

3.  Vue文件style代码引入； 
```javascript
@import './style/reset.css'
```
### 
## vue3 视图渲染技术
### 模板语法
#### 插值表达式
最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 ，即双大括号{{}}：

- v-text可以将数据渲染成双标签中间的文本，但是不识别html元素结构的文本；
- v-html可以将数据渲染成双标签中间的文本，识别html元素结构的文本；
#### Attribute属性渲染
v-bind指令

- 由于插值表达式不能直接放在标签的属性中，要渲染元素的属性就应该使用v-bind；
- v-bind可以用于渲染任何元素的属性，语法为 v-bind:属性名='数据名'， 可以简写为 :属性名='数据名'；
#### 事件的绑定
v-on 来监听 DOM 事件

- 用法：`v-on:click="handler"` 或简写为 `@click="handler"`；
- vue中的事件名=原生事件名去掉`on` 前缀   如:`onClick --> click`；
- handler的值可以是方法事件处理器，也可以是内联事件处理器；
- 绑定事件时，可以通过一些绑定的修饰符，常见的事件修饰符如下： 
   - `.once：只触发一次事件。[重点]`；
   - `.prevent：阻止默认事件。[重点]`；
   - .stop：阻止事件冒泡；
   - .capture：使用事件捕获模式而不是冒泡模式；
   - .self：只在事件发送者自身触发时才触发事件；
### 响应式基础
#### 响应式实现关键字ref
ref 可以将一个基本类型的数据（如字符串，数字等）转换为一个响应式对象。 ref 只能包裹单一元素。
#### 响应式实现关键字reactive
我们可以使用 reactive() 函数创建一个响应式对象或数组：
#### 对比ref和reactive

-  使用 `ref` 适用于以下开发场景： 
   - 包装基本类型数据：ref 主要用于包装基本类型数据（如字符串、数字等），即只有一个值的数据，如果你想监听这个值的变化，用 ref最为方便。在组件中使用时也很常见。
   - 访问方式简单：ref 对象在访问时与普通的基本类型值没有太大区别，只需要通过 .value访问其实际值即可。
-  使用 `reactive` 适用于以下开发场景： 
   - 包装复杂对象：reactive可以将一个普通对象转化为响应式对象，这样在数据变化时会自动更新界面，特别适用于处理复杂对象或者数据结构。
   - 需要递归监听的属性：使用 reactive 可以递归追踪所有响应式对象内部的变化，从而保证界面的自动更新。
-  综上所述，ref适用与简单情形下的数据双向绑定，对于只有一个字符等基本类型数据或自定义组件等情况，建议可以使用 ref；而对于对象、函数等较为复杂的数据结构，以及需要递归监听的属性变化，建议使用 reactive。当然，在实际项目中根据需求灵活选择也是十分必要的。 
### 条件和列表渲染

#### 6.3.1 条件渲染

> `v-if` 条件渲染：


-  `v-if='表达式'`只会在指令的表达式返回真值时才被渲染 
-  也可以使用 `v-else` 为 `v-if` 添加一个“else 区块”。 
-  一个 `v-else` 元素必须跟在一个 `v-if` 元素后面，否则它将不会被识别。 

```html
<script type="module" setup>
    import {ref} from 'vue'
    let awesome = ref(true)
</script>
<template>
  <div>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
    <button @click="awesome = !awesome">Toggle</button>
  </div>
</template> 
<style scoped>
</style>
```

> `v-show`条件渲染扩展：


-  另一个可以用来按条件显示一个元素的指令是 `v-show`。其用法基本一样； 
-  不同之处在于 `v-show` 会在 DOM 渲染中保留该元素；`v-show` 仅切换了该元素上名为 `display` 的 CSS 属性； 
-  `v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用； 

```html
<script type="module" setup>
    import {ref} from 'vue'
    let awesome = ref(true)
</script>
<template>
  <div>
    <h1 id="ha"  v-show="awesome">Vue is awesome!</h1>
    <h1 id="hb"  v-if="awesome">Vue is awesome!</h1>
    <h1 id="hc"  v-else>Oh no 😢</h1>
    <button @click="awesome = !awesome">Toggle</button>
  </div>
</template> 
<style scoped>
</style>
```

![](images/1684565503347.png#id=MITEW&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

> `**v-if**`    **vs** `**v-show**`：


-  `v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建； 
-  `v-if` 也是**惰性**的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染； 
-  相比之下，`v-show` 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS `display` 属性会被切换； 
-  总的来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适； 

#### 6.3.2 列表渲染

> 我们可以使用 `v-for` 指令基于一个数组来渲染一个列表：


-  `v-for` 指令的值需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据的数组，而 `item` 是迭代项的别名； 
-  在 `v-for` 块中可以完整地访问父作用域内的属性和变量。`v-for` 也支持使用可选的第二个参数表示当前项的位置索引； 

```html
<script type="module" setup>
    import {ref,reactive} from 'vue'
    let parentMessage= ref('产品')
    let items =reactive([
      {
        id:'item1',
        message:"薯片"
      },
      {
        id:'item2',
        message:"可乐"
      }
    ])
</script>
<template>
  <div>
    <ul>
      <!-- :key不写也可以 -->
      <li v-for='item in items' :key='item.id'>
        {{ item.message }}
      </li>
    </ul>
    <ul>
      <!-- index表示索引 -->
      <li v-for="(item, index) in items" :key="index">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>
  </div>
</template> 
<style scoped>
</style>
```

- 案例：实现购物车显示和删除购物项

```html
<script type="module" setup>
    //引入模块
    import { reactive} from 'vue'
    //准备购物车数据,设置成响应数据
    const carts = reactive([{name:'可乐',price:3,number:10},{name:'薯片',price:6,number:8}])
    //计算购物车总金额
    function compute(){
      let count = 0;
      for(let index in carts){
        count += carts[index].price*carts[index].number;
      }
      return count;
    }
    //删除购物项方法
    function removeCart(index){
      carts.splice(index,1);
    }
</script>
<template>
    <div>
        <table>
           <thead>
               <tr>
                  <th>序号</th>
                  <th>商品名</th>
                  <th>价格</th>
                  <th>数量</th>
                  <th>小计</th>
                  <th>操作</th>
               </tr>
           </thead>
           <tbody v-if="carts.length > 0">
               <!-- 有数据显示-->
               <tr v-for="cart,index in carts" :key="index">
                  <th>{{ index+1 }}</th>
                  <th>{{ cart.name }}</th>
                  <th>{{ cart.price + '元' }}</th>
                  <th>{{ cart.number }}</th>
                  <th>{{ cart.price*cart.number  + '元'}}</th>
                  <th> <button @click="removeCart(index)">删除</button> </th>
               </tr>
           </tbody>
           <tbody v-else>
               <!-- 没有数据显示-->
               <tr>
                  <td colspan="6">购物车没有数据!</td>
               </tr>
           </tbody>
        </table>
        购物车总金额: {{ compute() }} 元
    </div>
</template> 
<style scoped>
</style>
```
### 双向绑定

> 单项绑定和双向绑定：


- 单向绑定：响应式数据的变化会更新dom树，但是dom树上用户的操作造成的数据改变`不会同步更新到响应式数据`；
- 双向绑定：响应式数据的变化会更新dom树，但是dom树上用户的操作造成的数据改变`会同步更新到响应式数据`； 
   - 用户通过表单标签才能够输入数据，所以双向绑定都是应用到表单标签上的，其他标签不行；
   - v-model专门用于双向绑定表单标签的value属性，语法为 `v-model:value=''`，可以简写为 `v-model=''`；
   - v-model还可以用于各种不同类型的输入，`<textarea>`、`<select>` 元素；

```html
<script type="module" setup>
  //引入模块
  import { reactive,ref} from 'vue' 
  let hbs = ref([]); //装爱好的值
  let user = reactive({username:null,password:null,introduce:null,pro:null})   
  function login(){
    alert(hbs.value);
    alert(JSON.stringify(user));
  }
  function clearx(){
    //user = {};// 这中写法会将数据变成非响应的,应该是user.username=""
    user.username=''
    user.password=''
    user.introduce=''
    user.pro=''
    hbs.value.splice(0,hbs.value.length);;
  }
</script>
<template>
  <div>
      账号： <input type="text" placeholder="请输入账号！" v-model="user.username"> <br>
      密码： <input type="text" placeholder="请输入账号！" v-model="user.password"> <br>
      爱好： 
        吃 <input type="checkbox" name="hbs" v-model="hbs" value="吃"> 
        喝 <input type="checkbox" name="hbs" v-model="hbs" value="喝">
        玩 <input type="checkbox" name="hbs" v-model="hbs" value="玩">
        乐 <input type="checkbox" name="hbs" v-model="hbs" value="乐">
      <br>
      简介:<textarea v-model="user.introduce"></textarea>
      <br>
      籍贯:
          <select v-model="user.pro">
            <option value="1">黑</option>
            <option value="2">吉</option>
            <option value="3">辽</option>
            <option value="4">京</option>
            <option value="5">津</option>
            <option value="6">冀</option>
          </select> 
      <br>
      <button @click="login()">登录</button> 
      <button @click="clearx()">重置</button>
      <hr>
      显示爱好:{{ hbs }}
      <hr>
      显示用户信息:{{ user }}
  </div> 
</template> 
<style scoped>
</style>
```

### 计算属性

> 模板中的表达式虽然方便，但也只能用来做简单的操作。如果在模板中写太多逻辑，会让模板变得臃肿，难以维护。比如说，我们有这样一个包含嵌套数组的对象：


```html
<script type="module" setup>
  //引入模块
  import { reactive,computed} from 'vue'
  const author = reactive({
    name: 'John Doe',
    books: [
      'Vue 2 - Advanced Guide',
      'Vue 3 - Basic Guide',
      'Vue 4 - The Mystery'
    ]
  })
</script>
<template>
  <div>
    <p>{{author.name}} Has published books?:</p>
    <span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
  </div>
</template> 
<style scoped>
</style>
```

- 这里的模板看起来有些复杂。我们必须认真看好一会儿才能明白它的计算依赖于 `author.books`。更重要的是，如果在模板中需要不止一次这样的计算，我们可不想将这样的代码在模板里重复好多遍。

> 因此我们推荐使用**计算属性**来描述依赖响应式状态的复杂逻辑。这是重构后的示例：


```html
<script type="module" setup>
  //引入模块
  import { reactive,computed} from 'vue'
  const author = reactive({
    name: 'John Doe',
    books: [
      'Vue 2 - Advanced Guide',
      'Vue 3 - Basic Guide',
      'Vue 4 - The Mystery'
    ]
  })
  // 一个计算属性 ref
  const publishedBooksMessage = computed(() => {
    console.log("publishedBooksMessage")
    return author.books.length > 0 ? 'Yes' : 'No'
  })
  // 一个函数
  let hasBooks = ()=>{
    console.log("hasBooks")
    return author.books.length > 0?'Yes':'no'
  }
</script>
<template>
  <div>
    <p>{{author.name}} Has published books?:</p>
    <span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
    <span>{{ hasBooks() }}</span><!-- 调用方法,每个标签都会调用一次 -->
    <span>{{ hasBooks() }}</span>

    <p>{{author.name}} Has published books?:</p>
    <span>{{ publishedBooksMessage }}</span><!-- 属性计算,属性值不变时,多个标签只会调用一次 -->
    <span>{{ publishedBooksMessage }}</span>
  </div>
</template> 
<style scoped>
</style>
```

-  我们在这里定义了一个计算属性 `publishedBooksMessage`。`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**。和其他一般的 ref 类似，你可以通过 `publishedBooksMessage.value` 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value`。 
-  Vue 的计算属性会自动追踪响应式依赖。它会检测到 `publishedBooksMessage` 依赖于 `author.books`，所以当 `author.books` 改变时，任何依赖于 `publishedBooksMessage` 的绑定都会同时更新。 

> 计算属性缓存 vs 方法：


- 若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于**计算属性值会基于其响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 `author.books` 不改变，无论多少次访问 `publishedBooksMessage` 都会立即返回先前的计算结果!

### 数据监听器

> 计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。我们可以使用 [watch](https://cn.vuejs.org/api/reactivity-core.html#watch)[ 函数](https://cn.vuejs.org/api/reactivity-core.html#watch)在每次响应式状态发生变化时触发回调函数：


- watch主要用于以下场景： 
   - 当数据发生变化时需要执行相应的操作；
   - 监听数据变化，当满足一定条件时触发相应操作；
   - 在异步操作前或操作后需要执行相应的操作；

> 监控响应式数据（watch）：


```html
<script type="module" setup>
  import { ref,reactive,watch} from 'vue'
  let firstname=ref('')
  let lastname=reactive({name:''})
  let fullname=ref('')
  //监听一个ref响应式数据
  watch(firstname,(newValue,oldValue)=>{
    console.log(`${oldValue}变为${newValue}`)
    fullname.value=firstname.value+lastname.name
  })
  //监听reactive响应式数据的指定属性
  watch(()=>lastname.name,(newValue,oldValue)=>{
    console.log(`${oldValue}变为${newValue}`)
    fullname.value=firstname.value+lastname.name
  })
  //监听reactive响应式数据的所有属性(深度监视,一般不推荐)
  //deep:true 深度监视
  //immediate:true 深度监视在进入页面时立即执行一次
  watch(()=>lastname,(newValue,oldValue)=>{
    // 此时的newValue和oldValue一样,都是lastname
    console.log(newValue)
    console.log(oldValue)
    fullname.value=firstname.value+lastname.name
  },{deep:true,immediate:false})
</script>
<template>
  <div>
    全名:{{fullname}} <br>
    姓氏:<input type="text" v-model="firstname"> <br>
    名字:<input type="text" v-model="lastname.name" > <br>
  </div>
</template> 
<style scoped>
</style>
```

> 监控响应式数据(watchEffect)：


- watchEffect默认监听所有的响应式数据

```html
<script type="module" setup>
  import { ref,reactive,watch, watchEffect} from 'vue' 
  let firstname=ref('')
  let lastname=reactive({name:''})
  let fullname=ref('')
  //监听所有响应式数据
  watchEffect(()=>{
    //直接在内部使用监听属性即可！不用外部声明
    //也不需要，即时回调设置！默认初始化就加载！
    console.log(firstname.value)
    console.log(lastname.name)
    fullname.value=`${firstname.value}${lastname.name}`
  })
</script>
<template>
  <div>
    全名:{{fullname}} <br>
    姓氏:<input type="text" v-model="firstname"> <br>
    名字:<input type="text" v-model="lastname.name" > <br>
  </div>
</template> 
<style scoped>
</style>
```

> `watch` vs. `watchEffect`：


- `watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式： 
   - `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机；
   - `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确；

### Vue生命周期

#### 生命周期简介

> 每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。在此过程中，它也会运行被称为`生命周期钩子的函数`，让开发者有机会在特定阶段运行自己的代码!


- 周期图解：

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718519366310-5f4d113c-f9ec-4ed8-8273-e2d835a79f7a.png#averageHue=%23000000&clientId=ub15ddbbd-fb54-4&from=paste&height=2002&id=u436c4b65&originHeight=2002&originWidth=1266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=158667&status=done&style=none&taskId=uc9be0277-a7e1-4e22-aa9d-81707d15850&title=&width=1266)
![](images/image_elceCM4Wbp.png#id=qgfJD&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- 常见钩子函数： 
   - onMounted()              注册一个回调函数，在组件挂载完成后执行；
   - onUpdated()               注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用；
   - onUnmounted()         注册一个回调函数，在组件实例被卸载之后调用；
   - onBeforeMount()       注册一个钩子，在组件被挂载之前被调用；
   - onBeforeUpdate()      注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用；
   - onBeforeUnmount()  注册一个钩子，在组件实例被卸载之前调用；

####  生命周期案例

```html
<script setup>
    import {ref,onUpdated,onMounted,onBeforeUpdate} from 'vue'
    let message =ref('hello')   
    // 挂载完毕生命周期
    onMounted(()=>{
      console.log('-----------onMounted---------')
      let span1 =document.getElementById("span1")
      console.log(span1.innerText)
    })
    // 更新前生命周期
    onBeforeUpdate(()=>{
      console.log('-----------onBeforeUpdate---------')
      console.log(message.value)
      let span1 =document.getElementById("span1")
      console.log(span1.innerText)
    })
    // 更新完成生命周期
    onUpdated(()=>{
      console.log('-----------onUpdated---------')
      let span1 =document.getElementById("span1")
      console.log(span1.innerText)
    })
</script>
<template>
  <div>
    <span id="span1" v-text="message"></span> <br>
    <input type="text" v-model="message">
  </div>
</template>
<style scoped>
</style>
```

### Vue组件
### Vue组件
#### 组件基础
传统方式编写应用：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718367156720-9ad5ec71-1727-445a-9aa0-366a22438842.png#averageHue=%2344413e&clientId=uf500b35e-48ba-4&from=paste&height=994&id=u5aacfe10&originHeight=994&originWidth=1742&originalType=binary&ratio=1&rotation=0&showTitle=false&size=487237&status=done&style=none&taskId=u034620bf-3d6a-49c7-b27f-f44ac7de5d8&title=&width=1742)
组件方式编写应用：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1718367166817-1b3f4225-0d1e-4fb0-b9e9-733f601eeb63.png#averageHue=%23d0d039&clientId=uf500b35e-48ba-4&from=paste&height=1042&id=uc0a3e511&originHeight=1042&originWidth=1824&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1293105&status=done&style=none&taskId=u95de3071-9aa2-4b6b-a6ee-7f41f61a769&title=&width=1824)

- 组件化：对js/css/html统一封装，这是Vue中的概念；
- 模块化：对js的统一封装,这是ES6中的概念；
- 组件化中，对js部分代码的处理使用ES6中的模块化；

#### 组件之间传递数据
##### 父传子
Vue3 中父组件向子组件传值可以通过 props 进行，具体操作如下：

1. 首先，在父组件中定义需要传递给子组件的值，接着，在父组件的模板中引入子组件，同时在引入子组件的标签中添加 props 属性并为其设置需要传递的值。
2. 在 Vue3 中，父组件通过 props 传递给子组件的值是响应式的。也就是说，如果在父组件中的传递的值发生了改变，子组件中的值也会相应地更新。
- 父组件代码：App.vue
```
<script setup>
  import Son from './components/Son.vue'
  import {ref,reactive,toRefs} from 'vue'
  let message = ref('parent data!')
  let title = ref(42)
  function changeMessage(){
    message.value = '修改数据！'
    title.value++
  }
</script>
<template>
  <div>
    <h2>{{ message }}</h2>
    <hr>
    <!-- 使用子组件，并且传递数据！ -->
    <Son :message="message" :title="title"></Son>
    <hr>
    <button @click="changeMessage">点击更新</button>
  </div>
</template>
<style scoped>
</style>
```

- 子组件代码：Son.vue
```
<script setup type="module">
    import {ref,isRef,defineProps} from 'vue'
    //声明父组件传递属性值
    defineProps({
        message:String ,
        title:Number
    })
</script>
<template>
    <div>
    <div>{{ message }}</div>
    <div>{{ title }}</div>
    </div>
</template>
<style>
</style>
```
##### 子传父

- 父组件： App.vue
```
<script setup>
    import Son from './components/Son.vue'
    import {ref} from 'vue'
    let pdata = ref('')
    const padd = (data) => {
        console.log('2222');
        pdata.value =data;
    }
    //自定义接收，子组件传递数据方法！ 参数为数据！
    const psub = (data) => {
        console.log('11111');
        pdata.value = data;
    }
</script>
<template>
    <div>
        <!-- 声明@事件名应该等于子模块对应事件名！调用方法可以是当前自定义！-->
        <Son @add="padd" @sub="psub"></Son>
        <hr>
        {{ pdata }}
    </div>
</template>
<style>
</style>
```

- 子组件：Son.vue
```
<script setup>
    import {ref,defineEmits} from 'vue'
    //1.定义要发送给父组件的方法，可以1或者多个
    let emites = defineEmits(['add','sub']);
    let data = ref(1);
    function sendMsgToParent(){
        //2.出发父组件对应的方法，调用defineEmites对应的属性
        emites('add','add data!'+data.value)
        emites('sub','sub data!'+data.value)
        data.value ++;
    }
</script>
<template>
    <div>
      <button @click="sendMsgToParent">发送消息给父组件</button>
    </div>
</template>
```
##### 兄弟传参

- Navigator.vue: 发送数据到App.vue
```
<script setup type="module">
    import {defineEmits} from 'vue'
    const emits = defineEmits(['sendMenu']);
    //触发事件，向父容器发送数据
    function send(data){
        emits('sendMenu',data);
    }
</script>
<template>
    <!-- 推荐写一个根标签-->
    <div>
       <ul>
          <li @click="send('学员管理')">学员管理</li>
          <li @click="send('图书管理')">图书管理</li>
          <li @click="send('请假管理')">请假管理</li>
          <li @click="send('考试管理')">考试管理</li>
          <li @click="send('讲师管理')">讲师管理</li>
       </ul>
    </div>
</template>
<style>
</style>
```

- App.vue: 发送数据到Content.vue
```
<script setup>
  import Header  from './components/Header.vue'
  import Navigator  from './components/Navigator.vue'
  import Content  from './components/Content.vue'
  import {ref} from "vue"
  //定义接受navigator传递参数
  var navigator_menu = ref('ceshi');
  const receiver = (data) =>{
    navigator_menu.value = data;
  }
</script>
<template>
  <div>
      <hr>
      {{ navigator_menu }}
      <hr>
     <Header class="header"></Header>
     <Navigator @sendMenu="receiver" class="navigator"></Navigator>
     <!-- 向子组件传递数据-->
     <Content class="content" :message="navigator_menu"></Content>
    </div>
</template>
<style scoped>
    .header{
       height: 80px;
       border: 1px solid red;
    }
    .navigator{
      width: 15%;
      height: 800px;
      display: inline-block;
      border: 1px blue solid;
      float: left;
    }
    .content{
      width: 83%;
      height: 800px;
      display: inline-block;
      border: 1px goldenrod solid;
      float: right;
    }
</style>
```

- Content.vue
```
<script setup type="module">
    defineProps({
        message:String
    })
</script>
<template>
    <div>
        展示的主要内容！
        <hr>
        {{ message }}
    </div>
</template>
<style>
</style>
```
## Vue3路由机制Router
1 什么是路由？

- 定义：路由就是根据不同的 URL 地址展示不同的内容或页面；
- 通俗理解：路由就像是一个地图，我们要去不同的地方，需要通过不同的路线进行导航；

2 路由的作用：

- 单页应用程序（SPA）中，路由可以实现不同视图之间的无刷新切换，提升用户体验；
- 路由还可以实现页面的认证和权限控制，保护用户的隐私和安全；
- 路由还可以利用浏览器的前进与后退，帮助用户更好地回到之前访问过的页面；
### 快速上手
> 准备页面和组件    ：

- components/Home.vue
```html
<script setup>
</script>
<template>
    <div>
        <h1>Home页面</h1>
    </div>
</template>
<style scoped>
</style>
```

- components/List.vue
```html
<script setup>
</script>
<template>
    <div>
        <h1>List页面</h1>
    </div>
</template>
<style scoped>
</style>
```

- components/Add.vue
```html
<script setup>
</script>
<template>
    <div>
        <h1>Add页面</h1>
    </div>
</template>
<style scoped>
</style>
```

- components/Update.vue
```html
<script setup>
</script>
<template>
    <div>
        <h1>Update页面</h1>
    </div>
</template>
<style scoped>
</style>
```
> 准备路由配置：

- src/routers/router.js
```javascript
// 导入路由创建的相关方法
import {createRouter,createWebHashHistory} from 'vue-router'
// 导入vue组件
import Home from '../components/Home.vue'
import List from '../components/List.vue'
import Add from '../components/Add.vue'
import Update from '../components/Update.vue'
// 创建路由对象,声明路由规则
const router = createRouter({
    //createWebHashHistory() 是 Vue.js 基于 hash 模式创建路由的工厂函数。在使用这种模式下，路由信息保存在 URL 的 hash 中，
    //使用 createWebHashHistory() 方法，可以创建一个路由历史记录对象，用于管理应用程序的路由。在 Vue.js 应用中，
    //通常使用该方法来创建路由的历史记录对象。
    //就是路由中缓存历史记录的对象，vue-router提供
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            /* 
                component指定组件在默认的路由视图位置展示
                components:Home
                components指定组件在name为某个值的路由视图位置展示
                components:{
                    default:Home,// 默认路由视图位置
                    homeView:Home// name为homeView的路由视图位置
                }   
            */
            components:{
                default:Home,
                homeView:Home
            }      
        },
        {
            path:'/list',
            components:{
                listView : List
            } 
        },
        {
            path:'/add',
            components:{
                addView:Add
            } 
        },
        {
            path:'/update',
            components:{
                updateView:Update
            }  
        },
    ]

})
// 对外暴露路由对象
export default router;
```

> 5 main.js引入Router配置：

- 修改文件：main.js (入口文件)
```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//导入router模块
import router from './routers/router.js'
let app = createApp(App)
//绑定路由对象
app.use(router)
//挂载视图
app.mount("#app")
```
## Vue3数据交互Axios
### Promise
前端中的异步编程技术，类似Java中的多线程+线程结果回调！

- Promise 是异步编程的一种解决方案，比传统的解决方案回调函数和事件更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象；
- 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理；
> `Promise`对象有以下两个特点：

1.  Promise对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成，又称 Fulfilled）和`Rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变； 
2.  一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从`Pending`变为`Resolved`和从`Pending`变为`Rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果； 

js原生回调函数： 一些特殊的函数，表示未来才会执行的一些功能，后续代码不会等待该函数执行完毕就开始执行了。
```javascript
<script>
    // 设置一个2000毫秒后会执行一次的定时任务
    setTimeout(function (){
        console.log("setTimeout invoked")
    },2000)
    console.log("other code processon")
</script>
```
promise基本用法
```javascript
    <script>
       /*  
        1.实例化promise对象,并且执行(类似Java创建线程对象,并且start)
        参数: resolve,reject随意命名,但是一般这么叫!
        参数: resolve,reject分别处理成功和失败的两个函数! 成功resolve(结果)  失败reject(结果)
        参数: 在function中调用这里两个方法,那么promise会处于两个不同的状态
        状态: promise有三个状态
                pending   正在运行
                resolved  内部调用了resolve方法
                rejected  内部调用了reject方法
        参数: 在第二步回调函数中就可以获取对应的结果 
        */
        let promise =new Promise(function(resolve,reject){
            console.log("promise do some code ... ...")
            //resolve("promise success")
            reject("promise fail")
        })
        console.log('other code1111 invoked')
        //2.获取回调函数结果  then在这里会等待promise中的运行结果,但是不会阻塞代码继续运行
        promise.then(
            function(value){console.log(`promise中执行了resolve:${value}`)},
            function(error){console.log(`promise中执行了reject:${error}`)}
        )
        // 3 其他代码执行   
        console.log('other code2222 invoked')
    </script>
```
#### async和await的使用
async 用于标识函数的：

1. async标识函数后，async函数的返回值会变成一个Promise对象；
2. 如果函数内部返回的数据是一个非Promise对象，async函数的结果会返回一个成功状态 Promise对象；
3. 如果函数内部返回的是一个Promise对象，则async函数返回的状态与结果由该对象决定；
4. 如果函数内部抛出的是一个异常，则async函数返回的是一个失败的Promise对象；
5. async其实就是给我们提供了一个快捷声明回调函数的语法，有了它无需编写 new Promise(... ...) 这样的代码了；

await：

1. await右侧的表达式一般为一个Promise对象，但是也可以是一个其他值；
2. 如果表达式是Promise对象，await返回的是Promise成功的值；
3. 如果表达式是其他值，则直接返回该值；
4. await会等右边的Promise对象执行结束，然后再获取结果，所在方法的后续代码也会等待await的执行；
5. await必须在async函数中，但是async函数中可以没有await；
6. 如果await右边的Promise失败了，就会抛出异常，可以通过 try ... catch捕获处理；
7. await其实就是给我们提供了一个快捷获得Promise对象成功状态的语法，无需编写promise.then(... ...)这样的代码了；
### 介绍
> AJAX ：

-  AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）； 
-  AJAX 不是新的编程语言，而是一种使用现有标准的新方法； 
-  AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容； 
-  AJAX 不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行； 
-  XMLHttpRequest 只是实现 Ajax 的一种方式，本次我们使用Vue Axios方式实现； 
> 什么是axios  官网介绍:[https://axios-http.com/zh/docs/intro](https://axios-http.com/zh/docs/intro)

- Axios 是一个基于 Promise网络请求库，作用于[node.js](https://nodejs.org/) 和浏览器中。 它是 [_isomorphic_](https://www.lullabot.com/articles/what-is-an-isomorphic-application) 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块，而在客户端 (浏览端) 则使用 XMLHttpRequests。它有如下特性： 
   - 从浏览器创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
   - 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
   - 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
   - 拦截请求和响应
   - 转换请求和响应数据
   - 取消请求
   - 自动转换JSON数据
   - 客户端支持防御[XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

## Vue3状态管理Pinia
### Pinia介绍

> 如何实现多个组件之间的数据传递?

-  方式1 组件传参 ； 
-  方式2 路由传参 ； 
-  方式3 通过pinia状态管理定义共享数据； 

### Pinia基本用法

> 1 准备Vite项目：


```javascript
npm create vite
npm install 
npm install vue-router@4 --save
```

> 2 安装Pinia：


```javascript
npm install pinia
```

> 3 定义pinia store对象 src/store/store.js （推荐这么命名不是强制）：


```javascript
import {defineStore } from 'pinia'
//定义数据并且对外暴露
// store就是定义共享状态的包装对象
// 内部包含四个属性： id 唯一标识 state 完整类型推理，推荐使用箭头函数 存放的数据 getters 类似属性计算，存储放对数据
// 操作的方法  actions 存储数据的复杂业务逻辑方法
// 理解： store类似Java中的实体类， id就是类名， state 就是装数据值的属性  getters就是get方法，actions就是对数据操作的其他方法
export const definedPerson = defineStore(
    {
        id: 'personPinia', //必须唯一
        state:()=>{ // state中用于定义数据
            return {
                username:'张三',
                age:0,
                hobbies:['唱歌','跳舞']
            }
        },
        getters:{// 用于定义一些通过数据计算而得到结果的一些方法 一般在此处不做对数据的修改操作
                 // getters中的方法可以当做属性值方式使用
            getHobbiesCount(){
                return this.hobbies.length
            },
            getAge(){
                return this.age
            }
        },
        actions:{ // 用于定义一些对数据修改的方法
            doubleAge(){
                this.age=this.age*2
            }
        }
    }
)
```

> 4 在main.js配置Pinia组件到Vue中 ：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/router.js'
// 导pinia
import { createPinia } from 'pinia'
// 创建pinia对象
let pinia= createPinia()
let app =createApp(App)
app.use(router)
// app中使用pinia功能
app.use(pinia) 
app.mount('#app')
```
