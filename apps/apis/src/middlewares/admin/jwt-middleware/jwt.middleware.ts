import type { MiddlewareHandler } from "hono";
import { ENV } from "../../../env/env.js";
import { JWT } from "../../../utils/jwt/jwt.js";

export class jwtMiddleware {
  static adminAuth: MiddlewareHandler = async (c, next) => {
    try {
      const authHeader = c.req.header("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        c.status(401);
        return c.json({ message: "Unauthorized: Missing token" });
      }

      const token = authHeader.split(" ")[1];
      const jwtHelper = new JWT({}, ENV.JWT_SECRET);
      const decoded = jwtHelper.verify(token);

      if (!decoded) {
        c.status(401);
        return c.json({ message: "Unauthorized: Invalid token" });
      }

      c.set("user", decoded);
      await next();
    } catch (error) {
      console.log(error);
      c.status(401);
      return c.json({ message: "Unauthorized: Invalid or expired token" });
    }
  };
}
