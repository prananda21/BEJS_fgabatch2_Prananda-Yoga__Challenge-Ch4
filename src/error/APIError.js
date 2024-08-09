import { HttpStatusCode } from '../utils/enum.js';
import BaseError from './BaseError.js';

export class APIError extends BaseError {
  constructor(description) {
    super(HttpStatusCode.BAD_REQUEST);
    this.code = HttpStatusCode.BAD_REQUEST;
    this.message = description;
  }
}
