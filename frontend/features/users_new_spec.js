require('./support/helpers')

describe("Signup Page", function() {

  it ("Navigates to the signup page", function() {
    visit("/signup");
    var result = "New User";
    expectToHaveContent(browser, result);
  })
})