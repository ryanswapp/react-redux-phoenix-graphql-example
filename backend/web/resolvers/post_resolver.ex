defmodule AbsintheTest.PostResolver do
  alias AbsintheTest.Post
  alias Rethink.Helpers, as: RH
  alias RethinkDB.Query

  def all(_args, info) do
    case info.source do
      %AbsintheTest.User{id: id} ->
        result = Query.table("posts")
        |> Query.filter(%{user_id: id})
        |> Database.run
        {:ok, RH.load_result(Post, result)}
      nil ->
        result = Query.table("posts") |> Database.run
        {:ok, RH.load_result(Post, result)}
    end
  end

  def create(args, _info) do
    %Post{}
    |> Post.changeset(args)
    |> RH.insert
  end
end
