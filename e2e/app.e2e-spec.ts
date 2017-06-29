import { RecetasPage } from './app.po';

describe('recetas App', () => {
  let page: RecetasPage;

  beforeEach(() => {
    page = new RecetasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
