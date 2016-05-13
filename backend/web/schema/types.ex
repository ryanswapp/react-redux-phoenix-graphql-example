defmodule AbsintheTest.Schema.Types do
  use Absinthe.Schema.Notation

  @desc "A user of the blog"
  object :user do
    field :id, :id
    field :name, :string
    field :email, :string
    field :posts, list_of(:post)
    field :inserted_at, :string
    field :updated_at, :string
  end

  @desc "A blog post"
  object :post do
    field :id, :id
    field :title, :string
    field :body, :string
    field :user_id, :user
    field :inserted_at, :string
    field :updated_at, :string
  end
end
