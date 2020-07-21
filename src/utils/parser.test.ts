import Parser from './parser';

describe('expression parser', () => {
  describe('logical expression', () => {
    test('parse a single expression', () => {
      const expression = 'A && B && !C => H = M';
      expect(Parser.parse(expression)).toStrictEqual({
        A: {
          '&&': {
            B: {
              '&&': {
                '!C': {
                  '=>': 'H = M',
                },
              },
            },
          },
        },
      });
    });

    test('parse multiple expressions', () => {
      const expressions = `A && B && !C => H = M
                           A && B && C => H = P
                           !A && B && C => H = T`;
      expect(Parser.parse(expressions)).toStrictEqual({
        A: {
          '&&': {
            B: {
              '&&': {
                '!C': {
                  '=>': 'H = M',
                },
                C: {
                  '=>': 'H = P',
                },
              },
            },
          },
        },
        '!A': {
          '&&': {
            B: {
              '&&': {
                C: {
                  '=>': 'H = T',
                },
              },
            },
          },
        },
      });
    });

    test('extend base rules', () => {
      const expressions = `A && B && !C => H = M

                           A && B && !C => H = T`;
      expect(Parser.parse(expressions)).toStrictEqual({
        A: {
          '&&': {
            B: {
              '&&': {
                '!C': {
                  '=>': 'H = T',
                },
              },
            },
          },
        },
      });
    });
  });

  test('parse mathematical single expression', () => {
    const expressions = 'H = M => K = D + (D * E / 10)';
    expect(Parser.parse(expressions)).toStrictEqual({
      H: {
        '=': {
          M: {
            '=>': 'K = D + (D * E / 10)',
          },
        },
      },
    });
  });

  describe('mathematical expression', () => {
    test('parse a single expression', () => {
      const expressions = 'H = M => K = D + (D * E / 10)';
      expect(Parser.parse(expressions)).toStrictEqual({
        H: {
          '=': {
            M: {
              '=>': 'K = D + (D * E / 10)',
            },
          },
        },
      });
    });

    test('parse multiple expressions', () => {
      const expressions = `H = M => K = D + (D * E / 10)
                           H = P => K = D + (D * (E - F) / 25.5)`;
      expect(Parser.parse(expressions)).toStrictEqual({
        H: {
          '=': {
            M: {
              '=>': 'K = D + (D * E / 10)',
            },
            P: {
              '=>': 'K = D + (D * (E - F) / 25.5)',
            },
          },
        },
      });
    });

    test('extend base rules', () => {
      const expressions = `H = M => K = D + (D * E / 10)

                           H = M => K = F + D + (D * E / 100)`;
      expect(Parser.parse(expressions)).toStrictEqual({
        H: {
          '=': {
            M: {
              '=>': 'K = F + D + (D * E / 100)',
            },
          },
        },
      });
    });
  });
});
