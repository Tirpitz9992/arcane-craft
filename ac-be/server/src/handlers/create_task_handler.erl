-module(create_task_handler).
-behaviour(cowboy_handler).

-record(task, {title, date, time, remind, tag}).
-export([init/2]).

init(Req, State) ->
    {ok, Body, Req2} = cowboy_req:read_body(Req),
    case jsx:decode(Body) of
        {struct, Json} ->
            Title = maps:get(<<"title">>, Json),
            Date = maps:get(<<"date">>, Json),
            Time = maps:get(<<"time">>, Json),
            Remind = maps:get(<<"remind">>, Json),
            Tag = maps:get(<<"tag">>, Json),
            ok = mnesia:transaction(fun() ->
                mnesia:write(#task{title = Title, date = Date, time = Time, remind = Remind, tag = Tag})
            end),
            {ok, Req3} = cowboy_req:reply(201, #{<<"content-type">> => <<"application/json">>}, <<"{\"status\":\"created\"}">>, Req2),
            {ok, Req3, State};
        _ ->
            {ok, Req3} = cowboy_req:reply(400, #{<<"content-type">> => <<"application/json">>}, <<"{\"status\":\"bad_request\"}">>, Req2),
            {ok, Req3, State}
    end.