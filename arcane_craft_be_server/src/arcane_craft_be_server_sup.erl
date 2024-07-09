-module(arcane_craft_be_server_sup).
-behaviour(supervisor).

%% Supervisor callbacks
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    ChildSpecs = [
        {blog_server, {blog_server, start_link, []}, permanent, 5000, worker, [blog_server]}
    ],
    {ok, { {one_for_one, 5, 10}, ChildSpecs }}.