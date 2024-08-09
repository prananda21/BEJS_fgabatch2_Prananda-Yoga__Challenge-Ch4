import {
  HttpStatusCode,
  HttpStatusMessage,
} from '../utils/enum.js';
import BaseError from './BaseError.js';

export class ValidationError extends BaseError {
  constructor() {
    super(
      HttpStatusCode.BAD_REQUEST,
      HttpStatusMessage.VALIDATION_ERROR,
    );
    this.code = HttpStatusCode.BAD_REQUEST;
    this.message =
      HttpStatusMessage.VALIDATION_ERROR;
  }
}
