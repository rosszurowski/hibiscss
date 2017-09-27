import kit from './tachyons';

describe('tachyons', () => {
  it('generates classes correctly', () => {
    const rules = kit();
    expect(rules).toMatchSnapshot();
  });
});
