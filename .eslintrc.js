module.exports = {
    root: true,
    env: {
        node: true
    },
    // @vue/standard 会与 .prettierrc 文件冲突，改为 eslint:recommended
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
};
