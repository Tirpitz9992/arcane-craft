-module(blog_handler).
-export([handle_request/1]).

handle_request({add_post, Title, Content}) ->
    blog_server:add_post(Title, Content),
    {ok, "Post added"};
handle_request(get_posts) ->
    Posts = blog_server:get_posts(),
    {ok, Posts}.