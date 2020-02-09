/* eslint-env jest */
/**
 * @fileoverview Describes the current state of a component to the user of an assistive technology.
 * @author JP Driver
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-state';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const propMustBeAnObject = {
  message: 'accessibilityState must be an object',
  type: 'JSXAttribute'
};

const invalidObjectKey = key => ({
  message: `accessibilityState object: "${key}" is not a valid key`,
  type: 'JSXAttribute'
});

const valueMustBeBoolean = key => ({
  message: `accessibilityState object: "${key}" value is not a boolean`,
  type: 'JSXAttribute'
});

const checkedMustBeBooleanOrMixed = {
  message: `accessibilityState object: "checked" value is not either a boolean or 'mixed'`,
  type: 'JSXAttribute'
};

ruleTester.run('has-valid-accessibility-state', rule, {
  valid: [
    { code: '<TouchableOpacity accessibilityState={{ disabled: true }} />;' },
    { code: '<TouchableOpacity accessibilityState={{ checked: true }} />;' },
    { code: '<TouchableOpacity accessibilityState={{ checked: "mixed" }} />;' },
    {
      code:
        '<TouchableOpacity accessibilityState={{ disabled: true, checked: true }} />;'
    }
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<TouchableOpacity accessibilityState="disabled" />',
      errors: [propMustBeAnObject]
    },
    {
      code: '<TouchableOpacity accessibilityState={["disabled"]} />',
      errors: [propMustBeAnObject]
    },
    {
      code: '<TouchableOpacity accessibilityState={{ disabled: "yes" }} />',
      errors: [valueMustBeBoolean('disabled')]
    },
    {
      code: '<TouchableOpacity accessibilityState={{ checked: "yes" }} />',
      errors: [checkedMustBeBooleanOrMixed]
    },
    {
      code: '<TouchableOpacity accessibilityState={{ foo: true }} />',
      errors: [invalidObjectKey('foo')]
    },
    {
      code: '<TouchableOpacity accessibilityState={{ foo: "yes" }} />',
      errors: [invalidObjectKey('foo')]
    }
  ].map(parserOptionsMapper)
});