ExUnit.start

Mix.Task.run "ecto.create", ~w(-r AbsintheTest.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r AbsintheTest.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(AbsintheTest.Repo)

