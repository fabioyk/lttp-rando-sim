import { MainMenuModule } from './main-menu.module';

describe('MainMenuModule', () => {
  let mainMenuModule: MainMenuModule;

  beforeEach(() => {
    mainMenuModule = new MainMenuModule();
  });

  it('should create an instance', () => {
    expect(mainMenuModule).toBeTruthy();
  });
});
