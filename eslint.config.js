import { tanstackConfig } from "@tanstack/eslint-config";
import tseslint from 'typescript-eslint';

export default [
    ...tanstackConfig,
    ...tseslint.config(
        {
            files: ["**/*.{ts,tsx}"],
            rules: {
                "@typescript-eslint/naming-convention": [
                    "warn",
                    {
                        "selector": "typeLike",
                        "format": ["PascalCase"]
                    }
                ],
                "import/no-default-export": "warn",
            }
        })
];
