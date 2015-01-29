describe('MSG-3', function() {
  it('should login and take a walk in the forms', function() {
    browser.get('http://localhost:8080/msg3/');

    element(by.model('log.login')).sendKeys(params.login.user);
    element(by.model('log.password')).sendKeys(params.login.password);
    element(by.css('.emb-btn-primary')).getWebElement().click();
    
    browser.waitForAngular();
    
    element(by.css('.labelMSG3')).getWebElement().click();
    

    element(by.css('#selectMSI')).getWebElement().click();
    element(by.css('#divMSI')).getWebElement().click();
    element(by.css('#btnGoToAnalysis')).getWebElement().click();

    browser.waitForAngular();

    element(by.css('#form2')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form3')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form4')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form5')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form6')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form5')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form4')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form3')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form2')).getWebElement().click();browser.waitForAngular();
    element(by.css('#form1')).getWebElement().click();browser.waitForAngular();

    expect(true);
  });
});