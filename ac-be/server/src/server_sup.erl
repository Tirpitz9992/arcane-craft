-module(server_sup).
-behaviour(supervisor).

%% Supervisor callbacks
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    ChildSpecs = [
        {http_listener, 
            {cowboy, start_clear, 
                [http_listener, 
                    [{port, 8080}], 
                    #{env => #{dispatch => cowboy_router:compile([{'_', [{"/tasks", task_handler, []}]}])}
                    }
                ]}, 
            permanent, 
            5000, 
            worker, 
            [cowboy]},
        {db_manager,
            {db_manager, start_link, []},
            permanent,
            5000,
            worker,
            [db_manager]}
    ],
    {ok, { {one_for_one, 5, 10}, ChildSpecs }}.