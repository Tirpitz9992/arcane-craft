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


在HTTP协议中，头信息（Headers）有多种类型，每种类型都传递不同的元数据。头信息通常以键值对的形式出现，键是一个字符串，值可以是字符串、数字或其他格式。以下是一些常见的HTTP头信息类型及其用途：

### 常见的HTTP头信息类型

#### 通用头信息（General Headers）
这些头信息可以出现在请求和响应中，提供关于消息的通用信息。

- `Date`: 指示消息发送的日期和时间。
  ```erlang
  #{<<"date">> => <<"Tue, 15 Nov 1994 08:12:31 GMT">>}
  ```

- `Connection`: 控制连接的选项。
  ```erlang
  #{<<"connection">> => <<"keep-alive">>}
  ```

#### 请求头信息（Request Headers）
这些头信息包含有关客户端请求的信息。

- `Host`: 指定请求的目标主机和端口。
  ```erlang
  #{<<"host">> => <<"www.example.com">>}
  ```

- `User-Agent`: 发送请求的客户端软件的信息。
  ```erlang
  #{<<"user-agent">> => <<"Mozilla/5.0 (Windows NT 10.0; Win64; x64)">>}
  ```

- `Accept`: 指定客户端可以处理的内容类型。
  ```erlang
  #{<<"accept">> => <<"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8">>}
  ```

#### 响应头信息（Response Headers）
这些头信息包含关于服务器响应的信息。

- `Server`: 服务器软件的信息。
  ```erlang
  #{<<"server">> => <<"Apache/2.4.1 (Unix)">>}
  ```

- `Content-Type`: 指定响应主体的媒体类型。
  ```erlang
  #{<<"content-type">> => <<"text/html; charset=UTF-8">>}
  ```

- `Content-Length`: 指定响应主体的长度（以字节为单位）。
  ```erlang
  #{<<"content-length">> => <<"348">>}
  ```

#### 实体头信息（Entity Headers）
这些头信息提供关于实体主体的信息。

- `Content-Encoding`: 指定实体主体的编码方式。
  ```erlang
  #{<<"content-encoding">> => <<"gzip">>}
  ```

- `Content-Language`: 指定实体主体的自然语言。
  ```erlang
  #{<<"content-language">> => <<"en">>}
  ```

- `Last-Modified`: 指定实体主体最后修改的日期和时间。
  ```erlang
  #{<<"last-modified">> => <<"Tue, 15 Nov 1994 12:45:26 GMT">>}
  ```

### 自定义头信息（Custom Headers）
除了标准的HTTP头信息，客户端和服务器还可以定义自定义头信息，以传递特定的应用程序数据。

- `X-Custom-Header`: 自定义头信息。
  ```erlang
  #{<<"x-custom-header">> => <<"CustomValue">>}
  ```

### 使用示例

在Cowboy中，你可以使用映射类型来设置这些头信息。例如：

```erlang
cowboy_req:reply(200,
                 #{<<"content-type">> => <<"text/plain">>,
                   <<"content-length">> => <<"13">>},
                 <<"Hello, World!">>,
                 Req).
```

### 自信分分析

我对这个答案的自信分是10/10。HTTP头信息是HTTP协议的基本组成部分，以上解释涵盖了常见的头信息类型及其用途，并且符合HTTP协议的标准用法。

希望这对你有帮助！如果有任何问题，随时提问。

### 解读头信息的主体

#### 服务器端

在服务器端，HTTP服务器（如Cowboy、Nginx、Apache等）会解析收到的HTTP请求头信息。服务器根据这些头信息来决定如何处理请求。例如：

- `Host` 头信息用于确定请求的目标主机。
- `Content-Type` 头信息用于确定请求主体的媒体类型。
- `User-Agent` 头信息用于识别客户端软件。

Cowboy作为你的HTTP服务器，会解析收到的HTTP请求头信息，并将其封装在请求对象（如 `Req`）中，供你的Erlang代码使用。

#### 客户端

在客户端，浏览器或其他HTTP客户端会解析收到的HTTP响应头信息。客户端根据这些头信息来决定如何处理响应。例如：

- `Content-Type` 头信息用于确定响应主体的媒体类型。
- `Content-Length` 头信息用于确定响应主体的长度。
- `Set-Cookie` 头信息用于设置客户端的Cookie。

### 前端服务器的角色

如果你有一个前端服务器（如Nginx或一个Node.js服务器），它可能会充当反向代理，转发请求到后端服务器（如Cowboy）。前端服务器也会解析和处理HTTP头信息。例如：

- 前端服务器可能会根据 `Host` 头信息将请求路由到不同的后端服务器。
- 前端服务器可能会添加或修改头信息，例如添加 `X-Forwarded-For` 头信息以传递客户端的真实IP地址。

### 前端服务器收到的内容

前端服务器会收到完整的HTTP请求，包括请求行、请求头信息和请求主体。以下是一个示例HTTP请求：

```
GET / HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
```

前端服务器会解析这些头信息，并根据它们来决定如何处理请求。

### 前端客户端收到的内容

前端客户端（如浏览器）会收到完整的HTTP响应，包括状态行、响应头信息和响应主体。以下是一个示例HTTP响应：

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 348
Server: Apache/2.4.1 (Unix)

<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

客户端会解析这些头信息，并根据它们来决定如何处理响应。例如，浏览器会根据 `Content-Type` 头信息来决定如何渲染响应主体。

### 示例：前端服务器和客户端的交互

假设你有一个前端服务器（如Nginx）和一个后端服务器（如Cowboy）。以下是一个简单的请求-响应流程：

1. **客户端请求**：浏览器发送HTTP请求到前端服务器。
   ```
   GET / HTTP/1.1
   Host: www.example.com
   User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
   ```

2. **前端服务器处理**：前端服务器（Nginx）解析请求头信息，并将请求转发到后端服务器（Cowboy）。
   ```
   GET / HTTP/1.1
   Host: www.example.com
   X-Forwarded-For: 192.168.1.1
   ```

3. **后端服务器响应**：后端服务器（Cowboy）处理请求，并发送HTTP响应到前端服务器。
   ```
   HTTP/1.1 200 OK
   Content-Type: text/html; charset=UTF-8
   Content-Length: 348
   Server: Cowboy

   <html>
   <head>
       <title>Example</title>
   </head>
   <body>
       <h1>Hello, World!</h1>
   </body>
   </html>
   ```

4. **前端服务器转发**：前端服务器（Nginx）将响应转发到客户端（浏览器）。
   ```
   HTTP/1.1 200 OK
   Content-Type: text/html; charset=UTF-8
   Content-Length: 348
   Server: Nginx

   <html>
   <head>
       <title>Example</title>
   </head>
   <body>
       <h1>Hello, World!</h1>
   </body>
   </html>
   ```


回调函数是指在特定事件或条件下被调用的函数。在 Cowboy Rest 中，回调函数用于处理 HTTP 请求的不同阶段。`content_types_provided/2` 是一个回调函数，用于指定服务器可以提供的内容类型。

### 为什么需要回调函数？

Cowboy Rest 框架通过回调函数来管理 HTTP 请求的生命周期。具体来说，`content_types_provided/2` 回调函数告诉 Cowboy Rest 服务器它可以为请求提供哪些内容类型。在你的例子中，服务器需要告诉客户端它可以返回 JSON 格式的数据。

### 是否需要修改 `server_app.erl`？

不需要修改 `server_app.erl`。你的 `server_app.erl` 文件已经正确设置了 Cowboy 路由和启动逻辑。问题仅在于 `task_handler.erl` 中缺少必要的回调函数。

### 回调函数的作用

`content_types_provided/2` 回调函数的作用是告诉 Cowboy Rest 服务器它可以处理哪些内容类型，并且指定相应的处理函数。在你的例子中，我们指定了 `application/json` 类型，并且将处理函数设为 `handle/2`。

### 示例代码解释

#### `task_handler.erl`

```erlang
-module(task_handler).
-export([init/2, content_types_provided/2, handle/2, terminate/3]).

init(Req, _State) ->
    {cowboy_rest, Req, _State}.

content_types_provided(Req, State) ->
    {[{"application/json", handle}], Req, State}.

handle(Req, _State) -> 
    Task = #{title => <<"Learn Erlang">>,
             date => <<"2023-10-01">>,
             time => <<"10:00 AM">>,
             remind => true,
             tag => <<"Programming">>},
    Json = jsx:encode(Task),
    {ok, Req2} = cowboy_req:reply(200,
                                    #{<<"content-type">> => <<"application/json">>},
                                    Json,
                                    Req),
    {stop, Req2, _State}.

terminate(_Reason, _Req, _State) ->
    ok.
```
