# 并发编程

# 基础概念

## ★进程和线程 
进程是资源分配的最小单位, 即一个程序的执行过程
线程是功能执行的最小单位：一个进程中可以多个线程，最少要有一个线程。

## ★并行和并发
并行：多项工作一起执行，之后再汇总
例子：泡方便面，电水壶烧水，一边撕调料倒入桶中。腿、脑
并发：同一时刻多个线程在访问同一个资源，多个线程对一个点
例子: 春运抢票 电商秒杀...

## ★同步和异步

- **同步**：调用某个任务时，会一直等待该任务完成，然后才继续执行后续的代码
- **异步**：调用某个任务时，不必等待任务完成就可以继续执行其他代码。

## ★wait/sleep
wait：**放开手去睡**，放开手里的锁
sleep：**握紧手去睡**，醒了手里还有锁
wait是Object的方法，sleep是thread的方法

| **对比项** | **所属类** | **是否释放锁** | **底层实现** |
| --- | --- | --- | --- |
| sleep() | Thread | 不释放锁 | C |
| wait() | Object | 释放锁 | C |

## ★如何创建线程

一般来说创建线程有五种方式 实际上有10种方式创建  

常用的三种 继承`Thread`类    实现`runnable`接口       实现`Callable`接口 

除此之外  实现线程池        使用`CompletableFuture`类等等



**但最终都是通过`new Thread().start()`创建**



1. **继承**`**Thread**`**类**：创建一个新类继承`Thread`类，并重写`run()`方法。然后创建该类的实例，调用`start()`方法启动线程。

```java
class MyThread extends Thread {
    public void run() {
        // 线程执行的代码
    }
}
```

1. **实现**`**Runnable**`**接口**：创建一个实现`Runnable`接口的类，并实现`run()`方法。然后创建`Thread`实例，将`Runnable`对象作为参数传递给`Thread`构造函数，调用`start()`方法启动线程。

```java
class MyRunnable implements Runnable {
    public void run() {
        // 线程执行的代码
    }
}
```

1. **使用**`**ExecutorService**`**和**`**Future**`：通过`ExecutorService`创建线程池，然后提交`Runnable`或`Callable`任务到线程池。`ExecutorService`管理线程的生命周期，并且可以控制线程的并发数。

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
executor.execute(new MyRunnable());
executor.shutdown();
```

1. **使用**`**ForkJoinPool**`：`ForkJoinPool`是一种特殊的线程池，用于执行`ForkJoinTask`任务。它适用于可以分解成更小任务的并行计算。

```java
ForkJoinPool forkJoinPool = new ForkJoinPool();
ForkJoinTask<Integer> task = new MyForkJoinTask();
forkJoinPool.execute(task);
```

这四种方式各有优势，适用于不同的场景。继承`Thread`类和实现`Runnable`接口是最基本的方式，适用于简单的并发任务。使用`ExecutorService`和`Future`提供了更高级的线程管理和任务控制功能，适用于复杂的并发应用。`ForkJoinPool`则专为并行计算设计，适用于可以分解成更小任务的大规模并行计算。

### Callable接口

**Thread**类、**Runnable**接口使得多线程编程简单直接。但Thread类和Runnable接口**都不允许声明检查型异常**，

也不能定义**返回值**。

**public void run()**方法规范意味着你必须捕获并处理检查型异常。即使你小心捕获异常，也不能保证这个类

（Runnable对象）的所有使用者都读取异常信息。以上两个问题现在都得到了解决。**从java5开始，提供了**

**Callable接口，是Runable接口的增强版。**



用Call()方法作为线程的执行体，增强了之前的run()方法。因为call方法可以有返回值，也可以声明抛出异常。

ex:

```java
/**
 * 1. 创建Callable的实现类，并重写call()方法，该方法为线程执行体，并且该方法有返回值
 */
class MyCallableThread implements Callable<Integer>{

    @Override
    public Integer call() throws Exception {
        System.out.println(Thread.currentThread().getName() + "执行了！");
        return 200;
    }
}

public class CallableDemo {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 2. 创建Callable的实例，并用FutureTask类来包装Callable对象
        // 3. 创建FutureTask对象，需要一个Callable类型的参数
        FutureTask task = new FutureTask<Integer>(new MyCallableThread());
        // 4. 创建多线程，由于FutureTask的本质是Runnable的实现类，所以第一个参数可以直接使用task
        new Thread(task, "threadName").start();
        //new Thread(task, "threadName2").start();
		
        /*while (!task.isDone()) {
            System.out.println("wait...");
        }*/
        System.out.println(task.get());
        System.out.println(Thread.currentThread().getName() + " over!");
    }
}
```

FutureTask：未来的任务，用它就干一件事，**异步调用。通常用它解决耗时任务，挂起堵塞问题。**

在主线程中需要执行比较耗时的操作时，但又不想阻塞主线程时，可以把这些作业交给Future对象在后台完成，

当主线程将来需要时，就可以通过Future对象获得后台作业的计算结果或者执行状态。

一般FutureTask多用于耗时的计算，主线程可以在完成自己的任务后，再去获取结果。

FutureTask仅在call方法完成时才能get结果；如果计算尚未完成，则阻塞 get 方法。

一旦计算完成，就不能再重新开始或取消计算。get方法获取结果只有在计算完成时获取，否则会一直阻塞直到任

务转入完成状态，然后会返回结果或者抛出异常。 



注意点：

1.get()是阻塞式等待，拿不到结果就一直等。get()方法一定要放在start()方法【开启多线程】之后。

2.每个FutureTask对象对应一个线程，有几个FutureTask对象对象就能创建几个线程。

3.通过FutureTask对象isDone()方法可以知道该线程是否已经执行结束。



### ★ callable接口与runnable接口的区别？

相同点：**都是接口，都可以编写多线程程序，都采用Thread.start()启动线程**

不同点：

1. 具体方法不同：一个是run，一个是call
2. Runnable没有**返回值**；Callable可以返回执行结果，是个泛型
3. Callable接口的call()方法允许抛出**异常**；Runnable的run()方法异常只能在内部消化，不能往上继续抛
4. 它提供了检查计算是否完成的方法，以等待计算的完成，并检索计算的结果。

## ★线程的生命周期

- NEW: 初始状态，线程被创建出来但没有被调用 `start()` 。
- RUNNABLE: 运行状态，线程被调用了 `start()`   等待运行的状态。 
- BLOCKED：阻塞状态，需要等待锁释放。
- WAITING：等待状态，表示该线程需要等待其他线程做出一些特定动作（通知或中断）。
- TIME_WAITING：超时等待状态，可以在指定的时间后自行返回而不是像 WAITING 那样一直等待。
- TERMINATED：终止状态，表示该线程已经运行完毕。

## ★死锁

多个程序同时阻塞 争夺同一资源 

**如何检测死锁**

使用`jmap`、`jstack`等命令查看 JVM 线程栈和堆内存的情况。如果有死锁，`jstack` 的输出中通常会有 `Found one Java-level deadlock:`的字样，后面会跟着死锁相关的线程信息。另外，实际项目中还可以搭配使用`top`、`df`、`free`等命令查看操作系统的基本情况，出现死锁可能会导致 CPU、内存等资源消耗过高。

采用 VisualVM、JConsole 等工具进行排查

**如何避免死锁**

破坏死锁的产生的必要条件即可：

1. **破坏请求与保持条件**：一次性申请所有的资源。
2. **破坏不剥夺条件**：占用部分资源的线程进一步申请其他资源时，如果申请不到，可以主动释放它占有的资源。
3. **破坏循环等待条件**：靠按序申请资源来预防。按某一顺序申请资源，释放资源则反序释放。破坏循环等待条件。

Lock.tryLock()方法

## ★乐观锁和悲观锁

### 悲观锁

悲观锁认为共享资源每次访问的都会出问题, 所以每次在线程获取资源操作的时候上锁  当一个线程拿到资源 其他线程阻塞,用完在把资源转给其他线程



`synchronized`和`ReentrantLock`等独占锁都是悲观锁

```java
public void performSynchronisedTask() {
    synchronized (this) {
        // 需要同步的操作
    }
}

private Lock lock = new ReentrantLock();
lock.lock();
try {
   // 需要同步的操作
} finally {
    lock.unlock();
}
```

高并发的场景下，激烈的锁竞争会造成线程阻塞，大量阻塞线程会导致系统的上下文切换，增加系统的性能开销。并且，**悲观锁还可能会存在死锁问题**，影响代码的正常运行.  多用于读多写少的情况下



### 乐观锁

悲观锁认为共享资源每次访问的都不会出问题, 无需加锁 线程可以不停访问 只有在提交和修改的时候去验证的资源是否被其他线程修改了(版本号机制,cas算法  来实现)



atomic类包下的原子变量类`AtomicInteger`、`LongAdder` 就是基于cas算法实现的乐观锁





高并发的场景下，乐观锁相比悲观锁来说，不存在锁竞争造成线程阻塞，也不会有死锁的问题，在性能上往往会更胜一筹。但是，如果冲突频繁发生（写占比非常多的情况），会频繁失败和重试（悲观锁的开销是固定的），这样同样会非常影响性能，导致 CPU 飙升。

####  版本号机制

#### CAS

先比较再交换
CAS操作有3个基本参数：内存地址A，旧值B，新值C。它的作用是将指定内存地址A的内容与所给的旧值B相比，如果相等，则将其内容替换为指令中提供的新值C；如果不等，则更新失败。类似于修改登陆密码的过程。当用户输入的原密码和数据库中存储的原密码相同，才可以将原密码更新为新密码，否则就不能更新。

**CAS是解决多线程并发安全问题的一种乐观锁算法。**因为它在对共享变量更新之前，会先比较当前值是否与更新前的值一致，如果一致则更新，如果不一致则循环执行（称为自旋锁），直到当前值与更新前的值一致为止，才执行更新。

```java
// 对象、对象的属性地址偏移量、预期值、修改值
public final native boolean compareAndSwapInt(Object var1, long var2, int var4, int var5);
```

Unsafe简单demo：

```java
public class UnsafeDemo {

    private int number = 0;

    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
        UnsafeDemo unsafeDemo = new UnsafeDemo();
        System.out.println(unsafeDemo.number);// 修改前
        unsafeDemo.compareAndSwap(0, 30);
        System.out.println(unsafeDemo.number);// 修改后
    }

    public void compareAndSwap(int oldValue, int newValue){
        try {
            // 通过反射获取Unsafe类中的theUnsafe对象
            Field theUnsafe = Unsafe.class.getDeclaredField("theUnsafe");
            theUnsafe.setAccessible(true); // 设置为可见
            Unsafe unsafe = (Unsafe) theUnsafe.get(null); // 获取Unsafe对象
            // 获取number的偏移量
            long offset = unsafe.objectFieldOffset(UnsafeDemo.class.getDeclaredField("number"));
            // cas操作
            unsafe.compareAndSwapInt(this, offset, oldValue, newValue);
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
```

##### 基本代码演示

这里以AtomicInteger这个类来演示：

```java
public class CasDemo {

    public static void main(String[] args) {
        AtomicInteger i = new AtomicInteger(1);
        System.out.println("第一次更新：" + i.compareAndSet(1, 200));
        System.out.println("第一次更新后i的值：" + i.get());
        System.out.println("第二次更新：" + i.compareAndSet(1, 300));
        System.out.println("第二次更新后i的值：" + i.get());
        System.out.println("第三次更新：" + i.compareAndSet(200, 300));
        System.out.println("第三次更新后i的值：" + i.get());
    }
}
```

输出结果如下：

```
第一次更新：true
第一次更新后i的值：200
第二次更新：false
第二次更新后i的值：200
第三次更新：true
第三次更新后i的值：300
```

结果分析：

```
第一次更新：i的值（1）和预期值（1）相同，所以执行了更新操作，把i的值更新为200
第二次更新：i的值（200）和预期值（1）不同，所以不再执行更新操作
第三次更新：i的值（200）和预期值（1）相同，所以执行了更新操作，把i的值更新为300
```

##### 验证原子性缺点

**开销大**：在并发量比较高的情况下，如果反复尝试更新某个变量，却又一直更新不成功，会给CPU带来较大的压力

**ABA问题**：当变量从A修改为B再修改回A时，变量值等于期望值A，但是无法判断是否修改，CAS操作在ABA修改后依然成功。版本号

**不能保证代码块的原子性**：CAS机制所保证的只是一个变量的原子性操作，而不能保证整个代码块的原子性。









# volatile

`volatile` 的作用 :

1. 保证数据的可见性    **但不能保证数据的原子性**
2. 防止jvm指令重排

**如何保证可见性?**

如果我们将变量声明为 `volatile` ，这就指示 JVM，这个变量是共享且不稳定的，每次使用它都到主存中进行读取。 

ex:

**如何防止jvm指令重排?**

在对这个变量进行读写操作的时候，会通过插入特定的 **内存屏障** 的方式来禁止指令重排序。

ex:

# synchronized

`synchronized` 是 Java 中的一个关键字，翻译成中文是同步的意思，主要解决的是多个线程之间访问资源的同步性，可以保证被它修饰的方法或者代码块在任意时刻只能有一个线程执行。

**使用范围:**

修饰实例方法  (锁当前对象实例)

修饰静态方法  (锁当前类)

修饰代码块  (锁指定对象/类)

**不要使用 `synchronized(String a)`** 因为 JVM 中，字符串常量池具有缓存功能

构造方法不能被`synchronized`修饰  可以在构造方法内部使用 synchronized 代码块



**sychronized 的底层原理**

​	synchronized 关键字底层原理属于 JVM 层面的东西。

ex:



**synchronized 和 volatile 有什么区别**

`synchronized` 关键字和 `volatile` 关键字是两个互补的存在，而不是对立的存在！

- `volatile` 关键字是线程同步的轻量级实现，所以 `volatile`性能肯定比`synchronized`关键字要好 。但是 `volatile` 关键字只能用于变量而 `synchronized` 关键字可以修饰方法以及代码块 。
- `volatile` 关键字能保证数据的可见性，但不能保证数据的原子性。`synchronized` 关键字两者都能保证。
- `volatile`关键字主要用于解决变量在多个线程之间的可见性，而 `synchronized` 关键字解决的是多个线程之间访问资源的同步性.





# ReentrantLock

ReentrantLock实现了Lock接口 比synchronized更加强大 , 灵活, 增加了轮询、超时、中断、公平锁和非公平锁等高级功能。



![img](./assets/reentrantlock-class-diagram.png)

**RenntrantLock的创建**

`private ReentrantLock lock = new ReentrantLock(); // 锁声明`



**可重入性**

可重入锁又名递归锁，是指在同一个线程在外层方法获取锁的时候，再进入该线程的内层方法会自动获取锁。Java中ReentrantLock和synchronized都是可重入锁，可重入锁的一个优点是**可一定程度避免死锁**。

```java
class A{
	public synchronized void aa{
		......
        bb();
        ......
	}
	public synchronized void bb{
		......
	}
}
A a = new A();
a.aa();
```

A类中有两个普通同步方法，都需要对象a的锁。如果是不可重入锁的话，aa方法首先获取到锁，aa方法在执行的过程中需要调用bb方法，此时锁被aa方法占有，bb方法无法获取到锁，这样就会导致bb方法无法执行，aa方法也无法执行，出现了死锁情况。可重入锁可避免这种死锁的发生。



**公平锁源码:**  默认是非公平锁

```java
private ReentrantLock lock = new ReentrantLock(true); // 公平锁设置

// 传入一个 boolean 值，true 时为公平锁，false 时为非公平锁
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
```



**限时等待**

传入时间参数，表示等待指定的时间，无参则表示立即返回锁申请的结果：true表示获取锁成功，false表示获取锁失败。我们可以将这种方法用来解决死锁问题。

```java
boolean tryLock(long time, TimeUnit unit) throws InterruptedException; // 限时等待  
```





**ReentrantLock和synchronized区别**

ReentrantLock：都是可重入锁、独占锁;  显式释放锁、可以响应中断。  可以实现公平锁
synchronized： 都是可重入锁、独占锁 ; 隐式释放锁、不可以响应中断。只能是非公平锁



# ReentrantReadWriteLock读写锁
针对**读多写少**的情况    读写锁允许同一时刻被多个读线程访问，**但是在写线程访问时，所有的读线程和其他的写线程都会被阻塞。**
读写锁的特点：

1. 写写不可并发
2. 读写不可并发
3. 读读可以并发

读写锁：读写锁中的读锁和写锁实际是一把锁的两个不同角色。

读锁：读共享

写锁: 独占锁



## 锁降级
什么是锁降级，锁降级就是从写锁降级成为读锁。在当前线程拥有写锁的情况下，再次获取到读锁，随后释放写锁的过程就是锁降级。这里可以举个例子：
```java
public void test(){
    rwlock.writeLock().lock();
    System.out.println("获取到写锁。。。。");
    rwlock.readLock().lock();
    System.out.println("获取到读锁----------");
    rwlock.writeLock().unlock();
    System.out.println("释放写锁==============");
    rwlock.readLock().unlock();
    System.out.println("释放读锁++++++++++++++++");
}
```
打印效果：
![image.png](./assets/1718787558504.png)

## 读写锁总结

1. 支持公平/非公平策略

![image.png](./assets/1718787576796.png)

2. 支持可重入
   - 同一读线程在获取了读锁后还可以获取读锁
   - 同一写线程在获取了写锁之后既可以再次获取写锁又可以获取读锁

3. 支持锁降级，不支持锁升级

4. 读写锁如果使用不当，很容易产生“饥饿”问题：

   在读线程非常多，写线程很少的情况下，很容易导致写线程“饥饿”，虽然使用“公平”策略可以一定程度上缓解这个问题，但是“公平”策略是以牺牲系统吞吐量为代价的。

5. Condition条件支持

   写锁可以通过newCondition()方法获取Condition对象。但是读锁是没法获取Condition对象，读锁调用newCondition() 方法会直接抛出UnsupportedOperationException。



# ThreadLocal

threadLocal是JDK自带的类  位于java.lang包下 主要作用就是**实现每个线程都有专属的的本地变量**



ThreadLocal原理

```java
// Thread源码
public class Thread implements Runnable {
    //......
    //与此线程有关的ThreadLocal值。由ThreadLocal类维护
    ThreadLocal.ThreadLocalMap threadLocals = null;

    //与此线程有关的InheritableThreadLocal值。由InheritableThreadLocal类维护
    ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
    //......
}
```

从上面Thread类 源代码可以看出Thread 类中有一个 threadLocals 和 一个 inheritableThreadLocals 变量，它们都是 ThreadLocalMap 类型的变量,默认情况下这两个变量都是 null，只有当前线程调用 ThreadLocal 类的 set或get方法时才创建它们，**实际上调用这两个方法的时候，我们调用的是ThreadLocalMap类对应的 get()、set()方法。**

`ThreadLocal`类的`set()`方法

```java
public void set(T value) {
    //获取当前请求的线程
    Thread t = Thread.currentThread();
    //取出 Thread 类内部的 threadLocals 变量(哈希表结构)
    ThreadLocalMap map = getMap(t);
    if (map != null)
        // 将需要存储的值放入到这个哈希表中
        map.set(this, value);
    else
        createMap(t, value);
}
ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
}
```

最终的变量是放在了当前线程的 `ThreadLocalMap` 中，并不是存在 `ThreadLocal` 上，`ThreadLocal` 可以理解为

只是`ThreadLocalMap`的封装，传递了变量值。 `ThrealLocal` 类中可以通过`Thread.currentThread()`获取到

当前线程对象后，直接通过`getMap(Thread t)`可以访问到该线程的`ThreadLocalMap`对象。



**每个`Thread`中都具备一个`ThreadLocalMap`，而`ThreadLocalMap`可以存储以`ThreadLocal`为 **

**key ，Object 对象为 value 的键值对。**



**ThreadLocal 内存泄露问题是怎么导致的？**

`ThreadLocalMap` 中使用的 key 为 `ThreadLocal` 的弱引用，而 value 是强引用。所以，如果 `ThreadLocal` 没

有被外部强引用的情况下，在垃圾回收的时候，key 会被清理掉，而 value 不会被清理掉。

这样一来，`ThreadLocalMap` 中就会出现 key 为 null 的 Entry。假如我们不做任何措施的话，value 永远无法被 

GC 回收，这个时候就可能会产生内存泄露。`ThreadLocalMap` 实现中已经考虑了这种情况，在调用 `set()`、

`get()`、`remove()` 方法的时候，会清理掉 key 为 null 的记录。使用完 `ThreadLocal`方法后最好手动调用

`remove()`方法



# CompletableFuture 

串行->并行



## Future

在 Java 中，`Future` 类是一个泛型接口，位于 `java.util.concurrent` 包下，其中定义了 5 个方法，主要包括下面这 5个功能：

```java
// V 代表了Future执行的任务返回值的类型
public interface Future<V> {
    // 取消任务执行
    // 成功取消返回 true，否则返回 false
    boolean cancel(boolean mayInterruptIfRunning);
    // 判断任务是否被取消
    boolean isCancelled();
    // 判断任务是否已经执行完成
    boolean isDone();
    // 获取任务执行结果
    V get() throws InterruptedException, ExecutionException;
    // 指定时间内没有返回计算结果就抛出 TimeOutException 异常
    V get(long timeout, TimeUnit unit)

        throws InterruptedException, ExecutionException, TimeoutExceptio

}
```

简单理解就是：我有一个任务，提交给了 `Future` 来处理。任务执行期间我自己可以去做任何想做的事情。并且，在这期间我还可以取消任务以及获取任务的执行状态。一段时间之后，我就可以 `Future` 那里直接取出任务执行结果。



缺点:

不支持异步任务的编排组合、获取计算结果的 `get()` 方法为阻塞调用  etc...

## CompletableFuture 

Java 8 才被引入`CompletableFuture` 类可以解决`Future` 的缺点。`CompletableFuture` 除了提供了更为好用和强大的 `Future` 特性之外，还提供了函数式编程、异步任务编排组合的能力。

```java
public class CompletableFuture<T> implements Future<T>, CompletionStage<T> {
}
```

![img](./assets/completablefuture-class-diagram.jpg)

`CompletionStage` 接口描述了一个异步计算的阶段。很多计算可以分成多个阶段或步骤，此时可以通过它将所有步骤组合起来，形成异步计算的流水线。

## CompletableFuture 操作

### create CompletableFuture

1. new 
2. 基于 `CompletableFuture` 自带的静态工厂方法：`runAsync()`、`supplyAsync()` 。

### 常用的使用方式

CompletableFutre的方法很多 下面介绍几个常用的方法

#### runAsync

当你需要异步操作且不关心返回结果的时候可以使用 `runAsync()` 方法。

```java
public static CompletableFuture<Void> runAsync(Runnable runnable) {
        return asyncRunStage(ASYNC_POOL, runnable);
}

public static CompletableFuture<Void> runAsync(Runnable runnable, Executor executor) {
        return asyncRunStage(screenExecutor(executor), runnable);
}
```

`runAsync()` 方法接受的参数是 `Runnable` ，这是一个函数式接口，不允许返回值。

```java
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```



#### supplyAsync

当你需要异步操作且关心返回结果的时候,可以使用 `supplyAsync()` 方法。

```java
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier) {
        return asyncSupplyStage(ASYNC_POOL, supplier);
}

public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier,Executor executor) {
        return asyncSupplyStage(screenExecutor(executor), supplier);
}
```

`supplyAsync()` 方法接受的参数是 `Supplier<U>` ，这也是一个函数式接口，`U` 是返回结果值的类型。

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}

```

#### thenAcceptAsync

`thenAcceptAsync`等待上一个任务执行完成之后，使用这个方法获取上一个任务的返回结果，之后调用下一个任务的操作

```java
public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action) {
        return uniAcceptStage(defaultExecutor(), action);
}

public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action,
                                                   Executor executor) {
        return uniAcceptStage(screenExecutor(executor), action);
}
```

#### handle()

通过 `handle()` 方法来处理任务执行过程中可能出现的抛出异常的情况。

```java
public <U> CompletableFuture<U> handle(
    BiFunction<? super T, Throwable, ? extends U> fn) {
    return uniHandleStage(null, fn);
}

public <U> CompletableFuture<U> handleAsync(
    BiFunction<? super T, Throwable, ? extends U> fn) {
    return uniHandleStage(defaultExecutor(), fn);
}

public <U> CompletableFuture<U> handleAsync(
    BiFunction<? super T, Throwable, ? extends U> fn, Executor executor) {
    return uniHandleStage(screenExecutor(executor), fn);
```

#### allOf()

运行多个 `CompletableFuture`

**`allOf()` 方法会等到所有的 `CompletableFuture` 都运行完成之后再返回**

调用 `join()` 可以让程序等`future1` 和 `future2` 都运行完了之后再继续执行。

```java
//x.组合以上七个异步任务
CompletableFuture.allOf(
        skuCompletableFuture,
        productComCompletableFuture,
        skuPriceCompletableFuture,
        productDetailsComCompletableFuture,
        skuSpecValueComCompletableFuture,
        skuStockVoComCompletableFuture
).join();
```

## 使用注意事项

### 使用自定义线性池

`CompletableFuture` 默认使用`ForkJoinPool.commonPool()` 作为执行器，这个线程池是全局共享的，可能会被其他任务占用，导致性能下降或者饥饿。因此，建议使用自定义的线程池来执行 `CompletableFuture` 的异步任务，可以提高并发度和灵活性。

### 尽量避免使用 get()

`CompletableFuture`的`get()`方法是阻塞的，尽量避免使用。如果必须要使用的话，需要添加超时时间，否则可能会导致主线程一直等待，无法执行其他任务。

## 合理组合多个异步任务

![asyncTool README 文档](./assets/asyncTool-readme.png)







# 线程间通信

```java
1.先定义资源类、属性和方法
2.在资源类中写方法的时候：
    2.1 判断(while判断类属性)
    2.2 干活
    2.3 唤醒
3.通过多线程操作资源类中的方法
```



# 并发容器类

vector

synchronizedList

hashtable



**Vector和Synchronized的缺点：**

​		vector：**内存消耗比较大**，底层基于数组,浪费内存空间，速度慢，适合一次增量比较大的情况

​		SynchronizedList：**迭代器涉及的代码没有加上线程同步代码,toString()方法上有锁**,底层基于LIst动态扩容

## CopyOnWrite容器
**CopyOnWrite容器**（简称COW容器）即**写时复制**的容器。通俗的理解是当我们往一个容器添加元素的时候，不直接往当前容器添加，而是先将当前容器进行Copy，复制出一个新的容器，然后新的容器里添加元素，添加完元素之后，再将原容器的引用指向新的容器。

**本质是数组**

```java
public class CopyOnWriteArrayList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable {
    private static final long serialVersionUID = 8673264195747942595L;

    /**
     * The lock protecting all mutators.  (We have a mild preference
     * for builtin monitors over ReentrantLock when either will do.)
     */
    final transient Object lock = new Object();

    /** The array, accessed only via getArray/setArray. */
    private transient volatile Object[] array;
    ...
}
```



**add方法是线程安全的**

```java
    /**
     * Appends the specified element to the end of this list.
     *
     * @param e element to be appended to this list
     * @return {@code true} (as specified by {@link Collection#add})
     */
    public boolean add(E e) {
        synchronized (lock) {
            Object[] es = getArray();
            int len = es.length;
            es = Arrays.copyOf(es, len + 1);
            es[len] = e;
            setArray(es);
            return true;
        }
    }
```





**CopyOnWrite并发容器用于读多写少的并发场景**。比如：白名单，黑名单。假如我们有一个搜索网站，用户在这个网站的搜索框中，输入关键字搜索内容，但是某些关键字不允许被搜索。这些不能被搜索的关键字会被放在一个黑名单当中，黑名单一定周期才会更新一次。

缺点：

1. **内存占用问题。**写的时候会创建新对象添加到新容器里，而旧容器的对象还在使用，所以有两份对象内存。通过压缩容器中的元素的方法来减少大对象的内存消耗，比如，如果元素全是10进制的数字，可以考虑把它压缩成36进制或64进制。或者不使用CopyOnWrite容器，而使用其他的并发容器，如ConcurrentHashMap。
2. **数据一致性问题。**CopyOnWrite容器只能保证数据的最终一致性，不能保证数据的实时一致性。所以如果你希望写入的的数据，马上能读到，请不要使用CopyOnWrite容器。



# AQS

AQS 的全称为 `AbstractQueuedSynchronizer` ，它是实现同步器的基础组件（框架）, 抽象队列同步器。在 `java.util.concurrent.locks` 包下面。juc下面Lock（ReentrantLock、ReentrantReadWriteLock等）的实现以及一些并发工具类（Semaphore、CountDownLatch、CyclicBarrier等）就是通过AQS来实现的。具体用法是通过继承AQS实现其模板方法，然后将子类作为同步组件的内部类。But StampLock不是基于AQS实现的。



**框架结构**

AQS框架结构如下：
AQS内部维护着一个FIFO双向队列，该队列就是`CLH同步队列`。

- **CLH队列**：全称是(Craig.Landin. and Haqersten)lock queue，`用来存储被阻塞的线程信息`。

![image.png](./assets/1719191482165.png)
AQS维护了一个volatile语义(支持多线程下的可见性)的共享资源变量**state**和一个FIFO（first-in-first-out）**线程等待队列**(多线程竞争state资源被阻塞时，会进入此队列)。

`state 属性表示资源的状态`
例如：

- 对于ReentrantLock来说，state=1，表示资源被占用；state=0，表示资源没有被占用。
- 对于CountDownLatch来说，state=0，表示计数器归零，所有线程都可以访问资源；status为N表示计数器未归零，所有线程都需要阻塞。

**基于AQS实现锁的思路**

AQS将大部分的同步逻辑均已经实现好，继承的自定义同步器只需要实现state的获取(acquire)和释放(release)的逻辑代码就可以，主要包括下面方法：

- acquire(int)：独占方式。尝试获取资源，成功则返回true，失败则返回false。
- release(int)：独占方式。尝试释放资源，成功则返回true，失败则返回false。
- 

- acquireShared(int)：共享方式。尝试获取资源。负数表示失败；0表示成功，但没有剩余可用资源；正数表示成功，且有剩余资源。
- releaseShared(int)：共享方式。尝试释放资源，如果释放后允许唤醒后续等待结点返回true，否则返回false。
- 

- isHeldExclusively()：该线程是否正在独占资源。只有用到condition才需要去实现它。

也就是说
		通过AQS可以实现独占锁（只有一个线程可以获取到锁，如：ReentrantLock），也可以实现共享锁（多个线程都可以获取到锁Semaphore/CountDownLatch等）





## CountDownLatch（倒计数器）
CountDownLatch是一个非常实用的多线程控制工具类. 

例如：在手机上安装一个应用程序，假如需要5个子进程检查服务授权，那么主进程会维护一个计数器，初始计数

就是5。用户每同意一个授权该计数器减1，当计数减为0时，主进程才启动，否则就只有阻塞等待了。

CountDownLatch中count down是倒数的意思，latch则是门闩的含义。整体含义可以理解为倒数的门栓，似乎有

一点“三二一，芝麻开门”的感觉。CountDownLatch的作用也是如此。

```java
new CountDownLatch(int count) //实例化一个倒计数器，count指定初始计数
countDown() // 每调用一次，计数减一
await() //等待，当计数减到0时，阻塞线程（可以是一个，也可以是多个）并行执行
```
```java
// 案例  6个同学陆续离开教室后值班同学才可以关门。

public class CountDownLatchDemo {

    /**
     * main方法也是一个进程，在这里是主进程，即上锁的同学
     *
     * @param args
     */
    public static void main(String[] args) throws InterruptedException {

        // 初始化计数器，初始计数为6
        CountDownLatch countDownLatch = new CountDownLatch(6);

        for (int i = 0; i < 6; i++) {
            new Thread(()->{
                try {
                    // 每个同学墨迹几秒钟
                    TimeUnit.SECONDS.sleep(new Random().nextInt(5));
                    System.out.println(Thread.currentThread().getName() + " 同学出门了");
                    // 调用countDown()计算减1
                    countDownLatch.countDown();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }, String.valueOf(i)).start();
        }

        // 调用计算器的await方法，等待6位同学都出来
        countDownLatch.await();

        System.out.println("值班同学锁门了");
    }
}
```
### ★CountDownLatch 与 join 方法的区别
调用一个子线程的 **join()方法**后，该线程会一直**被阻塞直到该线程运行完毕**。而 CountDownLatch 则使用计数器

允许子线程**运行完毕或者运行中**时候递减计数，也就是 CountDownLatch 可以在子线程运行任何时候让 await 方

法返回而不一定必须等到线程结束；另外使用线程池来管理线程时候一般都是直接添加 Runnable 到线程池这时候

就没有办法在调用线程的 join 方法了，countDownLatch 相比 Join 方法让我们对线程同步有更灵活的控制。

动手案例:秦灭六国，一统华夏。

## CyclicBarrier（循环栅栏）
该命令只在每个屏障点运行一次。若在所有参与线程之前更新共享状态，此屏障操作很有用

常用方法：

1. CyclicBarrier(int parties, Runnable barrierAction) 创建一个CyclicBarrier实例，parties指定参与相互等待的线程数，**barrierAction一个可选的Runnable命令，该命令只在每个屏障点运行一次，可以在执行后续业务之前共享状态。该操作由最后一个进入屏障点的线程执行。**
2. CyclicBarrier(int parties) 创建一个CyclicBarrier实例，parties指定参与相互等待的线程数。
3. await() 该方法被调用时表示当前线程已经到达屏障点，当前线程阻塞进入休眠状态，**直到所有线程都到达屏障点**，当前线程才会被唤醒。
```java
//组队打boss过关卡游戏。
public class CyclicBarrierDemo {

    public static void main(String[] args) {

        CyclicBarrier cyclicBarrier = new CyclicBarrier(3, () -> {

            System.out.println(Thread.currentThread().getName() + " 过关了");
        });

        for (int i = 0; i < 3; i++) {
            new Thread(()->{
                try {
                    System.out.println(Thread.currentThread().getName() + " 开始第一关");
                    TimeUnit.SECONDS.sleep(new Random().nextInt(4));
                    System.out.println(Thread.currentThread().getName() + " 开始打boss");
                    cyclicBarrier.await();

                    System.out.println(Thread.currentThread().getName() + " 开始第二关");
                    TimeUnit.SECONDS.sleep(new Random().nextInt(4));
                    System.out.println(Thread.currentThread().getName() + " 开始打boss");
                    cyclicBarrier.await();

                    System.out.println(Thread.currentThread().getName() + " 开始第三关");
                    TimeUnit.SECONDS.sleep(new Random().nextInt(4));
                    System.out.println(Thread.currentThread().getName() + " 开始打boss");
                    cyclicBarrier.await();

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }, String.valueOf(i)).start();
        }
    }
}
```

### ★CyclicBarrier和CountDownLatch的区别？
CountDownLatch的计数器只能使用一次，而CyclicBarrier的计数器可以使用reset()方法重置，可以使用多次，所以CyclicBarrier能够处理更为复杂的场景；CountDownLatch允许一个或多个线程**等待一组事件的产生**，而CyclicBarrier用于等待其他线程**运行到栅栏位置**。


## Semaphore（信号量）
非常适合需求量大，而资源又很紧张的情况。比如给定一个资源数目有限的资源池，假设资源数目为N，每一个线程均可获取一个资源，但是当资源分配完毕时，后来线程需要阻塞等待，直到前面已持有资源的线程释放资源之后才能继续。
信号量主要用于两个目的：

1. 多个共享资源的互斥使用。
2. 用于并发线程数的控制。保护一个关键部分不要一次输入超过N个线程。

sentinel限流

```java
//方法
public Semaphore(int permits) // 构造方法，permits指资源数目（信号量）
public void acquire() throws InterruptedException // 占用资源，当一个线程调用acquire操作时，它要么通过成功获取信号量（信号量减1），要么一直等下去，直到有线程释放信号量，或超时。
public void release() // （释放）实际上会将信号量的值加1，然后唤醒等待的线程。
```

```java
// 案例：6辆车抢占3个车位
public class SemaphoreDemo {

    public static void main(String[] args) {
        // 初始化信号量，3个车位
        Semaphore semaphore = new Semaphore(3);

        // 6个线程，模拟6辆车
        for (int i = 0; i < 6; i++) {
            new Thread(()->{
                try {
                    // 抢占一个停车位
                    semaphore.acquire();
                    System.out.println(Thread.currentThread().getName() + " 抢到了一个停车位！！");
                    // 停一会儿车
                    TimeUnit.SECONDS.sleep(new Random().nextInt(10));
                    System.out.println(Thread.currentThread().getName() + " 离开停车位！！");
                    // 开走，释放一个停车位
                    semaphore.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }, String.valueOf(i)).start();
        }
    }
}
```



# 阻塞队列（BlockingQueue）

所谓**阻塞**，在某些情况下会**挂起线程**（即阻塞），一旦条件满足，被挂起的线程又会自动被唤起

BlockingQueue即阻塞队列，是java.util.concurrent下的一个接口，因此不难理解，BlockingQueue是为了解决多线程中数据高效安全传输而提出的。从阻塞这个词可以看出，在某些情况下对阻塞队列的访问可能会造成阻塞。被阻塞的情况主要有如下两种：

1.  **当队列满了的时候进行入队列操作** 
2.  **当队列空了的时候进行出队列操作** 



**阻塞队列主要用在生产者/消费者的场景**，下面这幅图展示了一个线程生产、一个线程消费的场景：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719042245096-e7365f90-82c1-42aa-bf7f-293fdb47d595.png#averageHue=%23f6f4f3&clientId=u242436ec-7e83-4&from=paste&height=440&id=ude1d8e12&originHeight=440&originWidth=913&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32301&status=done&style=none&taskId=u3e46f73f-8eb5-40a2-8b0f-ecf7abb58f4&title=&width=913)

**为什么需要BlockingQueue**	好处是我们不需要关心什么时候需要阻塞线程，什么时候需要唤醒线程，因为这一切BlockingQueue都给你一手包办了。在concurrent包发布以前，在多线程环境下，我们都必须去自己控制这些细节，尤其还要兼顾效率和线程安全，而这会给我们的程序带来不小的复杂度。

## BlockingQueue
java.util.concurrent 包里的 BlockingQueue是一个接口，继承Queue接口，Queue接口继承 Collection。
![image.png](./assets/1719042290134.png)
BlockingQueue接口主要有以下7个实现类：

1. **ArrayBlockingQueue：由数组结构组成的有界阻塞队列。**
2. **LinkedBlockingQueue：由链表结构组成的有界（但大小默认值为integer.MAX_VALUE）阻塞队列。**
3. PriorityBlockingQueue：支持优先级排序的无界阻塞队列。
4. DelayQueue：使用优先级队列实现的延迟无界阻塞队列。
5. **SynchronousQueue：不存储元素的阻塞队列，也即单个元素的队列。**
6. LinkedTransferQueue：由链表组成的无界阻塞队列。
7. LinkedBlockingDeque：由链表组成的双向阻塞队列。

它的方法可以分成以下4类：

|  | 抛出异常 | 特殊值 | 阻塞 | 超时 |
| --- | --- | --- | --- | --- |
| **插入** | add(e) | offer(e) | put(e) | offer(e, time, unit) |
| **移除** | remove() | poll() | take() | poll(time, unit) |
| **检查** | element() | peek() | 不可用 | 不可用 |

**抛出异常**
add正常执行返回true，element（不删除）和remove返回阻塞队列中的第一个元素		

当阻塞队列满时，再往队列里add插入元素会抛IllegalStateException:Queue full

当阻塞队列空时，再往队列里remove移除元素会抛NoSuchElementException

当阻塞队列空时，再调用element检查元素会抛出NoSuchElementException

**特定值**		

插入方法，成功ture失败false

移除方法，成功返回出队列的元素，队列里没有就返回null		

检查方法，成功返回队列中的元素，没有返回null

**一直阻塞**

如果试图的操作无法立即执行，该方法调用将会发生阻塞，直到能够执行。

当阻塞队列满时，再往队列里put元素，队列会一直阻塞生产者线程直到put数据or响应中断退出	

当阻塞队列空时，再从队列里take元素，队列会一直阻塞消费者线程直到队列可用

**超时退出**

如果试图的操作无法立即执行，该方法调用将会发生阻塞，直到能够执行，但等待时间不会超过给定值。

返回一个特定值以告知该操作是否成功(典型的是 true / false)。



ex:

```java
public class BlockingQueueDemo {

    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(3);
        // 第一组方法：add remove element
//        System.out.println(queue.add("a"));
//        System.out.println(queue.add("b"));
//        System.out.println(queue.add("c"));
//        // System.out.println(queue.add("d"));
//        // System.out.println(queue.element());
//        System.out.println(queue.remove());
//        System.out.println(queue.remove());
//        System.out.println(queue.remove());
//        //System.out.println(queue.remove());
//        //System.out.println(queue.element());
        // 第二组：offer poll peek
//        System.out.println(queue.offer("a"));
//        System.out.println(queue.offer("b"));
//        System.out.println(queue.offer("c"));
//        System.out.println(queue.offer("d"));
//        System.out.println(queue.peek());
//        System.out.println(queue.poll());
//        System.out.println(queue.poll());
//        System.out.println(queue.poll());
//        System.out.println(queue.poll());
//        System.out.println(queue.peek());
        // 第三组：put take
//        queue.put("a");
//        queue.put("b");
//        queue.put("c");
//        System.out.println(queue.take());
//        queue.put("d");
//        System.out.println(queue.take());
//        System.out.println(queue.take());
//        System.out.println(queue.take());
        // 第四组：offer poll
        System.out.println(queue.offer("a"));
        System.out.println(queue.offer("b"));
        System.out.println(queue.offer("c"));
        System.out.println(queue.offer("d", 5, TimeUnit.SECONDS));
    }
}
```






# ThreadPool线程池

## 什么是线程池

线程池介绍管理一系列线程的池子, 当有任务要处理时 直接从线程池种获取线程来处理, 处理完后也不会立即销毁,而是等待另一个任务

## 为什么要用线程池？

线程池的优势：线程复用；控制最大并发数；管理线程。

1. 降低资源消耗。通过重复利用已创建的线程降低线程创建和销毁造成的销耗。
2. 提高响应速度。当任务到达时，任务可以不需要等待线程创建就能立即执行。
3. 提高线程的可管理性。线程是稀缺资源，如果无限制的创建，不仅会销耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。

![image.png](./assets/1719042499973.png)

## Executors工具类
```java
// 每种连接池的效果
public class ThreadPoolDemo {

    public static void main(String[] args) {
        // 创建单一线程的连接池
        // ExecutorService threadPool = Executors.newSingleThreadExecutor();
        // ExecutorService threadPool = Executors.newFixedThreadPool(3);
        ExecutorService threadPool = Executors.newCachedThreadPool();

        try {
            for (int i = 0; i < 5; i++) {
                threadPool.execute(()->{
                    System.out.println(Thread.currentThread().getName() + "执行了业务逻辑");
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            threadPool.shutdown();
        }
    }
}


@Bean
public ThreadPoolExecutor threadPoolExecutor(){
    // 当前系统可用处理器数量
    int processorsCount = Runtime.getRuntime().availableProcessors();
    ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(
            processorsCount * 2,  //线程池的核心线程数量
            processorsCount * 2,             //线程池的最大线程数
            0,                               //当线程数大于核心线程数时，多余的空闲线程存活的最长时间
            TimeUnit.SECONDS,                //时间单位
            new ArrayBlockingQueue<>(200),  //任务队列，用来储存等待执行任务的队列
            Executors.defaultThreadFactory(),      //默认的线程工厂，用来创建线程.
            // 自定义拒绝策略
            (runnable, executor) -> {           //拒绝策略，当提交的任务过多而不能及时处理时，我们可以定制策略来处理任务
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                executor.submit(runnable);
            }
    );
    // 线程池创建,核心线程同时创建
    threadPoolExecutor.prestartAllCoreThreads();
    return threadPoolExecutor;
}
```
## 底层原理
上述案例中的三个方法的本质都是ThreadPoolExecutor的实例化对象，只是具体参数值不同。
![image.png](./assets/1719042565558-27572840.png)

### 线程池的7个重要参数

1. corePoolSize：线程池中的常驻核心线程数
2. maximumPoolSize：线程池中能够容纳同时 执行的最大线程数，此值必须大于等于1
3. keepAliveTime：多余的空闲线程的存活时间 当前池中线程数量超过corePoolSize时，当空闲时间达到keepAliveTime时，多余线程会被销毁直到 只剩下corePoolSize个线程为止
4. Timeunit：keepAliveTime的单位
5. workQueue：任务队列，被提交但尚未被执行的任务
6. threadFactory：表示生成线程池中工作线程的线程工厂， 用于创建线程，**一般默认的即可**
7. handler：拒绝策略，表示当队列满了，并且工作线程大于 等于线程池的最大线程数（maximumPoolSize）时，如何来拒绝 请求执行的runnable的策略

### 线程池底层工作原理
![image.png](./assets/1719042591675.png)重要的事情说三遍：以下重要：以下重要：以下重要：

1.  在创建了线程池后，线程池中的**线程数为零**。 
2.  当调用execute()方法添加一个请求任务时，线程池会做出如下判断： 
   1. 如果正在运行的线程数量**小于corePoolSize**，那么马上**创建线程**运行这个任务；
   2. 如果正在运行的线程数量**大于或等于corePoolSize**，那么**将这个任务放入队列**；
   3. 如果这个时候队列满了且正在运行的线程数量还**小于maximumPoolSize**，那么还是要**创建非核心线程**立刻运行这个任务；
   4. 如果队列满了且正在运行的线程数量**大于或等于maximumPoolSize**，那么线程池会**启动饱和拒绝策略**来执行。
3.  当一个线程完成任务时，它会从队列中取下一个任务来执行。 
4.  当一个线程无事可做超过一定的时间（keepAliveTime）时，线程会判断：
如果当前运行的线程数大于corePoolSize，那么这个线程就被停掉。
所以线程池的所有任务完成后，**它最终会收缩到corePoolSize的大小**。 

![image.png](./assets/1719042610497.png)

### 拒绝策略
一般我们创建线程池时，为防止资源被耗尽，任务队列都会选择创建有界任务队列，但种模式下如果出现**任务队列已满且线程池创建的线程数达到你设置的最大线程数时**，这时就需要你指定ThreadPoolExecutor的RejectedExecutionHandler参数即合理的拒绝策略，来处理线程池"超载"的情况。

ThreadPoolExecutor自带的拒绝策略如下：

1. AbortPolicy(默认)：直接**抛出RejectedExecutionException异常**阻止系统正常运行
2. CallerRunsPolicy：“调用者运行”一种调节机制，该策略既不会抛弃任务，也不会抛出异常，而是**将某些任务回退到调用者**，从而降低新任务的流量。
3. DiscardOldestPolicy：**抛弃队列中等待最久的任务**，然后把当前任务加人队列中 尝试再次提交当前任务。
4. DiscardPolicy：**该策略默默地丢弃无法处理的任务**，不予任何处理也不抛出异常。 如果允许任务丢失，这是最好的一种策略。

**以上内置的策略均实现了RejectedExecutionHandler接口，也可以自己扩展RejectedExecutionHandler接口，定义自己的拒绝策略**

## 自定义线程池
不推荐
# 多线程高并发底层原理
![image.png](./assets/1719042652780.png)
cpu不能直接读取内存 通过L1 L2 L3 缓存读取ram

## java内存模型（JMM）
JMM规定了内存主要划分为**主内存**和**工作内存**两种。

> **主内存**：保存了所有的变量。
**共享变量**：如果一个变量被多个线程使用，那么这个变量会在每个线程的工作内存中保有一个副本，这种变量就是共享变量。
**工作内存**：每个线程都有自己的工作内存，线程独享，保存了线程用到的变量副本（主内存共享变量的一份拷贝）。工作内存负责与线程交互，也负责与主内存交互。


此处的主内存和工作内存跟JVM内存划分（堆、栈、方法区）是在不同的维度上进行的，如果非要对应起来，主内存对应的是Java堆中的对象实例部分，工作内存对应的是栈中的部分区域，从更底层的来说，**主内存对应的是硬件的物理内存，工作内存对应的是寄存器和高速缓存**。

JMM对共享内存的操作做出了如下两条规定：

> - 线程对共享内存的所有操作都必须在自己的工作内存中进行，不能直接从主内存中读写；
> - 不同线程无法直接访问其他线程工作内存中的变量，因此共享变量的值传递需要通过主内存完成。

![image.png](./assets/1719042707633.png)


内存模型的三大特性：

-  **原子性：即不可分割性。**比如 a=0；（a非long和double类型） 这个操作是不可分割的，那么我们说这个操作是原子操作。再比如：a++； 这个操作实际是a = a + 1；是可分割的，所以他不是一个原子操作。非原子操作都会存在线程安全问题，需要**使用同步技术（sychronized）或者锁（Lock）来让它变成一个原子操作**。一个操作是原子操作，那么我们称它具有原子性。java的concurrent包下提供了一些原子类，我们可以通过阅读API来了解这些原子类的用法。比如：**AtomicInteger、AtomicLong、AtomicReference**等。 
-  **可见性：每个线程都有自己的工作内存，所以当某个线程修改完某个变量之后，在其他的线程中，未必能观察到该变量已经被修改。在 Java 中 volatile、synchronized 和 final 实现可见性。**volatile只能让被他修饰内容具有可见性，但不能保证它具有原子性。 
-  **有序性：java的有序性跟线程相关。**一个线程内部所有操作都是有序的，如果是多个线程所有操作都是无序的。因为JMM的工作内存和主内存之间存在延迟，而且java会对一些指令进行重新排序。volatile和synchronized可以保证程序的有序性，很多程序员只理解这两个关键字的执行互斥，而没有很好的理解到volatile和synchronized也能保证指令不进行重排序。 



