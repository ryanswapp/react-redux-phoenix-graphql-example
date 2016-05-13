global.loginAsUser = function (email, pass) {
  logoutUser();
  find('.dropdown-toggle').click();
  browser.setValue('#login-email', email);
  browser.setValue('#login-password', pass);
  find('#login-buttons-password').click();
  sleep(1000);
};

// Capybara like helpers, see cheatsheet for original inspiration:
// https://upcase.com/test-driven-rails-resources/capybara.pdf

global.sleep = function(time) {
  browser.pause(time);
}

global.runJs = function(script) {
  browser.execute(script);
}

global.visit = function visit(path) {
  var ROOT_URL = 'http://localhost:3000';
  browser.url(ROOT_URL + path);
};

global.clickElement = function(selector) {
  browser.waitForExist(selector);
  browser.click(selector);
}

global.clickLink = function(linkText) {
  browser.click('a='+ linkText)
}

global.clickButton = function(buttonText) {
  browser.click('button='+ buttonText)
}

global.expectToHaveContent = function(page, text, opts) {
  if (arguments.length < 2) throw new Error("Not enough args")
  opts = opts || {};
  opts.within = opts.within || '';
  var selector = opts.within || 'body';
  browser.waitForText(selector)
  expect(browser.getText(selector)).to.match(new RegExp(text))
}

global.expectToNotHaveContent = function(page, text, opts) {
  opts = opts || {};
  opts.within = opts.within || '';
  var selector = opts.within + 'body';
  browser.waitForText(selector)
  var pageText = browser.getText(selector);
  var result = browser.getText(selector).match(new RegExp(text, "g"))
  if (result) {
    console.log("Actual\n\n", pageText);
    console.log("\n\nExpected text to NOT be present:\n", text);
    //console.log("**** \n Diff is backwards, green is NOT expected to be present but is **** \n")
    // return a diff so it's easier to read
    expect(pageText).to.not.equal(text);
  }
  return expect(result).to.not.be.ok;
}

global.fillIn = function(opts, text) {
  if (typeof opts === 'string') { // query input by label text
    var labelText = opts;
    var inputName = browser.getAttribute('label='+ labelText, 'for');
    browser.setValue('[name='+ inputName +']', text);
  } else if (opts.name) {
    browser.setValue('[name="'+ opts.name +'"]', text);
  } else if (opts.el) {
    browser.setValue(opts.el, text);
  } else {
    throw new Error('Invalid Options. Use name, or label key')
  }
}