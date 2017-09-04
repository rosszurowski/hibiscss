import generateStylesheet from './stylesheet';

describe('generateStylesheet', () => {
  const generateRule = () => [
    { selector: 'o-50p', properties: { opacity: '0.5' } },
  ];

  it('transforms rules into css strings', () => {
    const stylesheet = generateStylesheet(generateRule());

    expect(stylesheet).toEqual('.o-50p{opacity:0.5}');
  });

  describe('breakpoints', () => {
    it('does no grouping when breakpoints aren\'t provided', () => {
      const stylesheet = generateStylesheet(generateRule());

      expect(stylesheet).toEqual('.o-50p{opacity:0.5}');
    });

    it('duplicates responsive rules into breakpoints', () => {
      const stylesheet = generateStylesheet([{
        selector: 'o-50p',
        properties: { opacity: '0.5' },
        responsive: true,
      }], { s: '479px', m: '767px' });

      expect(stylesheet).toEqual(`
.o-50p{opacity:0.5}
@media only screen and (min-width: 479px) {.o-50p-s{opacity:0.5}}
@media only screen and (min-width: 767px) {.o-50p-m{opacity:0.5}}
`.trim());
    });
  });
});
