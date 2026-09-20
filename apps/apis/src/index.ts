import { DB_CONNECT } from "./database/db.js";
import { ENV } from "./env/env.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRouter } from "./services/admin/auth-service/routes/auth.routes.js";
import { blogsRouter } from "./services/admin/blogs-service/routes/blogs.routes.js";
import { dsaQuestionRouter } from "./services/admin/dsa-question-service/routes/dsaQuestion.route.js";
import { openRouterRoute } from "./services/admin/open-router-service/routes/openRouter.routes.js";
import { cors } from "hono/cors";

export const app = new Hono();

app.use(cors({
  origin:["http://localhost:3000"]
}))

app.get("/api/v1/admin/health", (c) => {
  c.status(200);
  return c.json("Healthy");
});


app.route("/api/v1/admin", authRouter);
app.route("/api/v1/admin", blogsRouter);
app.route("/api/v1/admin", dsaQuestionRouter);
app.route("/api/v1/admin",openRouterRoute);

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
