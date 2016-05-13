defmodule AbsintheTest.Post do
  use AbsintheTest.Web, :model

  schema "posts" do
    field :title, :string
    field :body, :string
    belongs_to :user, AbsintheTest.User

    timestamps
  end

  @required_fields ~w(title body user_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
