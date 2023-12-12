module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  /** 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none */
  trailingComma: "all",
  /** 超过最大值换行 */
  printWidth: 120,
  /** 超过最大值换行 */
  arrowParens: "always",
  /** 使用单引号 */
  singleQuote: true,
  /** 在对象，数组括号与文字之间加空格 "{ foo: bar }" */
	bracketSpacing: true,
  /** 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>" */
	quoteProps: 'as-needed',
  semi: false,
  importOrderParserPlugins: ['classProperties', 'typescript', 'jsx'],
  importOrder: [
    '^react',
    '^@tarojs/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/service/(.*)$',
    '^@/store',
    '^@/assets/(.*)$',
    '^@/utils/(.*)$',
    '^@/api/(.*)$',
    '^@/pages/(.*)$',
    '^@/types/(.*)$',
    '^@(.*)$',
    '^./index.module.less',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
