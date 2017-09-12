import generateRule from './rule';

describe('generateRule', () => {
  it('generates css-safe property names', () => {
    const rules = generateRule('ml', 'margin-left', {
      '5%': '5%',
      '1.0': '1.0',
    });

    expect(rules[0].selector).toEqual('ml-5p');
    expect(rules[1].selector).toEqual('ml-1d0');
  });

  it('accepts numeric values', () => {
    const rules = generateRule('o', 'opacity', {
      '0p': 0.0,
      '25p': 0.25,
      '50p': 0.5,
      '75p': 0.75,
      '100p': 1.0,
    });

    expect(rules.length).toEqual(5);
    expect(rules[0]).toEqual({ selector: 'o-0p',  properties: { 'opacity': '0' } });
    expect(rules[1]).toEqual({ selector: 'o-25p', properties: { 'opacity': '0.25' } });
  });

  it('accepts an array of values (zero-based)', () => {
    const scale = [0, 4, 8, 16, 32, 64];
    const rules = generateRule('pl', 'padding-left', scale, { unit: 'px' });

    expect(rules.length).toEqual(scale.length);
    expect(rules[0]).toEqual({ selector: 'pl-0', properties: { 'padding-left': '0' } });
    expect(rules[1]).toEqual({ selector: 'pl-1', properties: { 'padding-left': '4px' } });
    expect(rules[2]).toEqual({ selector: 'pl-2', properties: { 'padding-left': '8px' } });
  });

  it('accepts an array of values (one-based)', () => {
    const scale = [0, 4, 8, 16, 32, 64];
    const rules = generateRule('pl', 'padding-left', scale, { unit: 'px', startIndexAtOne: true });

    expect(rules.length).toEqual(scale.length);
    expect(rules[0]).toEqual({ selector: 'pl-1', properties: { 'padding-left': '0' } });
    expect(rules[1]).toEqual({ selector: 'pl-2', properties: { 'padding-left': '4px' } });
    expect(rules[2]).toEqual({ selector: 'pl-3', properties: { 'padding-left': '8px' } });
  });


  it('accepts multiple properties', () => {
    const rules = generateRule('mh', ['margin-left', 'margin-right'], { auto: 'auto' });

    expect(rules.length).toEqual(1);
    expect(rules[0]).toEqual({
      selector: 'mh-auto',
      properties: { 'margin-left': 'auto', 'margin-right': 'auto' },
    });
  });
});
