defmodule AbsintheTest.UserResolver do
  import Ecto.Query
  alias AbsintheTest.Repo
  alias AbsintheTest.User

  def all(_args, _info) do
    users = User
    |> preload(:posts)
    |> Repo.all
    {:ok, users}
  end

  def find(%{id: id}, _info) do
    query = from u in User,
        where: u.id == ^id,
        preload: :posts
    case Repo.one(query) do
      nil -> {:error, "User id #{id} not found"}
      user -> {:ok, user}
    end
  end
end
