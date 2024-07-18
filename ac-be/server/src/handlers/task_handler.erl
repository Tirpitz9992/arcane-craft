-module(task_handler).
-export([init/2, handle_json/2, terminate/3, content_types_provided/2]).


init(Req, _State) ->
    io:format("Request received~n"),
    {cowboy_rest, Req, #{}}.

content_types_provided(Req, State) ->
    {[{<<"application/json">>, handle_json}], 
      Req, State}.

handle_json(Req, _State) -> 
    Qs = cowboy_req:parse_qs(Req),
    Date = case lists:keyfind(<<"date">>, 1, Qs) of
        false -> 
            <<"default-date">>;
        {_, Value} -> 
            Value
    end,
    Tasks = get_tasks_for_date(Date),
    Json = jsx:encode(Tasks),
    Hearers = #{<<"content-type">> => <<"application/json">>,
                <<"Access-Control-Allow-Origin">> => <<"*">>,
                <<"Access-Control-Allow-Methods">> => <<"GET, POST, OPTIONS">>,
                <<"Access-Control-Allow-Headers">> => <<"content-type">>},
    {ok, Req2} = cowboy_req:reply(200, Hearers, Json, Req),
    {stop, Req2, _State}.

terminate(_Reason, _Req, _State) ->
    ok.

get_tasks_for_date(Date) ->
[
    #{title => <<"Learn Erlang">>,
    date => Date,
    time => <<"10:00 AM">>,
    remind => true,
    tag => <<"Programming">>}
].