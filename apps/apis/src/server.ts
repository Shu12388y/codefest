import {app} from "./index.js";
import {authRouter} from "./services/auth/routes/auth.routes.js";
import { blogsRouter } from "./services/blogs/routes/blogs.routes.js";
import {dsaQuestionRouter} from "./services/dsa-question/routes/dsaQuestion.route.js";


app.get("/health", (c) => {
  c.status(200)
  return c.json("Healthy");
});


app.route("/v1",authRouter);
app.route("/v1",blogsRouter);
app.route("/v1",dsaQuestionRouter);