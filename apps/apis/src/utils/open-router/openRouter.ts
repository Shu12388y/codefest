export class OpenRouterConfig {
  private model: string;
  private authToken: string;

  constructor(model: string, authToken: string) {
    this.model = model;
    this.authToken = authToken;
  }
  public async API(input:string) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          input: input,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
