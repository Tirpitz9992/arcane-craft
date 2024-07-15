-module(http).
-behaviour(cowboy_handler).

-export([init/2]).

init(Req, _State) ->
    {ok, Req} = cowboy_req:reply(200,
                                    #{<<"centent-type">> => <<"text/plain">>},
                                    <<"Hello World!">>,
                                    Req),
    {ok, Req, _State}.

