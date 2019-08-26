import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { default as resolvers } from "./resolvers";
import { default as typeDefs } from "./typeDefs";
import { createConnection } from "typeorm";
const options = { port: 4004 };

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection().then(() => {
  server
    .start(options, () =>
      console.log(`Server is running ⚡ on localhost:${options.port}`)
    )
    .catch(err => console.error("connection Error", err));
});
