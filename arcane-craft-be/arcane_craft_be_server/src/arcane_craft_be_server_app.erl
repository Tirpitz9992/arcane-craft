-module(arcane_craft_be_server_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    {ok, Port} = application:get_env(arcane_craft_be_server, port),
    {ok, ListenSocket} = gen_tcp:listen(Port, [binary, {packet, 0}, {active, false}, {reuseaddr, true}]),
    io:format("Server started on port ~p~n", [Port]),
    Pid = spawn(fun() -> accept(ListenSocket) end),
    {ok, Pid}.

stop(_State) ->
    ok.

accept(ListenSocket) ->
    {ok, Socket} = gen_tcp:accept(ListenSocket),
    spawn(fun() -> handle(Socket) end),
    accept(ListenSocket).

handle(Socket) ->
    gen_tcp:send(Socket, "Hello, World!\n"),
    gen_tcp:close(Socket).