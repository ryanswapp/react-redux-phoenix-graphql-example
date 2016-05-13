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
alias AbsintheTest.Repo
alias AbsintheTest.Post
alias AbsintheTest.User

user_one_params = %{name: "Ryan Swapp", email: "ryancswapp@gmail.com"}
user_two_params = %{name: "Maddie Swapp", email: "maddielee11@hotmail.com"}

user_changeset_one = User.changeset(%User{}, user_one_params)
user_changeset_two = User.changeset(%User{}, user_two_params)

user_one = Repo.insert!(user_changeset_one)
user_two = Repo.insert!(user_changeset_two)

users = [user_one.id, user_two.id]

for _ <- 1..10 do
  [head|tail] = Enum.take_random(users, 1)
  post_params = %{title: Faker.Lorem.sentence, body: Faker.Lorem.paragraph, user_id: head}
  changeset = Post.changeset(%Post{}, post_params)
  Repo.insert!(changeset)
end
