import { NcgAppPageObject } from './app.po';
import {} from 'jasmine';

describe('WebQuotes App', () => {
  let page: NcgAppPageObject;

  beforeEach(() => {
    page = new NcgAppPageObject();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
