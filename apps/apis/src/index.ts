import { DB_CONNECT } from "./database/db.js";
import { ENV } from "./env/env.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";


export const app = new Hono();

DB_CONNECT(ENV.DB_URI)
  .then(() => {
    serve(
      {
        fetch: app.fetch,
        port: parseInt(ENV.PORT),
      },
      (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
      },
    );
  })
  .catch((e) => {
    console.log(e);
  });
