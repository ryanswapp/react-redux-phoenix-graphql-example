defmodule Database.Helpers do
  use Timex

  import Database, only: [run: 1]
  alias RethinkDB.Query


  def get(table, id) when is_bitstring(id) do
    Query.table(table)
    |> Query.get(id)
    |> run
    |> catch_errors
    |> handle_get_response
  end

  def get(table, index, value) do
    Query.table(table)
    |> Query.get_all(value, %{index: index})
    |> run
    |> catch_errors
    |> handle_get_response
  end

  def get_one(table, params) when is_map(params) do
    Query.table(table)
    |> Query.filter(params)
    |> run
    |> catch_errors
    |> handle_get_response
  end

  def get_many(table, values) do
    Query.table(table)
    |> Query.get_all(values)
    |> run
    |> catch_errors
    |> handle_get_many_response
  end

  def get_many(table, index, value) do
    Query.table(table)
    |> Query.get_all(value, %{index: index})
    |> run
    |> catch_errors
    |> handle_get_many_response
  end

  def get_many(table, params) when is_map(params)do
    Query.table(table)
    |> Query.filter(params)
    |> run
    |> catch_errors
    |> handle_get_many_response
  end

  def insert(table, docs) when is_list(docs) do
    docs = add_timestamps(docs)

    Query.table(table)
    |> Query.insert(docs)
    |> run
    |> catch_errors
    |> handle_insert_response
  end

  def insert(table, doc) when is_map(doc) do
    doc = doc
    |> Map.delete(:__meta__)
    |> Map.put(:created_at, Time.now(:milliseconds))
    |> Map.put(:updated_at, Time.now(:milliseconds))

    Query.table(table)
    |> Query.insert(doc)
    |> run
    |> catch_errors
    |> handle_insert_response
  end

  def insert!(table, docs) do
    case insert(table, docs) do
      {:ok, result} -> result
      {:error, error} -> raise error
    end
  end

  def add_timestamps(docs) do
    Enum.map(docs, fn(doc) ->
      doc
      |> Map.delete(:__meta__)
      |> Map.put(:created_at, Time.now(:milliseconds))
      |> Map.put(:updated_at, Time.now(:milliseconds))
    end)
  end

  def update(table, id, changes) do
    data = changes
    |> Map.put(:updated_at, Time.now(:milliseconds))
    |> Map.delete(:id)

    response = Query.table(table)
    |> Query.get(id)
    |> Query.update(data)
    |> run
    |> catch_errors
    |> handle_update_response

    case response do
      {:ok, _} -> {:ok, changes}
      {:error, error} -> {:error, error}
    end
  end

  def update!(table, id, changes) do
    case update(table, id, changes) do
      {:ok, changes} -> changes
      {:error, error} -> error
    end
  end

  def delete(table, id) do
    Query.table(table)
    |> Query.get(id)
    |> Query.delete
    |> run
    |> catch_errors
    |> handle_delete_response
  end

  def delete(table, index, value) do
    Query.table(table)
    |> Query.get_all([value], %{index: index})
    |> Query.delete
    |> run
    |> catch_errors
    |> handle_delete_response
  end

  def delete!(table, id) do
    case delete(table, id) do
      {:ok, number} -> number
      {:error, error} -> raise error
    end
  end

  def catch_errors(%RethinkDB.Exception.ConnectionClosed{}) do
    raise "Cannot connect to RethinkDB"
  end

  def catch_errors(%{data: data}) do
    case data do
      %{"first_error" => error} ->
        {:error, error}
      %{"r" => errors} ->
        # This should always be a DB error, so it is exceptonal (returns 500)
        raise List.first errors
      %{"replaced" => 0, "skipped" => 1} ->
        {:error, "Not Found"}
      %{"deleted" => 0, "skipped" => 1} ->
        {:error, "Not Found"}
      nil ->
        {:error, "Not found"}
      _ ->
        data
    end
  end

  def handle_get_response({:error, error}), do: {:error, error}
  def handle_get_response([]), do: {:error, "Not found"}
  def handle_get_response([item]), do: {:ok, item}
  def handle_get_response(data) when is_list(data), do: {:ok, List.first(data)}
  def handle_get_response(data) when is_map(data), do: {:ok, data}

  def handle_get_many_response({:error, error}), do: {:error, error}
  def handle_get_many_response(data) when is_list(data), do: {:ok, data}

  def handle_insert_response({:error, error}), do: {:error, error}
  def handle_insert_response(%{
    "errors" => 0,
    "inserted" => number,
    "generated_keys" => keys
  }) when number >= 1 do
    case number do
      1 -> {:ok, List.first keys}
      number -> {:ok, number}
    end
  end
  def handle_insert_response(%{
    "errors" => 0,
    "inserted" => number
  }) when number >= 1 do
    {:ok, number}
  end

  def handle_update_response({:error, error}), do: {:error, error}
  def handle_update_response(%{"replaced" => number, "skipped" => 0}), do: {:ok, number}

  def handle_delete_response({:error, error}), do: {:error, error}
  def handle_delete_response(%{"deleted" => number, "skipped" => 0}), do: {:ok, number}
end
