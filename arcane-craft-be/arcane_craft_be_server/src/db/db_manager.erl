-module(db_manager).
-behaviour(application).

-export([start/2, stop/1]).

% define image
-record(image, {id, data}).


start(_StartType, _StartArgs) ->
    mnesia:create_schema([node()]),
    mnesia:start(),
    mnesia:create_table(image, [{attributes, record_info(fields, image)}]),
    {ok, self()}.

stop(_State) ->
    mnesia:stop().

