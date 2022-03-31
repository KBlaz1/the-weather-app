module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended"
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    quotes: ["error", "double"],
    // we want to force semicolons
    semi: ["error", "never"],
    // we use 2 spaces to indent our code
    indent: ["error", 2],
    // we want to avoid extraneous spaces
    "no-multi-spaces": ["error"],
    // see: https://eslint.vuejs.org/rules/no-unused-components.html
    "vue/no-unused-components": ["warn", {
      ignoreWhenBindingPresent: true
    }],
    // see: https://eslint.org/docs/rules/curly
    curly: ["error", "multi"]
  }
}
