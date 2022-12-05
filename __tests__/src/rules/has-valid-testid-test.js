/* eslint-env jest */
/**
 * @fileoverview Makes 'testID' a required prop on all Touchables
 * @author Jake Motta
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-testid';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = (touchable) => ({
  message: `<${touchable}> requires 'testID' prop`,
  type: 'JSXOpeningElement',
});

ruleTester.run('has-valid-testid', rule, {
  valid: [
    { code: '<TouchableOpacity testID="one" />;' },
    { code: '<TouchableOpacity testID="oneTwo" />;' },
    { code: '<TouchableOpacity testID="1" />;' },
    { code: '<TouchableWithoutFeedback testID="two" />;' },
    { code: '<TouchableHighlight testID="three" />;' },
    { code: '<TouchableNativeFeedback testID="four" />;' },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<TouchableOpacity />`,
      errors: [expectedError('TouchableOpacity')],
    },
    {
      code: `<TouchableOpacity testID="" />`,
      errors: [expectedError('TouchableOpacity')],
    },
    {
      code: `<TouchableWithoutFeedback />`,
      errors: [expectedError('TouchableWithoutFeedback')],
    },
    {
      code: `<TouchableWithoutFeedback testID="" />`,
      errors: [expectedError('TouchableWithoutFeedback')],
    },
    {
      code: `<TouchableHighlight />`,
      errors: [expectedError('TouchableHighlight')],
    },
    {
      code: `<TouchableHighlight testID="" />`,
      errors: [expectedError('TouchableHighlight')],
    },
    {
      code: `<TouchableNativeFeedback />`,
      errors: [expectedError('TouchableNativeFeedback')],
    },
    {
      code: `<TouchableNativeFeedback testID="" />`,
      errors: [expectedError('TouchableNativeFeedback')],
    },
  ].map(parserOptionsMapper),
});
