defmodule Rethink.Helpers do
  alias RethinkDB.Collection
  alias RethinkDB.Query
  alias RethinkDB.Record

  def model_table(model) do
    struct(model).__meta__.source |> elem(1)
  end

  def load_result(model, %Record{data: data}) do
    load_model(model, data)
  end

  def load_result(model, %Collection{data: data}) do
    Enum.map data, fn (el) ->
      load_model(model, el)
    end
  end

  def load_model(model, data) do
    Ecto.Schema.__load__(model, nil, nil, [], data, &load/2)
  end

  def load(_, data) do
    {:ok, data}
  end
end
