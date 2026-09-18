import { Auth } from "../../../schema/auth/auth.model.js";
import { ResponseHelper } from "../../../helpers/Response.js";

export class AuthRepo {
  private email;
  private password;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public async create() {
    try {
      await new Auth({
        email: this.email,
        password: this.password,
      });
      const _r = new ResponseHelper(1, "created");
      return _r.response();
    } catch (error) {
      const _r = new ResponseHelper(-1, String(error));
      return _r.response();
    }
  }

  public async findOne(email: string) {
    try {
      const data = await Auth.findOne({
        email: email,
      });

      if (!data) {
        const _r = new ResponseHelper(-1, "User not exists");
        return _r.response();
      }

      const _r = new ResponseHelper(1, "Found", data);
      return _r.response();
    } catch (error) {
      const _r = new ResponseHelper(-1, String(error));
      return _r.response();
    }
  }
}
