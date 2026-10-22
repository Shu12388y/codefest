import { GoogleProvider } from "./providers/google-provider/provider.google.js";
export class AISDK {
  private options: string;
  private apikey: string;
  constructor(options: string, apikey: string) {
    this.options = options;
    this.apikey = apikey;
  }

  public async interact(opts?:any) {
    try {
      switch (this.options) {
        case "GOOGLE":
            const instance = new GoogleProvider(this.apikey);
            const result = await instance.Interaction(opts)
            return result;
        default:
          return "Invalid Provider selected";
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
