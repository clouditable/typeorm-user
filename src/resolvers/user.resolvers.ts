import { IResolvers } from "graphql-tools";
import * as bcryptjs from "bcryptjs";
import { User } from "../entity/User";
const userResolvers: IResolvers = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPass = await bcryptjs.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPass
      });
      await user.save();
      return true;
    }
  }
};

export default userResolvers;
