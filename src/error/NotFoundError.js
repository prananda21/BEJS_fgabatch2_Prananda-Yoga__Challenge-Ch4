import {
  HttpStatusCode,
  HttpStatusMessage,
} from '../utils/enum.js';
import BaseError from './BaseError.js';

export class NotFoundError extends BaseError {
  constructor() {
    super(
      HttpStatusCode.NOT_FOUND,
      HttpStatusMessage.NOT_FOUND_ERROR,
    );
    this.code = HttpStatusCode.NOT_FOUND;
    this.message =
      HttpStatusMessage.NOT_FOUND_ERROR;
  }
}
