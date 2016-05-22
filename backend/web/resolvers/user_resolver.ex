defmodule AbsintheTest.UserResolver do
  alias RethinkDB.Query
  alias AbsintheTest.User
  alias Rethink.Helpers, as: RH

  def all(_args, info) do
    IO.inspect info
    result = Query.table("users")
    |> Database.run

    {:ok, RH.load_result(User, result)}
  end

  def find(%{id: id}, _info) do
    result = Query.table("users")
    |> Query.get(id) |> Database.run

    {:ok, RH.load_result(User, result)}
  end
end
