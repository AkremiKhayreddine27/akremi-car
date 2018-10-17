import { SmartInputModule } from './smart-input.module';

describe('SmartInputModule', () => {
  let smartInputModule: SmartInputModule;

  beforeEach(() => {
    smartInputModule = new SmartInputModule();
  });

  it('should create an instance', () => {
    expect(smartInputModule).toBeTruthy();
  });
});
