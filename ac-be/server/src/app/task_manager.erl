-module(task_manager).
-export([init/0, create_task/1, get_tasks_for_date/1]).

-record(task, {id, title, date, time, remind, tag}).

init() ->
    case mnesia:table_info(task, attributes) of
        undefined ->
            mnesia:create_table(task, [{attributes, record_info(fields, task)}]);
        _ ->
            ok
    end.

create_task(Task) ->
    init(), 
    Fun = fun() ->
        mnesia:write(#task{title = Task#task.title, date = Task#task.date, time = Task#task.time, remind = Task#task.remind, tag = Task#task.tag})
    end,
    mnesia:transaction(Fun).

get_tasks_for_date(Date) ->
    init(), 
    Fun = fun() ->
        mnesia:match_object(#task{date = Date, _ = '_'})
    end,
    {atomic, Tasks} = mnesia:transaction(Fun),
    Tasks.