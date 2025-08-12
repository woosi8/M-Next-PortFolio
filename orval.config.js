/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();

module.exports = {
  project: {
    input: {
      target:
        process.env.NEXT_PUBLIC_ORVAL_API ||
        "https://petstore3.swagger.io/api/v3/openapi.json",
    },
    output: {
      mode: "tags-split",
      mock: false,
      target: "./src/common/api/generated/hooks.ts",
      schemas: "./src/common/api/generated/types",
      client: "react-query",
      override: {
        noLint: true,
        formUrlEncoded: false,
        mutator: {
          path: "./src/common/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        useDates: false,
        query: {
          useQuery: true,
          useInfinite: true,
        },
      },
    },
  },
};
