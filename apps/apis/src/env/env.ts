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

  CORS_ORIGINS: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : (() => {
        throw new Error(`${"CORS_ORIGINS is required (comma-separated URLs)"}`);
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
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY
    ? process.env.IMAGEKIT_PUBLIC_KEY
    : (() => {
        throw new Error(`${"IMAGEKIT_PUBLIC_KEY is required"}`);
      })(),
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
    ? process.env.IMAGEKIT_PRIVATE_KEY
    : (() => {
        throw new Error(`${"IMAGEKIT_PRIVATE_KEY is required"}`);
      })(),
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT
    ? process.env.IMAGEKIT_URL_ENDPOINT
    : (() => {
        throw new Error(`${"IMAGEKIT_URL_ENDPOINT is required"}`);
      })(),
  MODE: process.env.MODE
    ? process.env.MODE
    : (() => {
        throw new Error(`${"MODE is required"}`);
      })(),
};

export const ENV = Object.freeze(_ENV);
