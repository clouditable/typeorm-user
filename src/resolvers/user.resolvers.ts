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
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: "already taken"
          }
        ];
      }
      const hashedPass = await bcryptjs.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPass
      });
      await user.save();
      return null;
    }
  }
};

export default userResolvers;
