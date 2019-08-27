export const options = { port: process.env.NODE_ENV === "test" ? 4003 : 4004 };

export const host = `http://localhost:${options.port}`;
