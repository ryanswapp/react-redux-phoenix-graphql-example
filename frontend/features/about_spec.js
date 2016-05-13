require('./support/helpers')

describe("About Page", function() {

  it ("Navigates to the about page", function() {
    visit("/about");
    var result = "What's the deal honey buns?";
    expectToHaveContent(browser, result);
  })
})