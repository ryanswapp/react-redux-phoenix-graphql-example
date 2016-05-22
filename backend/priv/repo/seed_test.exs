import RethinkDB.Lambda
alias AbsintheTest.User
alias RethinkDB.Query
alias Rethink.Helpers, as: RH

result = Query.table("users")
|> Query.map(fn (user) ->
   posts = Query.table("posts") |> Query.filter(%{id: user.id})
   user |> Query.merge(%{posts: posts})
   end)
|> Database.run

# loaded_data = RH.load_result(User, result)

IO.inspect result
# IO.inspect loaded_data
