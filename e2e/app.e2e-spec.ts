import { TripperPage } from './app.po';

describe('tripper App', () => {
  let page: TripperPage;

  beforeEach(() => {
    page = new TripperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
