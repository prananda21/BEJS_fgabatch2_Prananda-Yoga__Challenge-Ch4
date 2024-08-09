class BaseError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'Base Error';
    this.code = code;
  }
}

export default BaseError;
