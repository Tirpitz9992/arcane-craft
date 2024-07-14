-module(blog_server).
-behaviour(gen_server).

%% API
-export([start_link/0, add_post/2, get_posts/0]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

-record(state, {posts = []}).

%% API functions
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

add_post(Title, Content) ->
    gen_server:cast(?MODULE, {add_post, Title, Content}).

get_posts() ->
    gen_server:call(?MODULE, get_posts).

%% gen_server callbacks
init([]) ->
    {ok, #state{}}.

handle_call(get_posts, _From, State) ->
    {reply, State#state.posts, State}.

handle_cast({add_post, Title, Content}, State) ->
    NewPost = {Title, Content},
    {noreply, State#state{posts = [NewPost | State#state.posts]}}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.