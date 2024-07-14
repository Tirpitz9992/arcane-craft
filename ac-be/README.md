# erlang learning

## mnesia:create_schema
ram_copies: 数据存储在内存中（ETS）。
disc_only_copies: 数据存储在磁盘上（DETS）。
disc_copies: 数据同时存储在内存和磁盘上。


```
mnesia:create_table(image, [{attributes, record_info(fields, image)}, {disc_copies, [node()]}]).
```

mnesia:create_schema([node()]) 函数用于在指定的节点上创建一个 Mnesia 模式（schema）。这个模式定义了数据库的结构和存储位置。具体来说：

    内存模式（RAM Schema）: 当你第一次启动 Mnesia 时，它会在内存中创建一个模式，这对于 ram_copies 类型的表是有效的。这种模式下的数据存储在内存中 [3]。
    磁盘模式（Disk Schema）: 如果你在启动 Mnesia 之前手动创建模式，或者在停止 Mnesia 后创建模式，你可以创建存储在磁盘上的表。这种模式下的数据存储在磁盘上，适用于 disc_copies 和 disc_only_copies 类型的表 [3][4][5]。

默认情况下，mnesia:create_schema([node()]) 会在当前工作目录中创建模式文件。如果你想改变存储位置，可以设置 Mnesia 的 dir 变量。例如：
erlang

application:set_env(mnesia, dir, "path/to/store/db").

然后在启动节点时指定这个路径：
shell

erl -name SomeName -mnesia dir "path/to/store/db"

这样可以确保模式文件存储在你指定的目录中 [4]。

## record
define a class  
-record(Name, {Field1, Field2, ...})

## application 行为
application 行为是一种标准化的方式，用于定义和管理应用程序的生命周期。一个应用程序通常包括多个模块和进程，这些模块和进程需要被有序地启动和停止。通过实现 application 行为，你可以确保你的应用程序在启动和停止时按照预期的顺序执行必要的操作。

当你在模块中写了 -behaviour(application)，你需要实现以下两个回调函数：

    start/2: 这个函数在应用程序启动时被调用。它接收两个参数：启动类型和启动参数。通常在这个函数中，你会初始化所有需要的资源和进程。
    stop/1: 这个函数在应用程序停止时被调用。它接收一个参数：应用程序的当前状态。通常在这个函数中，你会清理和释放所有资源。


