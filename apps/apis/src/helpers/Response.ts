export class ResponseHelper {
  private statusCode: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  public response() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
