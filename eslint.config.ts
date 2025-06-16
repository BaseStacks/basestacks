import { tanstackConfig } from "@tanstack/eslint-config";
import tseslint from "typescript-eslint";
import functional from "eslint-plugin-functional";
import reactHooks from 'eslint-plugin-react-hooks';

// eslint-disable-next-line import/no-default-export
export default [
  ...tanstackConfig,
  ...tseslint.config({
    files: ["**/*.{ts,tsx}"],
    extends: [functional.configs.stylistic],
    rules: {
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
      "functional/readonly-type": "off",
      "functional/prefer-readonly-type": ["warn", { ignoreCollections: true }],
      "import/no-default-export": "warn",
    },
  }),
  reactHooks.configs['recommended-latest'],
];
