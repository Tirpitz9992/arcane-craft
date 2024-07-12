-module(arcane_craft_be_server_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    db_manager:start(normal, []),
    {ok, self()}.

stop(_State) ->
    db_manager:stop([]),
    ok.
