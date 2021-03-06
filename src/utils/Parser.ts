export type BranchTail =
  | {
      [key: string]: BranchTail;
    }
  | string;

const Parser = (() => {
  const parse = (input: string) => {
    const expressions = input.split(/\s*[\n\r]\s*/g);
    return buildRulesTree(expressions);
  };

  const buildRulesTree = (expressions: string[]) => {
    const tree = {};
    for (let index = 0; index < expressions.length; index++) {
      if (expressions[index].trim() === '') {
        continue;
      }
      const [expressionLeafs, expressionResult] = expressions[index].split(
        /\s*=>\s*/
      );
      const leafs = expressionLeafs.split(/\s+/).concat('=>', expressionResult);
      addLeafs(tree, leafs);
    }
    return tree;
  };

  const addLeafs = (branchTail: BranchTail, leafs: string[]) => {
    const leaf = leafs.shift();
    if (typeof leaf !== 'undefined') {
      if (typeof branchTail !== 'string') {
        if (leafs.length > 1) {
          if (typeof branchTail[leaf] === 'undefined') {
            // add a new brain or replace the old one if expressions fully match
            branchTail[leaf] = addLeafs({}, leafs);
          } else {
            branchTail[leaf] = addLeafs(branchTail[leaf], leafs);
          }
        } else {
          // in case we reach the last expression leaf
          // then it means that we reached the expression's result so add/overwrite it
          branchTail[leaf] = leafs[0];
        }
      }
    }
    return branchTail;
  };

  return {
    parse,
  };
})();

export default Parser;
