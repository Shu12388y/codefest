import { AuthRepo } from "../repos/auth.repo.js";
import type { Context } from "hono";
import { JWT } from "../../../../utils/jwt/jwt.js";
import { ENV } from "../../../../env/env.js";
import { BcryptDI } from "../../../../utils/bcrypt/bcrypt.js";

export class AuthController {
  static async signup(c: Context) {
    try {
      const data = await c.req.json();
      let { email, password } = data;
      if (!email || !password) {
        c.status(403);
        return c.json({ message: "Email and password required" });
      }
      password = await BcryptDI.hashing(password);
      const authrepo = new AuthRepo(email, password);
      const response = await authrepo.findOne(email);
      if (response.statusCode == 1) {
        c.status(403);
        return c.json({ message: response.message });
      }

      await authrepo.create();

      c.status(201);
      return c.json({ message: "success" });
    } catch (error) {
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    }
  }

  static async login(c: Context) {
    try {
      const data = await c.req.json();
      const { email, password } = data;
      if (!email || !password) {
        c.status(403);
        return c.json({ message: "Email and password required" });
      }

      const authrepo = new AuthRepo(email, password);

      const response = await authrepo.findOne(email);
      if (response.statusCode == -1) {
        c.status(404);
        return c.json({ message: response.message });
      }
      const isPasswordCorrect = await BcryptDI.compare(
        password,
        response.data.password,
      );

      if (!isPasswordCorrect) {
        c.status(402);
        return c.json({ message: "Invalid Credentials" });
      }
      const payload = {
        email: response.data.email,
      };
      const _t = new JWT(payload, ENV.JWT_SECRET);

      const token = _t.generate();

      c.status(200);
      return c.json({ message: "success", data: token });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    }
  }
}
