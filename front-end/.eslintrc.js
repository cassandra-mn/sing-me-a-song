module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "amd": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:cypress/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "cypress"
    ],
    "rules": {
        "jest/expect-expect": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "on"
    }
}