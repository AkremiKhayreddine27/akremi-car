import { SmartSelectModule } from './smart-select.module';

describe('SmartSelectModule', () => {
  let smartSelectModule: SmartSelectModule;

  beforeEach(() => {
    smartSelectModule = new SmartSelectModule();
  });

  it('should create an instance', () => {
    expect(smartSelectModule).toBeTruthy();
  });
});
