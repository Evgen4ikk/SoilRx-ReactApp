/** @type {import('prettier').Config} */
const config = {
    semi: false,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '<THIRD_PARTY_MODULES>',
        '^env(.*)$',
        '^src/(.*)$',
        '^[./]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '5.4.2',
    plugins: [
        require.resolve('@ianvs/prettier-plugin-sort-imports'),
        require.resolve('prettier-plugin-tailwindcss'),
    ],
}

module.exports = config
