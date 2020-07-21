import React, { useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import RulesSection from './components/RulesSection/RulesSection';
import InputSection from './components/InputSection/InputSection';

import Parser from './utils/Parser';
import ExpressionCalculator from './utils/ExpressionCalculator';
import { Input } from './components/InputSection/InputSection';

const defaultBaseRules = `A && B && !C => H = M
A && B && C => H = P
!A && B && C => H = T
H = M => K = D + (D * E / 10)
H = P => K = D + (D * (E - F) / 25.5)
H = T => K = D - (D * F / 30)`;

const defaultCustom1Rules = `H = P => K = 2 * D + (D * E / 100)`;

const defaultCustom2Rules = `A && B && !C => H = T
A && !B && C => H = M
H = M => K = F + D + (D * E / 100)`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      display: 'flex',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    column: {
      flex: '1 1 50%',
    },
    formLabel: {
      textAlign: 'center',
    },
    formGroup: {
      margin: theme.spacing(3),
    },
  })
);

function App() {
  const [baseRules, setBaseRules] = useState(defaultBaseRules);
  const [custom1Rules, setCustom1Rules] = useState(defaultCustom1Rules);
  const [custom2Rules, setCustom2Rules] = useState(defaultCustom2Rules);
  const [inputs, setInputs] = useState<Input[]>([
    {
      name: 'A',
      value: true,
    },
    {
      name: 'B',
      value: true,
    },
    {
      name: 'C',
      value: true,
    },
    {
      name: 'D',
      value: 0,
    },
    {
      name: 'E',
      value: 0,
    },
    {
      name: 'F',
      value: 0,
    },
  ]);
  const classes = useStyles();

  const handleOnInputChange = (
    newValue: boolean | number,
    inputName: string
  ) => {
    const inputIndex = inputs.findIndex((input) => input.name === inputName);
    if (inputIndex === -1) {
      return;
    }
    const updatedInputs = [...inputs];
    updatedInputs[inputIndex] = {
      ...updatedInputs[inputIndex],
      value: newValue,
    };
    setInputs(updatedInputs);
  };

  let parsedExpressions = {};
  let calculated: string | number = 0;
  try {
    parsedExpressions = Parser.parse(`
    ${baseRules}
    ${custom1Rules}
    ${custom2Rules}
    `);

    const variables: { [key: string]: boolean | number } = {};
    inputs.forEach((input) => {
      variables[input.name] = input.value;
    });
    calculated = ExpressionCalculator.calculate(parsedExpressions, variables);
  } catch (e) {
    calculated = 'error';
  }

  return (
    <Container>
      <header>
        <h1>Vlad Sovetov TA - Expressions Manipulator</h1>
      </header>
      <main>
        <Paper className={classes.section}>
          <RulesSection
            baseRules={baseRules}
            custom1Rules={custom1Rules}
            custom2Rules={custom2Rules}
            onBaseRulesChanged={(event) =>
              setBaseRules((event.target as HTMLInputElement).value)
            }
            onCustom1RulesChanged={(event) =>
              setCustom1Rules((event.target as HTMLInputElement).value)
            }
            onCustom2RulesChanged={(event) =>
              setCustom2Rules((event.target as HTMLInputElement).value)
            }
            parsedRules={JSON.stringify(parsedExpressions, null, '  ')}
          />
        </Paper>
        <Paper className={classes.section}>
          <InputSection
            inputs={inputs}
            onInputChange={handleOnInputChange}
            calculated={calculated}
          />
        </Paper>
      </main>
    </Container>
  );
}

export default App;
