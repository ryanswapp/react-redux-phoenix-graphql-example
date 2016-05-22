# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     AbsintheTest.Repo.insert!(%AbsintheTest.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
# alias AbsintheTest.Repo
alias RethinkDB.Query
alias Database, as: DB
alias Database.Helpers, as: Helper

Query.table_drop("users") |> DB.run
Query.table_drop("posts") |> DB.run

Query.table_create("users") |> DB.run
Query.table_create("posts") |> DB.run

user_one_params = %{name: "Ryan Swapp", email: "ryancswapp@gmail.com"}
user_two_params = %{name: "Maddie Swapp", email: "maddielee11@hotmail.com"}

Helper.insert("users", [user_one_params, user_two_params])

res = Query.table("users") |> DB.run
users = res.data |> Enum.map(fn u -> Map.get(u, "id") end)

for _ <- 1..10 do
  post_params = %{title: Faker.Lorem.sentence, body: Faker.Lorem.paragraph, user_id: Enum.random(users)}
  Helper.insert("posts", post_params)
end
