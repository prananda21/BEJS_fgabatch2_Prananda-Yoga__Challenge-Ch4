import { HttpStatusCode, HttpStatusMessage } from "../utils/enum.js"
import BaseError from "./BaseError.js"

export class DuplicateDataError extends BaseError {
    constructor() {
        super(HttpStatusCode.BAD_REQUEST, HttpStatusMessage.DUPLICATE_ERROR)
        this.code = HttpStatusCode.NOT_FOUND
        this.message = HttpStatusMessage.DUPLICATE_ERROR
    }
}
