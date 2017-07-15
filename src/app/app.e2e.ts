import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have <home>', async () => {
    let subject = await element(by.css('app home')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

});
