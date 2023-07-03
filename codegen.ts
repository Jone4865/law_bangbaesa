import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8001/graphql",
  documents: ["graphql/**/*.ts"],
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        skipTypename: true,
      },
    },
  },
};

export default config;
