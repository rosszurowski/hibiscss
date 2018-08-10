import kit from './default';

describe('default', () => {
  it('generates classes correctly', () => {
    const rules = kit();
    expect(rules).toMatchSnapshot();
  });

  it('generates border classes correctly', () => {
    const rules = kit({ borderWidths: { none: '0', thin: '1px', thick: '2px' } });
    expect(rules).toMatchSnapshot();
  });

  it('generates verbose classes correctly', () => {
    const rules = kit({ verboseClasses: true });
    expect(rules).toMatchSnapshot();
  });
});
