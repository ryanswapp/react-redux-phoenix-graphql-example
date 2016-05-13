defmodule AbsintheTest.Schema do
  use Absinthe.Schema
  import_types AbsintheTest.Schema.Types

  query do
    @desc "Get all blog posts"
    field :posts, list_of(:post) do
      resolve &AbsintheTest.PostResolver.all/2
    end

    @desc "Get all users"
    field :users, list_of(:user) do
      resolve &AbsintheTest.UserResolver.all/2
    end

    @desc "Get a user of the blog"
    field :user, type: :user do
      arg :id, non_null(:id)
      resolve &AbsintheTest.UserResolver.find/2
    end
  end

  mutation do
    @desc "Create a post"
    field :post, type: :post do
      arg :title, non_null(:string)
      arg :body, non_null(:string)
      arg :user_id, non_null(:integer)

      resolve &AbsintheTest.PostResolver.create/2
    end
  end
end
