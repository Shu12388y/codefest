import { GoogleGenAI } from "@google/genai";

export class GoogleProvider {
  private modelAPIKEY: string;
  constructor(modelAPIKEY: string) {
    this.modelAPIKEY = modelAPIKEY;
  }

  private Instance() {
    const refer = new GoogleGenAI({
      apiKey: this.modelAPIKEY,
    });
    return refer;
  }

  public async Interaction(opts: any) {
    try {
      const _refer = this.Instance();
      const aiInstance = await _refer.interactions.create(opts);
      return aiInstance;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
