require('./support/helpers')

describe("Home Page", function() {

  it ("Navigates to the home page", function() {
    visit("/");
    var result = "React Starter Template";
    expectToHaveContent(browser, result);
  })
})