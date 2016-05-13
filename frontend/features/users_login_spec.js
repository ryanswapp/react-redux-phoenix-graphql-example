require('./support/helpers')

describe("Login Page", function() {

  it ("Navigates to the login page @watch", function() {
    visit("/login");
    var result = "Login";
    expectToHaveContent(browser, result);
  })
})