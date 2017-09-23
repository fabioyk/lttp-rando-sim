import { GameDataModule } from './game-data.module';

describe('GameDataModule', () => {
  let gameDataModule: GameDataModule;

  beforeEach(() => {
    gameDataModule = new GameDataModule();
  });

  it('should create an instance', () => {
    expect(gameDataModule).toBeTruthy();
  });
});
