/**
 * @fileoverview An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not apparent from the accessibility label.
 * @author Jake Motta
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  hasProp,
  elementType,
  getLiteralPropValue,
  getProp,
} from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';
import isTouchable from '../util/isTouchable';

const schema = generateObjSchema();

function errorMessage(touchable) {
  return `<${touchable}> requires 'testID' prop`;
}

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        isTouchable(node, context) &&
        (!hasProp(node.attributes, 'testID') ||
          (hasProp(node.attributes, 'testID') &&
            getLiteralPropValue(getProp(node.attributes, 'testID')).length <=
              0))
      ) {
        context.report({
          node,
          message: errorMessage(elementType(node)),
        });
      }
    },
  }),
};
