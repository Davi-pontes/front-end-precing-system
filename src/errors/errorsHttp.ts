export class HttpError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "HttpErro";
    }
  }