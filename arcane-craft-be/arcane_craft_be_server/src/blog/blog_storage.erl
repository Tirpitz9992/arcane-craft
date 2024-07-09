-module(blog_storage).
-export([save_post/2, load_posts/0]).

save_post(Title, Content) ->
    Title,Content,
    ok.

load_posts() ->
    [].