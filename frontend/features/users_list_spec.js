require('./support/helpers')

describe("Users Page", function() {

  it ("Navigates to the users list page", function() {
    visit("/users");
    var result = "Users List";
    expectToHaveContent(browser, result);
  })
})