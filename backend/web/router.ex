defmodule AbsintheTest.Router do
  use AbsintheTest.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AbsintheTest do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  forward "/graph", Absinthe.Plug,
  schema: AbsintheTest.Schema

  forward "/graphiql", Absinthe.Plug.GraphiQL,
    schema: AbsintheTest.Schema
  # Other scopes may use custom stacks.
  # scope "/api", AbsintheTest do
  #   pipe_through :api
  # end
end
