-module(server_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    {ok, Port} = application:get_env(server, port),
    Dispatch = cowboy_router:compile([
        {'_', [
            {"/tasks", task_handler, []},
            {"/create_task", create_task_handler, []}
        ]}
    ]),
    {ok, _} = cowboy:start_clear(http_listener,
                                 [{port, Port}],
                                 #{env => #{dispatch => Dispatch}}),
    io:format("Server started on port ~p~n", [Port]),
    db_manager:start(),
    {ok, self()}.

stop(_State) ->
    ok = cowboy:stop_listener(http_listener),
    ok.