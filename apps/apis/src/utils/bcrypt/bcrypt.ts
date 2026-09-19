import bcrypt from "bcryptjs";

export class BcryptDI {
  static async hashing(password: string) {
    try {
      const _p = await bcrypt.hash(password, 10);
      return _p;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  static async compare(password: string, hashedPassword: string) {
    try {
      const _r = await bcrypt.compare(password, hashedPassword);
      return _r;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
