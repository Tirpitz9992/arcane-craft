-module(blog_storage).
-export([save_post/2, load_posts/0]).
-export([store_image/2, get_image/1]).


-record(image, {id, data}).

store_image(Id, Data) ->
    Fun = fun() ->
        mnesia:write(#image{id = Id, data = Data})
    end,
    {atomic, ok} = mnesia:transaction(Fun).

get_image(Id) ->
    Fun = fun() ->
        case mnesia:read({image, Id}) of
            [Image] -> {ok, Image#image.data};
            [] -> {error, not_found}
        end
    end,
    mnesia:transaction(Fun).


save_post(Title, Content) ->
    Title,Content,
    ok.

load_posts() ->
    [].