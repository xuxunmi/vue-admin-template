module.exports = {
    processors: [],
    plugins: [],
    extends: ['stylelint-prettier/recommended'],
    rules: {
        // 取消某些规则如下:
        'unit-case': null, // Specify lowercase or uppercase for units.
        'rule-empty-line-before': null, // Require or disallow an empty line before rules.
        'comment-empty-line-before': null, // Require or disallow an empty line before comments.
        'declaration-block-trailing-semicolon': null, // Require or disallow a trailing semicolon within declaration blocks.
        'selector-type-no-unknown': null // Disallow unknown type selectors.
    }
};
