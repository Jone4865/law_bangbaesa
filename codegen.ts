import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://10.10.220.17:8001/graphql",
  documents: ["./src/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    "./src/graphql/generated/": {
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
