import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const _ENV = {
  DB_URI: process.env.DB_URI
    ? process.env.DB_URI
    : (() => {
        throw new Error(`${"DB_URI is required"}`);
      })(),

  PORT: process.env.PORT
    ? process.env.PORT
    : (() => {
        throw new Error(`${"PORT is required"}`);
      })(),

  JWT_SECRET: process.env.JWT_SECRET
    ? process.env.JWT_SECRET
    : (() => {
        throw new Error(`${"JWT_SECRET is required"}`);
      })(),

  OPEN_ROUTER_TOKEN: process.env.OPEN_ROUTER_TOKEN
    ? process.env.OPEN_ROUTER_TOKEN
    : (() => {
        throw new Error(`${"OPEN_ROUTER_TOKEN is required"}`);
      })(),

  OPEN_ROUTER_MODEL: process.env.OPEN_ROUTER_MODEL
    ? process.env.OPEN_ROUTER_MODEL
    : (() => {
        throw new Error(`${"OPEN_ROUTER_MODEL is required"}`);
      })(),
};

export const ENV = Object.freeze(_ENV);
