import ExpressionCalculator from './ExpressionCalculator';

describe('expression calculation', () => {
  describe('logical expression', () => {
    test('calculate a single expression', () => {
      const expression = {
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
      };
      const inputs = {
        A: true,
        B: true,
        C: true,
      };
      expect(
        ExpressionCalculator.calculateLogicalExpression(expression, inputs)
      ).toBe('');
    });

    test('calculate a single expression', () => {
      const expression = {
        A: {
          '&&': {
            B: {
              '&&': {
                '!C': {
                  '=>': 'H = T',
                },
                C: {
                  '=>': 'H = M',
                },
              },
            },
          },
        },
      };
      const inputs = {
        A: true,
        B: true,
        C: true,
      };
      expect(
        ExpressionCalculator.calculateLogicalExpression(expression, inputs)
      ).toBe('H = M');
    });

    test('calculate a single expression', () => {
      const expression = {
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
      };
      const inputs = {
        A: true,
        B: true,
        C: true,
      };
      expect(
        ExpressionCalculator.calculateLogicalExpression(expression, inputs)
      ).toBe('H = P');
    });
  });

  describe('math expression', () => {
    test('calculate a math expression with M', () => {
      const expression = {
        H: {
          '=': {
            M: {
              '=>': 'K = F + D / 2',
            },
            P: {
              '=>': 'K = 2 * D + (D * E / 100)',
            },
            T: {
              '=>': 'K = D - (D * F / 30)',
            },
          },
        },
      };
      const inputs = {
        D: 1,
        E: 1,
        F: 1,
      };
      expect(
        ExpressionCalculator.calculateMathExpression(expression, 'M', inputs)
      ).toBe(1);
    });

    test('calculate a math expression with P', () => {
      const expression = {
        H: {
          '=': {
            M: {
              '=>': 'K = F + D / 2',
            },
            P: {
              '=>': 'K = 2 * D + (D * E)',
            },
            T: {
              '=>': 'K = D - (D * F / 30)',
            },
          },
        },
      };
      const inputs = {
        D: 1,
        E: 1,
        F: 1,
      };
      expect(
        ExpressionCalculator.calculateMathExpression(expression, 'P', inputs)
      ).toBe(3);
    });

    test.only('calculate a math expression with P', () => {
      const expression = {
        H: {
          '=': {
            M: {
              '=>': 'K = F + D / 2',
            },
            P: {
              '=>': 'K = 2 * D + (D * E)',
            },
            T: {
              '=>': 'K = D - (D * F / 2)',
            },
          },
        },
      };
      const inputs = {
        D: 1,
        E: 2,
        F: 3,
      };
      expect(
        ExpressionCalculator.calculateMathExpression(expression, 'T', inputs)
      ).toBe(-0.5);
    });
  });
});
