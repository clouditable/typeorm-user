import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";

import { default as resolvers } from "./resolvers";
import { default as typeDefs } from "./typeDefs";
import { options } from "./config/constants";

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection().then(() => {
  server
    .start(options, () =>
      console.log(`Server is running ⚡ on localhost:${options.port}`)
    )
    .catch(err => console.error("connection Error", err));
});
