/* tslint:disable:no-unused-variable */

import { request } from "graphql-request";

import { startServer } from "../../startServer";

import { User } from "../../entity/User";
import { host } from "../../config/constants";

beforeAll(async () => {
  await startServer();
});

const email = "email@gmail.com";
const password = "123456";

const mutation = `
  mutation {
    register(email: "${email}", password:"${password}")
  }
`;

test("Register user", async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
