-module(db_manager).
-behaviour(application).

-export([start/2, stop/1, create_schema/0, create_table/0]).

-record(task, {title, date, time, remind, tag}).


start(_StartType, _StartArgs) ->
    create_schema(),
    create_table(),
    {ok, self()}.

stop(_State) ->
    ok.

create_schema() ->
    mnesia:create_schema([node()]).

create_table() ->
    mnesia:start(),
    mnesia:create_table(task, [
        {attributes, record_info(fields, task)},
        {disc_copies, [node()]}
    ]),
    mnesia:stop().