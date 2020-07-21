import { parse } from 'mathjs';

import { BranchTail } from './Parser';

type Inputs = {
  [key: string]: boolean | number;
};

type ExpArguments = boolean | number | string;

const ExpressionCalculator = (() => {
  const calculate = (expressionsStructure: BranchTail, inputs: Inputs) => {
    let result = 0;
    const logicalResult = calculateLogicalExpression(
      expressionsStructure,
      inputs
    );
    if (logicalResult !== '') {
      const hType = logicalResult.split(/\s*=\s*/)[1];
      result = calculateMathExpression(expressionsStructure, hType, inputs);
    }

    return result;
  };

  const calculateLogicalExpression = (
    expressionsStructure: BranchTail,
    inputs: Inputs
  ) => {
    const calcExp = (branchTail: BranchTail, exprArgs: ExpArguments[]) => {
      let result = '';
      for (const [key, value] of Object.entries(branchTail)) {
        let currentExprArgs = [...exprArgs, getVarValue(key, inputs)];
        if (currentExprArgs.length === 3) {
          const res = currentExprArgs[0] && currentExprArgs[2];
          currentExprArgs = [res];
          if (!res) {
            continue;
          }
        }
        if (typeof value === 'object') {
          result = calcExp(value, currentExprArgs);
          if (result) {
            return result;
          }
        } else if (typeof value === 'string') {
          return value;
        }
      }
      return result;
    };

    return calcExp(expressionsStructure, []);
  };

  const calculateMathExpression = (
    expressionsStructure: BranchTail,
    H: string,
    inputs: Inputs
  ) => {
    let result = 0;
    if (
      typeof expressionsStructure === 'object' &&
      typeof expressionsStructure['H'] === 'object' &&
      typeof expressionsStructure['H']['='] === 'object' &&
      typeof expressionsStructure['H']['='][H] === 'object'
    ) {
      const fullExp = Object.values(expressionsStructure['H']['='][H])[0];
      if (typeof fullExp === 'string') {
        const expression = fullExp.split(/\s*=\s*/)[1];
        const node = parse(expression);
        result = node.evaluate(inputs);
      }
    }

    return result;
  };

  const getVarValue = (variable: string, inputs: Inputs) => {
    let varName = variable;
    let doNegative = false;
    if (variable[0] === '!') {
      varName = variable[1];
      doNegative = true;
    }
    if (typeof inputs[varName] !== 'undefined') {
      return doNegative ? !inputs[varName] : inputs[varName];
    } else {
      return varName;
    }
  };

  return {
    calculateLogicalExpression,
    calculateMathExpression,
    calculate,
  };
})();

export default ExpressionCalculator;
