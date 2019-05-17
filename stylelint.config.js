module.exports = {
  extends: ['stylelint-prettier/recommended', 'stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include']
      }
    ],
    'selector-pseudo-element-colon-notation': 'single'
  }
};
