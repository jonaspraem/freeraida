import { FreeraidaPage } from './app.po';

describe('freeraida App', () => {
  let page: FreeraidaPage;

  beforeEach(() => {
    page = new FreeraidaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
