import { GraphQLServer } from "graphql-yoga";
import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-toolkit";
import { makeExecutableSchema } from "graphql-tools";

import { createConnections } from "./utils/createConnections";

import { default as resolvers } from "./resolvers";
import { default as typeDefs } from "./typeDefs";
import { options } from "./config/constants";

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [
    makeExecutableSchema({ typeDefs, resolvers })
  ];
  const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });
  await createConnections();
  return await server
    .start(options, () =>
      console.log(`Server is running ⚡ on localhost:${options.port}`)
    )
    .catch(err => console.error("connection Error", err));
};
